FROM python:3
ADD generate-names-server.py /
ADD nameGenerator.py /
ADD attention.py /
ADD decoder /
ADD encoder /
RUN pip install flask
RUN pip install flask-cors
RUN pip install requests
RUN pip install pandas
RUN pip install bs4
RUN pip install tensorflow
RUN pip install nltk
EXPOSE 5550
CMD ["python","./generate-names-server.py"]
