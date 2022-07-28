from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import os
from summarise_text import summarise_text

app = Flask(__name__)
CORS(app)

summariser = summarise_text()

@app.route('/summarise', methods=['POST'])
def summarise():
    non_summarised_text = request.form['text']
    text = summariser.summarise(non_summarised_text)
    summarised_text = { "summary": text }
    return jsonify(summarised_text)

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)