import numpy as np
import pandas as pd
import re
from bs4 import BeautifulSoup
from keras.preprocessing.text import Tokenizer
from keras_preprocessing.sequence import pad_sequences
# import nltk
# nltk.download('stopwords')

# from keras.utils.data_utils import pad_sequences
stopwords = {'does', "it's", 'having', 've', "hadn't", "isn't", 'this', 'him', 'ours', "mustn't", 'are', 'if', 'we', 'myself', 'these', 'a', 'not', 'what', 'weren', 'down', 'have', "couldn't", 'after', 'again', 'most', 'at', 'such', 'by', 'just', 'd', 'i', "you'll", 'should', "haven't", 'as', 'do', 'from', 'other', 'than', 'which', 'were', 'mustn', 'yours', "aren't", 'now', 'didn', "won't", 'be', 'itself', 'in', 'all', 'once', 'few', 'through', 'its', "didn't", 'needn', 'being', 'them', "you'd", 'or', 'it', 'to', 'your', "shan't", 'too', 'our', 'ourselves', 'his', 'am', 'below', 'isn', 'ma', 'further', 'yourself', 'out', 'up', "don't", 'with', 'but', 'where', 'then', 'whom', 'each', 'hasn', 'very', 'more', 'he', 'won', 't', 'doing', 'until', 'doesn', 'herself', 'who', 'own', "wasn't", 'those', 'nor', "you're", 'shan', 'himself', 'll', 'that', 'both', 'shouldn', "you've", 'over', 'an', 'when', 'because', 'ain', 'had', 'haven', 'themselves', 'same', 'under', 'no', "mightn't", 'couldn', 'you', 'while', 'and', 'during', 'yourselves', 'my', "shouldn't", "wouldn't", 'off', 'she', 'me', 'wasn', 'above', 'y', 'will', 'been', 'mightn', 'was', 'before', "needn't", 'so', 'on', 's', 'some', 'their', 'can', 'how', 'is', 'hadn', 'wouldn', 'here', 'why', 'her', 'only', 'the', 'o', "should've", 'hers', "doesn't", 'don', 'against', "weren't", 'about', 'm', "she's", 'of', 'into', 're', 'they', "that'll", 'aren', "hasn't", 'theirs', 'between', 'there', 'did', 'has', 'for', 'any'}
import ast
from keras.preprocessing.text import Tokenizer

from tensorflow import keras
import warnings
import datetime
import os
import pickle

os.environ['CUDA_VISIBLE_DEVICES'] = '-1'

class nameGenerator:
    global contraction_mapping
    contraction_mapping = {"ain't": "is not", "aren't": "are not","can't": "cannot", "'cause": "because", "could've": "could have", "couldn't": "could not",
                            "didn't": "did not",  "doesn't": "does not", "don't": "do not", "hadn't": "had not", "hasn't": "has not", "haven't": "have not",
                            "he'd": "he would","he'll": "he will", "he's": "he is", "how'd": "how did", "how'd'y": "how do you", "how'll": "how will", "how's": "how is",
                            "I'd": "I would", "I'd've": "I would have", "I'll": "I will", "I'll've": "I will have","I'm": "I am", "I've": "I have", "i'd": "i would",
                            "i'd've": "i would have", "i'll": "i will",  "i'll've": "i will have","i'm": "i am", "i've": "i have", "isn't": "is not", "it'd": "it would",
                            "it'd've": "it would have", "it'll": "it will", "it'll've": "it will have","it's": "it is", "let's": "let us", "ma'am": "madam",
                            "mayn't": "may not", "might've": "might have","mightn't": "might not","mightn't've": "might not have", "must've": "must have",
                            "mustn't": "must not", "mustn't've": "must not have", "needn't": "need not", "needn't've": "need not have","o'clock": "of the clock",
                            "oughtn't": "ought not", "oughtn't've": "ought not have", "shan't": "shall not", "sha'n't": "shall not", "shan't've": "shall not have",
                            "she'd": "she would", "she'd've": "she would have", "she'll": "she will", "she'll've": "she will have", "she's": "she is",
                            "should've": "should have", "shouldn't": "should not", "shouldn't've": "should not have", "so've": "so have","so's": "so as",
                            "this's": "this is","that'd": "that would", "that'd've": "that would have", "that's": "that is", "there'd": "there would",
                            "there'd've": "there would have", "there's": "there is", "here's": "here is","they'd": "they would", "they'd've": "they would have",
                            "they'll": "they will", "they'll've": "they will have", "they're": "they are", "they've": "they have", "to've": "to have",
                            "wasn't": "was not", "we'd": "we would", "we'd've": "we would have", "we'll": "we will", "we'll've": "we will have", "we're": "we are",
                            "we've": "we have", "weren't": "were not", "what'll": "what will", "what'll've": "what will have", "what're": "what are",
                            "what's": "what is", "what've": "what have", "when's": "when is", "when've": "when have", "where'd": "where did", "where's": "where is",
                            "where've": "where have", "who'll": "who will", "who'll've": "who will have", "who's": "who is", "who've": "who have",
                            "why's": "why is", "why've": "why have", "will've": "will have", "won't": "will not", "won't've": "will not have",
                            "would've": "would have", "wouldn't": "would not", "wouldn't've": "would not have", "y'all": "you all",
                            "y'all'd": "you all would","y'all'd've": "you all would have","y'all're": "you all are","y'all've": "you all have",
                            "you'd": "you would", "you'd've": "you would have", "you'll": "you will", "you'll've": "you will have",
                            "you're": "you are", "you've": "you have"}
    global stop_words
    stop_words = set(stopwords)

    global model
    model = None
    global encoder_model
    encoder_model = None
    global decoder_model
    decoder_model = None

    # Function for cleaning up text
    global text_cleaner
    def text_cleaner(self,text,num):

        # Convert to lower case

        newString = text.lower()

        # Remove html tags

        newString = BeautifulSoup(newString, "html.parser").text
        newString = re.sub(r'\([^)]*\)', '', newString)
        newString = re.sub('"','', newString)

        # Expanding contractions

        newString = ' '.join([contraction_mapping[t] if t in contraction_mapping else t for t in newString.split(" ")])

        # Remove 's

        newString = re.sub(r"'s\b","",newString)

        # Remove text inside parentheses

        newString = re.sub("[^a-zA-Z]", " ", newString)
        newString = re.sub('[m]{2,}', 'mm', newString)

        # Remove stopwords

        if(num==0):
            tokens = [w for w in newString.split() if not w in stop_words]
        else:
            tokens=newString.split()

        # Remove short words

        long_words=[]
        for i in tokens:
            if len(i)>1:                                                 #removing short word
                long_words.append(i)
        return (" ".join(long_words)).strip()

    # Calling cleaned text and cleaned summary functions

    global decode_sequence
    def decode_sequence(self, input_seq):

        #f = open("reverse_target_word_index.txt", "r")
        #reverse_target_word_index = ast.literal_eval(f.read())

        #f = open("target_word_index.txt", "r")
        #target_word_index = ast.literal_eval(f.read())

        f = open("reverse_target_word_index", "rb")
        reverse_target_word_index = pickle.load(f)

        f = open("target_word_index", "rb")
        target_word_index = pickle.load(f)

        # model = keras.models.load_model("conversationcatcher")
        encoder_model = keras.models.load_model('encoder')
        decoder_model = keras.models.load_model('decoder')

        max_summary_len=10

        # Encode the input as state vectors.
        e_out, e_h, e_c = encoder_model.predict(input_seq)

        # Generate empty target sequence of length 1.
        target_seq = np.zeros((1,1))

        # Populate the first word of target sequence with the start word.
        target_seq[0, 0] = target_word_index['sostok']

        stop_condition = False
        decoded_sentence = ''
        prevToken = ''
        while not stop_condition:

            output_tokens, h, c = decoder_model.predict([target_seq] + [e_out, e_h, e_c])

            #print("output_tokens: ", output_tokens)
            #print(output_tokens[0, -1, :])

            # Sample a token
            sampled_token_index = np.argmax(output_tokens[0, -1, :])
            sampled_token = reverse_target_word_index[sampled_token_index]

            #print("sampled_token_index: ", sampled_token_index)
            #print("sampled token: ", sampled_token)

            if(sampled_token!='eostok' and sampled_token!=prevToken):
                decoded_sentence += ' '+sampled_token

            # Exit condition: either hit max length or find stop word.
            if (sampled_token == 'eostok'  or len(decoded_sentence.split()) >= (max_summary_len-1)):
                stop_condition = True

            prevToken = sampled_token

            # Update the target sequence (of length 1).
            target_seq = np.zeros((1,1))
            target_seq[0, 0] = sampled_token_index

            # Update internal states
            e_h, e_c = h, c

        return decoded_sentence.strip()

    def generateName(self, text):
        cleaned_text = []
        cleaned_text.append(text_cleaner(self,text,0))

        # Storing cleanead text and cleaned summary

        # Set max text length and max summary length based on length distributions

        max_text_len=40


        # Select text and summaries whose lengths fall within the above boundaries and

        # Add start and end tokens

        #df['summary'] = df['summary'].apply(lambda x : 'sostok '+ x + ' eostok')

        # Split dataset into training and validation set (90:10)
        # -------------------------- Text tokanizer ------------------------------



        #f = open("reverse_source_word_index.txt", "r")
        #reverse_source_word_index = ast.literal_eval(f.read())

        #f = open("source_word_index.txt", "r")
        #source_word_index = ast.literal_eval(f.read())

        f = open("reverse_source_word_index", "rb")
        reverse_source_word_index = pickle.load(f)

        f = open("source_word_index", "rb")
        source_word_index = pickle.load(f)


        #from keras.preprocessing.sequence import pad_sequences

        # Prepare a tokenizer for reviews on training data

        x_tokenizer = Tokenizer()
        #x_tokenizer.fit_on_texts(list(cleaned_text))
        x_tokenizer.word_index = source_word_index
        x_tokenizer.index_word = reverse_source_word_index



        #reverse_target_word_index=y_tokenizer.index_word
        #target_word_index=y_tokenizer.word_index


        # Convert text sequences into integer sequences
        print(cleaned_text)
        x_tr_seq = x_tokenizer.texts_to_sequences(cleaned_text)

        # Padding zero upto maximum length

        x_tr    =   pad_sequences(x_tr_seq,  maxlen=max_text_len, padding='post')

        print(x_tr)

        return decode_sequence(self, x_tr.reshape(1,max_text_len))
