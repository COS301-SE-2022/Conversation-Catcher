FROM python:3.9.12
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
# RUN pip install nltk
# RUN [ "python", "-c", "import nltk;nltk.download('stopwords')" ]
RUN pip install flask
RUN pip install flask-cors
RUN pip install requests
RUN pip install pandas==1.4.2
RUN pip install bs4
RUN pip install tensorflow==2.9.1
EXPOSE 5550
CMD ["python","./generate-names-server.py"]
