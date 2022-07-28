from transformers import Wav2Vec2Processor, Wav2Vec2ForCTC, T5Tokenizer, T5ForConditionalGeneration
import librosa
import torch

#load pre-trained model and Processor
processor = Wav2Vec2Processor.from_pretrained("facebook/wav2vec2-base-960h")
model = Wav2Vec2ForCTC.from_pretrained("facebook/wav2vec2-base-960h")

file_name = "input.flac"
    
#load any audio file of your choice
speech, rate = librosa.load(file_name,sr=16000)

# tokenize
input_values = processor(speech, return_tensors = 'pt', sampling_rate=16000, padding="longest").input_values

# retrieve logits
logits = model(input_values).logits

# take argmax and decode
predicted_ids = torch.argmax(logits, dim=-1)

#decode the audio to generate text
transcription = processor.decode(predicted_ids[0])

tokenizer2 = T5Tokenizer.from_pretrained("flexudy/t5-small-wav2vec2-grammar-fixer")
model2 = T5ForConditionalGeneration.from_pretrained("flexudy/t5-small-wav2vec2-grammar-fixer")

input_text = "fix: { " + transcription + " } </s>"

input_ids = tokenizer2.encode(input_text, return_tensors="pt", max_length=256, truncation=True, add_special_tokens=True)

outputs = model2.generate(
    input_ids=input_ids,
    max_length=1000,
    num_beams=4,
    repetition_penalty=1.0,
    length_penalty=1.0,
    early_stopping=True
)

sentence = tokenizer2.decode(outputs[0], skip_special_tokens=True, clean_up_tokenization_spaces=True)

print(f"{sentence}")