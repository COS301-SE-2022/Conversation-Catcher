FROM python:3
ADD embed-text-server.py /
ADD embedText.py /
ADD torch-1.12.1-cp310-cp310-manylinux1_x86_64.whl /
RUN pip install flask
RUN pip install flask-cors
RUN pip install requests
RUN pip install torch-1.12.1-cp310-cp310-manylinux1_x86_64.whl
RUN pip install sentence-transformers
EXPOSE 5555
CMD ["python","./embed-text-server.py"]