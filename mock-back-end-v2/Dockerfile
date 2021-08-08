FROM python:3

WORKDIR /usr/app

COPY . .

RUN pip install -r requirements.txt

EXPOSE 80

CMD ["python", "main.py"]