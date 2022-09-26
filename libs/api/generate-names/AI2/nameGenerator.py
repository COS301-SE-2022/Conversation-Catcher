from pyexpat import model
from attention import AttentionLayer
import numpy as np
import pandas as pd
import re
from bs4 import BeautifulSoup
from keras.preprocessing.text import Tokenizer
from keras_preprocessing.sequence import pad_sequences
import nltk  
nltk.download('stopwords')
# from keras.utils.data_utils import pad_sequences
from nltk.corpus import stopwords
import ast

from tensorflow import keras
import warnings
import datetime
import os

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
    stop_words = set(stopwords.words('english')) 

    global model
    model = None
    global encoder_model
    encoder_model = None
    global decoder_model
    decoder_model = None

    global target_word_index
    target_word_index = None
    global reverse_target_word_index
    reverse_target_word_index = None

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

        max_summary_len=10

        # Encode the input as state vectors.
        e_out, e_h, e_c = encoder_model.predict(input_seq)
        
        # Generate empty target sequence of length 1.
        target_seq = np.zeros((1,1))
        
        # Populate the first word of target sequence with the start word.
        target_seq[0, 0] = target_word_index['sostok']

        stop_condition = False
        decoded_sentence = ''
        while not stop_condition:
        
            output_tokens, h, c = decoder_model.predict([target_seq] + [e_out, e_h, e_c])

            # Sample a token
            sampled_token_index = np.argmax(output_tokens[0, -1, :])
            sampled_token = reverse_target_word_index[sampled_token_index]
            
            if(sampled_token!='eostok'):
                decoded_sentence += ' '+sampled_token

            # Exit condition: either hit max length or find stop word.
            if (sampled_token == 'eostok'  or len(decoded_sentence.split()) >= (max_summary_len-1)):
                stop_condition = True

            # Update the target sequence (of length 1).
            target_seq = np.zeros((1,1))
            target_seq[0, 0] = sampled_token_index

            # Update internal states
            e_h, e_c = h, c

        return decoded_sentence

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

        from keras.preprocessing.text import Tokenizer 
        #from keras.preprocessing.sequence import pad_sequences

        # Prepare a tokenizer for reviews on training data

        x_tokenizer = Tokenizer() 
        x_tokenizer.fit_on_texts(list(cleaned_text))

        # Calculate rare words and coverage (word count less that thresh is rare)

        #thresh=5

        #cnt=0 # total rare words (count below thresh)
        #tot_cnt=0 # total unique words in text
        #freq=0
        #tot_freq=0

        #for key,value in x_tokenizer.word_counts.items():
        #    tot_cnt=tot_cnt+1
        #    tot_freq=tot_freq+value
        #    if(value<thresh):
        #        cnt=cnt+1
        #        freq=freq+value
            
        #print("% of rare words in vocabulary:",(cnt/tot_cnt)*100)
        #print("Total Coverage of rare words:",(freq/tot_freq)*100)

        # Prepare a tokenizer for reviews on training data. tot-cnt - cnt gives top most common words

        #x_tokenizer = Tokenizer(num_words=tot_cnt-cnt) 
        #x_tokenizer.fit_on_texts(list(cleaned_text))

        # Convert text sequences into integer sequences

        x_tr_seq    =   x_tokenizer.texts_to_sequences(list(cleaned_text)) 

        # Padding zero upto maximum length

        x_tr    =   pad_sequences(x_tr_seq,  maxlen=max_text_len, padding='post')


    

        model = keras.model.load_model("conversationcatcher")
        encoder_model = keras.model.load_model('encoder')
        decoder_model = keras.model.load_model('decoder')

        decode_sequence(x_tr)
