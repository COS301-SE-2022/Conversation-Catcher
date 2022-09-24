import time
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import os
# from speechToText import speechToText
# from pydub import AudioSegment
# from pydub.playback import play
import base64
import wave
import azure.cognitiveservices.speech as speechsdk
from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/test', methods=['POST'])
def test():
  return { "'result'": "success" }

@app.route('/stt', methods=['POST'])
def stt():

    # credential = DefaultAzureCredential()
    # client = SecretClient(
    #     vault_url="https://conversationcatcher.vault.azure.net/",
    #     credential=credential
    # )
    # secret = client.get_secret("speech-to-text")
    # print(f"Secret value is {secret.value}")
    # return { "converted_text": secret.value }
    #Set the wav parameters and create the wav file
    nchannels = 1
    sampwidth = 2
    samplerate = 44100.0 / 3
    nframes = len(request.get_json()['audio_chunks']) * 1280
    comptype = "NONE"
    compname = "not compressed"
    f = wave.open("Temp.wav","wb")
    f.setparams((nchannels, sampwidth, samplerate, nframes, comptype, compname))
    #Load the base64 encrypted array chunks into the wav file
    for chunk in request.get_json()['audio_chunks']:
      f.writeframesraw(base64.b64decode(chunk))
    # if os.path.exists("Temp.wav"):
    #   os.remove("Temp.wav")
    # play(wav_file)

    #Speech to text
    #Setup connection with Azure speech-to-text
    speech_config = speechsdk.SpeechConfig(subscription="10ea50633a724339a33810ab17329c37", region="southafricanorth")
    speech_config.speech_recognition_language="en-ZA"

    #Get the audio file that was created
    audio_config = speechsdk.audio.AudioConfig(filename="Temp.wav")
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)

    #Function to stop the continuous recognition
    done = False
    def stop_cb(evt):
      print('CLOSING on {}'.format(evt))
      speech_recognizer.stop_continuous_recognition()
      nonlocal done
      done = True

    #Connects callbacks to events on the speech_recognizer
    result = []
    # speech_recognizer.recognizing.connect(lambda evt: print('RECOGNIZING: {}'.format(evt)))
    speech_recognizer.recognized.connect(lambda evt: result.append(evt.result.text))
    speech_recognizer.session_started.connect(lambda evt: print('SESSION STARTED: {}'.format(evt)))
    speech_recognizer.session_stopped.connect(lambda evt: print('SESSION STOPPED {}'.format(evt)))
    speech_recognizer.canceled.connect(lambda evt: print('CANCELED {}'.format(evt)))

    #Stop the continuous recognition
    speech_recognizer.session_stopped.connect(stop_cb)
    speech_recognizer.canceled.connect(stop_cb)

    #Start the continuous recognition
    speech_recognizer.start_continuous_recognition()
    while not done:
      time.sleep(.5)

    full_text = ''
    for text in result:
      print(text)
      full_text += ' ' + text

    # converted_text = sttConverter.stt("Temp.wav")
    converted_text_object = { "converted_text": full_text }
    return jsonify(converted_text_object)

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5050))
    app.run(debug=True, host='0.0.0.0', port=port)
