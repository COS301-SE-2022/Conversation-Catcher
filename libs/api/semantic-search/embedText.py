from sentence_transformers import SentenceTransformer, util

class embedText:

    def embed(self, input_name, input_text):

        embedder = SentenceTransformer('all-MiniLM-L6-v2')

        input = input_name + ". " + input_text
        
        embeddings = embedder.encode(input, convert_to_tensor=True)

        return embeddings

    def search(self, query, user):

        embedder = SentenceTransformer('all-MiniLM-L6-v2')
        top_k = 10

        # corpus_embeddings = *Get dataset of all of user's pdfs

        query_embedding = embedder.encode(query, convert_to_tensor=True)
        hits = util.semantic_search(query_embedding, corpus_embeddings, top_k=top_k)
        hits = hits[0] # Get the hits for the first query

        for hit in hits:
            hit_id = hit['corpus_id']
            article_data = df.iloc[hit_id]
            title = article_data["title"]
            print("-", title, "(Score: {:.4f})".format(hit['score']))
        