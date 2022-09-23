FROM python:3
ADD summarise-text-server.py /
ADD summariseText.py /
RUN pip install azure-cognitiveservices-speech
RUN pip install flask
RUN pip install flask-cors
RUN pip install requests
CMD ["python","./summarise-text-server.py"]