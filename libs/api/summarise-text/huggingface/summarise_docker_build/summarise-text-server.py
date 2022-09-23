from asyncio.windows_events import NULL
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import os
from summariseText import summariseText

app = Flask(__name__)
CORS(app)

summariser = summariseText()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/summarise', methods=['POST'])
def summarise():
    # if request.form['text'] != NULL:
    #   input_text = request.form['text']
    # else
    input_text = request.get_json()['text']
    summarised_text = summariser.summarise(input_text)
    summarised_text_object = { "summarised_text": summarised_text }
    return jsonify(summarised_text_object)

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
