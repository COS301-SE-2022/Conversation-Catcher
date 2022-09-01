from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import os
from speechToText import speechToText

app = Flask(__name__)
CORS(app)

sttConverter = speechToText()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/stt', methods=['POST'])
def stt():
    input_audio = request.form['audio_path']
    converted_text = sttConverter.stt(input_audio).decode()
    converted_text_object = { "converted_text": converted_text }
    return jsonify(converted_text_object)

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5050))
    app.run(debug=True, host='0.0.0.0', port=port)