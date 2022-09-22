from attention import AttentionLayer
import numpy as np
import pandas as pd
import re
from bs4 import BeautifulSoup
from keras.preprocessing.text import Tokenizer
from keras_preprocessing.sequence import pad_sequences
# from keras.utils.data_utils import pad_sequences
from nltk.corpus import stopwords
from tensorflow.keras.layers import Input, LSTM, Embedding, Dense, Concatenate, TimeDistributed
from tensorflow.keras.models import Model

import tensorflow_cloud as tfc
import tensorflow as tf
from tensorflow import keras
import warnings
import datetime
import os

class nameGenerator:

    max_summary_len=8

    reverse_target_word_index=y_tokenizer.index_word
    reverse_source_word_index=x_tokenizer.index_word
    target_word_index=y_tokenizer.word_index

    encoder_model = keras.models.load_model('./models/breed_classifier_model.h5')
    decoder_model = keras.models.load_model('./models/breed_classifier_model.h5')
    def decode_sequence(input_seq):
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

    def seq2summary(input_seq):
        newString=''
        for i in input_seq:
            if((i!=0 and i!=target_word_index['sostok']) and i!=target_word_index['eostok']):
                newString=newString+reverse_target_word_index[i]+' '
        return newString

    def seq2text(input_seq):
        newString=''
        for i in input_seq:
            if(i!=0):
                newString=newString+reverse_source_word_index[i]+' '
        return newString

    def generateName(self, text):

        return decode_sequence(text)

    #for i in range(0,100):
    #    print("Review:",seq2text(x_tr[i]))
    #    print("Original summary:",seq2summary(y_tr[i]))
    #    print("Predicted summary:",decode_sequence(x_tr[i].reshape(1,max_text_len)))
    #    print("\n")