FROM python:3
ADD embed-text-server.py /
ADD embedText.py /
RUN pip install flask
RUN pip install flask-cors
RUN pip install requests
RUN pip install sentence-transformers
# RUN pip install torch
EXPOSE 5555
CMD ["python","./summarise-text-server.py"]