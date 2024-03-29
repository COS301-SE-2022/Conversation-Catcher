from sentence_transformers import SentenceTransformer, util
import requests
import torch

class embedText:

    def embed(self, input_name, input_text):

        embedder = SentenceTransformer('all-MiniLM-L6-v2')

        input = input_name + ". " + input_text
        
        embeddings = embedder.encode(input, convert_to_tensor=False)

        return embeddings

    def search(self, query, df):

        embedder = SentenceTransformer('all-MiniLM-L6-v2')
        top_k = 10

        # corpus_embeddings = df['id','embeddings']
        corpus_embeddings = []
        for pdf in df:
            corpus_embeddings.append(torch.as_tensor(pdf['embeddings']))
        
        print(corpus_embeddings)

        query_embedding = embedder.encode(query, convert_to_tensor=True)
        hits = util.semantic_search(query_embedding, corpus_embeddings, top_k=top_k)
        hits = hits[0] # Get the hits for the first query

        ids = []
        for hit in hits:
            # hit_id = hit['id']
            # pdf_data = df.iloc[hit_id]
            name = df[hit["corpus_id"]]["name"]
            ids.append(df[hit["corpus_id"]]["id"])
            print("-", name, "(Score: {:.4f})".format(hit['score']))

        return ids
        