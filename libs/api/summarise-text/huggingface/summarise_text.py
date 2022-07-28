from transformers import pipeline

class summarise_text:

    def summarise(text):
        summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
        return summarizer(text, max_length=130, min_length=30, do_sample=False)