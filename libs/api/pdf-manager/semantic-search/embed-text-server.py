from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import os
from embedText import embedText

app = Flask(__name__)
CORS(app)

embedder = embedText()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/test', methods=['POST'])
def test():
    return jsonify({"result":"success"})

@app.route('/embed', methods=['POST'])
def embed():
    input_name = request.get_json()['name']
    input_text = request.get_json()['text']
    embeddings = embedder.embed(input_name, input_text)
    # print(embeddings.tolist())
    embeddings_object = { "embeddings": embeddings.tolist() }
    return jsonify(embeddings_object)

@app.route('/semanticsearch', methods=['POST'])
def semanticsearch():
    query = request.get_json()['query']
    docs = request.get_json()['docs']
    results = embedder.search(query, docs)
    results_object = { "results": results }
    return jsonify(results_object)

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5555))
    app.run(debug=False, host='0.0.0.0', port=port)