FROM python:3
ADD summarise-text-server.py /
ADD summariseText.py /
ADD torch-1.12.1-cp310-cp310-manylinux1_x86_64.whl /
RUN pip install flask
RUN pip install flask-cors
RUN pip install requests
RUN pip install transformers
RUN pip install torch-1.12.1-cp310-cp310-manylinux1_x86_64.whl
EXPOSE 5000
CMD ["python","./summarise-text-server.py"]