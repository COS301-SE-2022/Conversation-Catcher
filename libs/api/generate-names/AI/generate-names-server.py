from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import os
from nameGenerator import nameGenerator

app = Flask(__name__)
CORS(app)

generator = nameGenerator()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/gennames', methods=['POST'])
def summarise():
    input_text = request.form['text']
    generated_name = generator.generateName(input_text)
    generated_name_object = { "generated_name": generated_name }
    return jsonify(generated_name_object)

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5550))
    app.run(debug=True, host='0.0.0.0', port=port)