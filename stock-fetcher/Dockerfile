FROM python:3.9-slim
WORKDIR /usr/src/app
COPY . .
EXPOSE 3000
RUN pip install --no-cache-dir -r requirements.txt
CMD ["python3", "web-scrape.py"]

