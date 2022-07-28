from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import base64
import os
from summarise_text import summarise_text

app = Flask(__name__)
CORS(app)

summariser = summarise_text()

@app.route('/summarise', methods=['POST'])
def summarise():
    b64 = request.form['image'].encode('ascii')
    img_name = "uploads/image."+request.form['extension']
    with open(img_name, "wb") as new_file:
        new_file.write(base64.decodebytes(b64))

    text = summariser.summarise(img_name)
    os.remove(img_name)
    summarised_text = { "summary": text }
    return jsonify(summarised_text)

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)