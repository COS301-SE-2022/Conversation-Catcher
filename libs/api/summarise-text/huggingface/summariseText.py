from transformers import pipeline

class summariseText:

    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

    def summarise(input_text):
        max = len(input_text)/255
        min = len(input_text)/10
        return summarizer(input_text, max_length=130, min_length=30, do_sample=False)