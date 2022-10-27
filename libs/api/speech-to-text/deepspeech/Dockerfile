FROM python:3
ADD speech-to-text-server.py /
RUN pip install azure-cognitiveservices-speech
RUN pip install flask
RUN pip install flask-cors
RUN pip install requests
COPY templates /templates
# RUN pip install azure-identity 
# RUN pip install azure-keyvault-secrets
EXPOSE 5050
CMD ["python","./speech-to-text-server.py"]
