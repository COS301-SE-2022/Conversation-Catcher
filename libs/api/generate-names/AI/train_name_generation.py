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
import tensorflow_datasets as tfds

from tensorflow import keras
import warnings
import datetime
import os

pd.set_option("display.max_colwidth", 200)
warnings.filterwarnings("ignore")

# Reading the dataset

data = tfds.load('gigaword', split='train')
data = data.take(1000000)
data = tfds.as_dataframe(data)


# Remove duplicates and NA values

#data.drop_duplicates(subset=['Text'],inplace=True)#dropping duplicates
#data.dropna(axis=0,inplace=True)#dropping na

# ------------------------ Dataset preprocessing --------------------------------

# Contraction expanding dictionary 

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

stop_words = set(stopwords.words('english')) 

# Function for cleaning up text
def text_cleaner(text,num):

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

cleaned_text = []
for t in data['document']:
    cleaned_text.append(text_cleaner(t,0)) 

cleaned_summary = []
for t in data['summary']:
    cleaned_summary.append(text_cleaner(t,1))

# Storing cleanead text and cleaned summary

data['cleaned_text']=cleaned_text
data['cleaned_summary']=cleaned_summary

# Drop empty rows

data.replace('', np.nan, inplace=True)
data.dropna(axis=0,inplace=True)

# Set max text length and max summary length based on length distributions

max_text_len=40
max_summary_len=10

# Select text and summaries whose lengths fall within the above boundaries and

cleaned_text =np.array(data['cleaned_text'])
cleaned_summary=np.array(data['cleaned_summary'])

short_text=[]
short_summary=[]

for i in range(len(cleaned_text)):
    if(len(cleaned_summary[i].split())<=max_summary_len and len(cleaned_text[i].split())<=max_text_len):
        short_text.append(cleaned_text[i])
        short_summary.append(cleaned_summary[i])
        
df=pd.DataFrame({'text':short_text,'summary':short_summary})

# Add start and end tokens

df['summary'] = df['summary'].apply(lambda x : 'sostok '+ x + ' eostok')

# Split dataset into training and validation set (90:10)

from sklearn.model_selection import train_test_split
x_tr,x_val,y_tr,y_val=train_test_split(np.array(df['text']),np.array(df['summary']),test_size=0.1,random_state=0,shuffle=True) 

# -------------------------- Text tokanizer ------------------------------

from keras.preprocessing.text import Tokenizer 
#from keras.preprocessing.sequence import pad_sequences

# Prepare a tokenizer for reviews on training data

x_tokenizer = Tokenizer() 
x_tokenizer.fit_on_texts(list(x_tr))

# Calculate rare words and coverage (word count less that thresh is rare)

thresh=30

cnt=0 # total rare words (count below thresh)
tot_cnt=0 # total unique words in text
freq=0
tot_freq=0

for key,value in x_tokenizer.word_counts.items():
    tot_cnt=tot_cnt+1
    tot_freq=tot_freq+value
    if(value<thresh):
        cnt=cnt+1
        freq=freq+value
    
print("% of rare words in vocabulary:",(cnt/tot_cnt)*100)
print("Total Coverage of rare words:",(freq/tot_freq)*100)

# Prepare a tokenizer for reviews on training data. tot-cnt - cnt gives top most common words

x_tokenizer = Tokenizer(num_words=tot_cnt-cnt) 
x_tokenizer.fit_on_texts(list(x_tr))

# Convert text sequences into integer sequences

x_tr_seq    =   x_tokenizer.texts_to_sequences(x_tr) 
x_val_seq   =   x_tokenizer.texts_to_sequences(x_val)

# Padding zero upto maximum length

x_tr    =   pad_sequences(x_tr_seq,  maxlen=max_text_len, padding='post')
x_val   =   pad_sequences(x_val_seq, maxlen=max_text_len, padding='post')

# Size of vocabulary ( +1 for padding token)

x_voc   =  x_tokenizer.num_words + 1

# -------------------------- Summary tokanizer ------------------------------

# Prepare a tokenizer for reviews on training data

y_tokenizer = Tokenizer()   
y_tokenizer.fit_on_texts(list(y_tr))

# Calculate rare words and coverage (word count less that thresh is rare)

thresh=50

cnt=0
tot_cnt=0
freq=0
tot_freq=0

for key,value in y_tokenizer.word_counts.items():
    tot_cnt=tot_cnt+1
    tot_freq=tot_freq+value
    if(value<thresh):
        cnt=cnt+1
        freq=freq+value
    
print("% of rare words in vocabulary:",(cnt/tot_cnt)*100)
print("Total Coverage of rare words:",(freq/tot_freq)*100)

# Prepare a tokenizer for reviews on training data

y_tokenizer = Tokenizer(num_words=tot_cnt-cnt) 
y_tokenizer.fit_on_texts(list(y_tr))

# Convert text sequences into integer sequences

y_tr_seq    =   y_tokenizer.texts_to_sequences(y_tr) 
y_val_seq   =   y_tokenizer.texts_to_sequences(y_val) 

# Padding zero upto maximum length

y_tr    =   pad_sequences(y_tr_seq, maxlen=max_summary_len, padding='post')
y_val   =   pad_sequences(y_val_seq, maxlen=max_summary_len, padding='post')

# Size of vocabulary

y_voc  =   y_tokenizer.num_words + 1

# Check whether word count of start token is equal to length of the training data

y_tokenizer.word_counts['sostok'],len(y_tr)   

# Deleting the rows that contain only start and end tokens

ind=[]
for i in range(len(y_tr)):
    cnt=0
    for j in y_tr[i]:
        if j!=0:
            cnt=cnt+1
    if(cnt==2):
        ind.append(i)

y_tr=np.delete(y_tr,ind, axis=0)
x_tr=np.delete(x_tr,ind, axis=0)

ind=[]
for i in range(len(y_val)):
    cnt=0
    for j in y_val[i]:
        if j!=0:
            cnt=cnt+1
    if(cnt==2):
        ind.append(i)

y_val=np.delete(y_val,ind, axis=0)
x_val=np.delete(x_val,ind, axis=0)

# ------------------------ Model building ----------------------------

# Return Sequences = True: When the return sequences parameter is set to True, LSTM produces the hidden state and cell state for every timestep
# Return State = True: When return state = True, LSTM produces the hidden state and cell state of the last timestep only
# Initial State: This is used to initialize the internal states of the LSTM for the first timestep
# Stacked LSTM: Stacked LSTM has multiple layers of LSTM stacked on top of each other. This leads to a better representation of the sequence. I encourage you to experiment with the multiple layers of the LSTM stacked on top of each other (it’s a great way to learn this)

# Building a 3 stacked LSTM for the encoder

from keras import backend as K 
K.clear_session()

latent_dim = 300
embedding_dim=100

# Encoder
encoder_inputs = Input(shape=(max_text_len,))

# Embedding layer
enc_emb =  Embedding(x_voc, embedding_dim,trainable=True)(encoder_inputs)

# Encoder lstm 1
encoder_lstm1 = LSTM(latent_dim,return_sequences=True,return_state=True,dropout=0.4,recurrent_dropout=0.4)
encoder_output1, state_h1, state_c1 = encoder_lstm1(enc_emb)

# Encoder lstm 2
encoder_lstm2 = LSTM(latent_dim,return_sequences=True,return_state=True,dropout=0.4,recurrent_dropout=0.4)
encoder_output2, state_h2, state_c2 = encoder_lstm2(encoder_output1)

# Encoder lstm 3
encoder_lstm3=LSTM(latent_dim, return_state=True, return_sequences=True,dropout=0.4,recurrent_dropout=0.4)
encoder_outputs, state_h, state_c= encoder_lstm3(encoder_output2)

# Set up the decoder, using `encoder_states` as initial state.
decoder_inputs = Input(shape=(None,))

# Embedding layer
dec_emb_layer = Embedding(y_voc, embedding_dim,trainable=True)
dec_emb = dec_emb_layer(decoder_inputs)

decoder_lstm = LSTM(latent_dim, return_sequences=True, return_state=True,dropout=0.4,recurrent_dropout=0.2)
decoder_outputs,decoder_fwd_state, decoder_back_state = decoder_lstm(dec_emb,initial_state=[state_h, state_c])

# Attention layer
attn_layer = AttentionLayer(name='attention_layer')
attn_out, attn_states = attn_layer([encoder_outputs, decoder_outputs])

# Concat attention input and decoder LSTM output
decoder_concat_input = Concatenate(axis=-1, name='concat_layer')([decoder_outputs, attn_out])

# Dense layer
decoder_dense =  TimeDistributed(Dense(y_voc, activation='softmax'))
decoder_outputs = decoder_dense(decoder_concat_input)

gcp_bucket = "convbucket"

checkpoint_path = os.path.join("gs://", gcp_bucket, "conversationcatcher", "save_at_{epoch}", datetime.datetime.now().strftime("%Y%m%d-%H%M%S"))

tensorboard_path = os.path.join(  # Timestamp included to enable timeseries graphs
    "gs://", gcp_bucket, "logs", datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
)

callbacks = [
    # TensorBoard will store logs for each epoch and graph performance for us.
    #os.makedirs(tensorboard_path),
    keras.callbacks.TensorBoard(log_dir=tensorboard_path, histogram_freq=1),
    # ModelCheckpoint will save models after each epoch for retrieval later.
    #os.makedirs(checkpoint_path),
    keras.callbacks.ModelCheckpoint(checkpoint_path),
    # EarlyStopping will terminate training when val_loss ceases to improve.
    keras.callbacks.EarlyStopping(monitor='val_loss', mode='min', verbose=1,patience=2),
]

# Define the model 
model = Model([encoder_inputs, decoder_inputs], decoder_outputs)

model.summary()

# Using categorical cross-entropy to overcome memory issues

model.compile(optimizer='rmsprop', loss='sparse_categorical_crossentropy')

# Training will stop once the validation loss increases

# Train on batch of 128

epochs = 100
callbacks = callbacks
batch_size = 256

history=model.fit([x_tr,y_tr[:,:-1]], y_tr.reshape(y_tr.shape[0],y_tr.shape[1], 1)[:,1:] ,epochs=epochs,callbacks=callbacks,batch_size=batch_size, validation_data=([x_val,y_val[:,:-1]], y_val.reshape(y_val.shape[0],y_val.shape[1], 1)[:,1:]))

#model_version = int(datetime.time())
#save_path = os.path.join("gs://", gcp_bucket, "conversationcatcher" + model_version+ ".h5")

save_path = os.path.join("gs://", gcp_bucket, "conversationcatcher")

##MODEL_NAME = 'conversationcatcher.'
#model_version = int(datetime.time())
#model_path = os.path.join(MODEL_NAME, str(model_version))
#os.makedirs(model_path)
#model.save(model_path)

#os.makedirs(save_path)
model.save(save_path)
#model.save("model/conversationcatcher.h5")
# Dictionary for converting the index to word


reverse_target_word_index=y_tokenizer.index_word
reverse_source_word_index=x_tokenizer.index_word
target_word_index=y_tokenizer.word_index

f = open("outputs.txt", "a")
f.write("reverse_target_word_index: " + str(reverse_target_word_index))
f.write("reverse_source_word_index: " + str(reverse_source_word_index))
f.write("target_word_index: " + str(target_word_index))
f.close()

# ------------------------------- Inference ----------------------------------------

# Set up inference for the encoder and decoder

# Encode the input sequence to get the feature vector
encoder_model = Model(inputs=encoder_inputs,outputs=[encoder_outputs, state_h, state_c])
save_path = os.path.join("gs://", gcp_bucket, "encoder")
#os.makedirs(save_path)
encoder_model.save(save_path)

# Decoder setup
# Below tensors will hold the states of the previous time step
decoder_state_input_h = Input(shape=(latent_dim,))
decoder_state_input_c = Input(shape=(latent_dim,))
decoder_hidden_state_input = Input(shape=(max_text_len,latent_dim))

# Get the embeddings of the decoder sequence
dec_emb2= dec_emb_layer(decoder_inputs) 
# To predict the next word in the sequence, set the initial states to the states from the previous time step
decoder_outputs2, state_h2, state_c2 = decoder_lstm(dec_emb2, initial_state=[decoder_state_input_h, decoder_state_input_c])

# Attention inference
attn_out_inf, attn_states_inf = attn_layer([decoder_hidden_state_input, decoder_outputs2])
decoder_inf_concat = Concatenate(axis=-1, name='concat')([decoder_outputs2, attn_out_inf])

# A dense softmax layer to generate prob dist. over the target vocabulary
decoder_outputs2 = decoder_dense(decoder_inf_concat) 

# Final decoder model
decoder_model = Model(
    [decoder_inputs] + [decoder_hidden_state_input,decoder_state_input_h, decoder_state_input_c],
    [decoder_outputs2] + [state_h2, state_c2])

save_path = os.path.join("gs://", gcp_bucket, "decoder")
#os.makedirs(save_path)
decoder_model.save(save_path)

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
