import requests
from bs4 import BeautifulSoup
import json
import time
from dataclasses import dataclass
from datetime import date

@dataclass
class Record:
    def __init__(self):
        self.code = ""
        self.title = ""
        self.price = 0.0
        self.change = 0.0
 
    def to_dict(self):
        return {
            "code": self.code,
            "price": self.price,
            "date": self.date.strftime('%Y-%m-%d') # To convert date to a string format
        }



def get_data():
    url1 = 'https://www.oyakyatirim.com.tr/piyasa-verileri/XU030'
    response1 = requests.get(url1)
    soup = BeautifulSoup(response1.content, 'html.parser')
    
    titles1 = [element.get_text().strip() for element in soup.select('table > tbody > tr > td')]
    
    stock_data = []
    
    for i in range(18, len(titles1) - 3, 10):
        temp = Record()
        temp.code = titles1[i]
        temp.price = float(titles1[i + 2].replace(',', '.'))
        temp.date = date.today()
        stock_data.append(temp)

    return stock_data


def post_data_to_localhost(stock_data):
    url = 'http://api:3000/records'
    headers = {'Content-Type': 'application/json'}
    control = 1
    for stock in stock_data:
        data = stock.to_dict()
        retries = 5
        while retries:
            try:
                response = requests.post(url, headers=headers, data=json.dumps(data))
                if response.status_code >= 200 and response.status_code < 300:
                    print(f"Record posted successfully: {data}")
                    break
                else:
                    print(f"Failed to post record: {data}")
                    print(f"Status Code: {response.status_code}")
                    print(f"Response: {response.text}")  # Print the response from the server
                    control = 0
                    break
            except requests.exceptions.ConnectionError:
                print("API is not ready yet, retrying...")
                retries -= 1
                time.sleep(5)
    if control == 1:
        print("Successfully posted all records!")
    else:
        print("Post attempt failed!")

# Fetch stock data
data = get_data()

# Post stock data one by one to localhost:3000
post_data_to_localhost(data)
