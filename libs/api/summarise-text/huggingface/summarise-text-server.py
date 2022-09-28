from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import os
from summariseText import summariseText
import time
from threading import Thread
import requests

app = Flask(__name__)
CORS(app)

summariser = summariseText()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/test', methods=['POST'])
def test():
    return {"result":"success"}

@app.route('/summarise', methods=['POST'])
def return_status():
    input_text = request.get_json()['text']
    pdf_id = request.get_json()['id']
    
    # summarised_text = summariser.summarise(input_text)
    Thread(target = summarise, args=(input_text,pdf_id,)).start()
    return jsonify('Your text is being summarised. It will take approximately 5 minutes.')
    

def summarise(input_text, pdf_id):
    summarised_text = summariser.summarise(input_text)
    summarised_text = summarised_text[0]['summary_text']

    url = "https://ccmain.azurewebsites.net/graphql"
    query = """
    mutation setSummarised($id: String!, $summary: String!) {
    setSummarized(id:$id,summary:$summary)
    }
    """
    variables = {"id" : pdf_id, "summary": summarised_text}
  
    response = requests.post(url=url, json={"query": query, "variables": variables})
    # print("response status code: ", response.status_code)
    if response.status_code == 200:
        print("response : ", response.content)
    return print('Success')

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)

# Passing Data into Our POST Request
# import requests

# Returns:
# <Response [200]>
