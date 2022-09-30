from urllib import response
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import requests
import os
# from embedText import embedText

app = Flask(__name__)
CORS(app)

# embedder = embedText()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/test', methods=['POST'])
def test():
    return jsonify({"result":"success"})

@app.route('/embed', methods=['POST'])
def embed():
    return jsonify({"result":"success"}) 
    # input_name = request.get_json()['name']
    # input_text = request.get_json()['text']
    # embeddings = embedder.embed(input_name, input_text)
    # # print(embeddings.tolist())
    # embeddings_object = { "embeddings": embeddings.tolist() }
    # return jsonify(embeddings_object)

@app.route('/semanticsearch', methods=['POST'])
def semanticsearch():
    query = request.get_json()['query']
    docs = request.get_json()['docs']
    # results = embedder.search(query, docs)
    # results_object = { "results": results }
    all_text = []
    for doc in docs:
        all_text.append(doc['text'])
    
    API_URL = "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2"
    headers = {"Authorization": "Bearer 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"}
    payload = {
        "source_sentence": query,
            "sentences": all_text
    }

    response = requests.post(API_URL, headers=headers, json=payload)
    count = 0
    temp = []
    for match in response.json():
        temp.append({"id":docs[count]['id'],"match":match})
        count += 1
    temp.sort(key=lambda x:x['match'])
    res = []
    for doc in temp:
        res.append(doc['id'])
    return jsonify({"results":res})

    # output = query({
    # "inputs": {
    #         "source_sentence": "That is a happy person",
    #         "sentences": [
    #             "That is a happy dog",
    #             "That is a very happy person",
    #             "Today is a sunny day"
    #         ]
    #     },
    # })
    # return jsonify(results_object)

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5555))
    app.run(debug=True, host='0.0.0.0', port=port)