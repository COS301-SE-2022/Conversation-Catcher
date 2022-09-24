FROM python:3
ADD summarise-text-server.py /
ADD summariseText.py /
RUN pip install flask
RUN pip install flask-cors
RUN pip install requests
RUN pip install transformers
RUN pip install torch
EXPOSE 5000
CMD ["python","./summarise-text-server.py"]