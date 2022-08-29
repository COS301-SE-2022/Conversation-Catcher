from transformers import pipeline

class summariseText:

    def summarise(self, input_text):
        summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

        max = len(input_text)/2
        min = len(input_text)/10

        return summarizer(input_text, max_length=130, min_length=30, do_sample=False)