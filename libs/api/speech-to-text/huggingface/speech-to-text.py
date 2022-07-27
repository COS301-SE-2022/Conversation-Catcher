from transformers import Wav2Vec2Processor, Wav2Vec2ForCTC
import librosa
import torch
import soundfile as sf

# load model and tokenizer
processor = Wav2Vec2Processor.from_pretrained("facebook/wav2vec2-base-960h")
model = Wav2Vec2ForCTC.from_pretrained("facebook/wav2vec2-base-960h")
    
# load dummy dataset and read soundfiles
filename = "input.flac"
input_audio = librosa.load(filename, sr=16000)

# tokenize
#input_values = processor(ds[0]["audio"]["array"], return_tensors="pt", padding="longest").input_values  # Batch size 1
input_values = processor(input_audio, return_tensors="pt").input_values

# retrieve logits
logits = model(input_values).logits

# take argmax and decode
predicted_ids = torch.argmax(logits, dim=-1)
#transcription = processor.batch_decode(predicted_ids)
transcription = processor.batch_decode(predicted_ids)[0]
print(transcription)
