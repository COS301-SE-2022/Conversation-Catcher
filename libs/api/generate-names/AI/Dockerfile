FROM python:3
ADD generate-names-server.py /
ADD nameGenerator.py /
ADD attention.py /
ADD decoder /decoder
ADD encoder /encoder
COPY reverse_source_word_index /
COPY reverse_target_word_index /
COPY source_word_index /
COPY target_word_index /
COPY templates /templates
RUN pip install flask
RUN pip install flask-cors
RUN pip install requests
RUN pip install pandas
RUN pip install bs4
RUN pip install tensorflow
RUN pip install nltk
RUN [ "python", "-c", "import nltk;nltk.download('stopwords')" ]
EXPOSE 5550
CMD ["python","./generate-names-server.py"]
