FROM python:3
ADD ../speech-to-text-server.py /
RUN pip install azure-cognitiveservices-speech
RUN pip install flask
RUN pip install flask-cors
RUN pip install requests
CMD ["python","./speech-to-text-server"]
