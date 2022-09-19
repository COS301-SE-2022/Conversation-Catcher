from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import os
from speechToText import speechToText
# from pydub import AudioSegment
# from pydub.playback import play
import base64
import wave

app = Flask(__name__)
CORS(app)

sttConverter = speechToText()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/stt', methods=['POST'])
def stt():
    #wav params
    nchannels = 1
    sampwidth = 2
    samplerate = 44100.0 / 3
    nframes = len(request.get_json()['audio_chunks']) * 1280
    comptype = "NONE"
    compname = "not compressed"
    f = wave.open("Temp.wav","wb")
    f.setparams((nchannels, sampwidth, samplerate, nframes, comptype, compname))
    for chunk in request.get_json()['audio_chunks']:
      f.writeframesraw(base64.b64decode(chunk))
    # if os.path.exists("Temp.wav"):
    #   os.remove("Temp.wav")
    # play(wav_file)

    #speech to text
    converted_text = sttConverter.stt("Temp.wav")
    print(converted_text)
    print(type(converted_text))
    converted_text_object = { "converted_text": converted_text }
    return jsonify(converted_text_object)

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5050))
    app.run(debug=True, host='0.0.0.0', port=port)
