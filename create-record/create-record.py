import requests
from bs4 import BeautifulSoup
import json
import time
class StockData:
    def __init__(self):
        self.code = ""
        self.title = ""
        self.price = 0.0
        self.change = 0.0

    def to_dict(self):
        return {
            "code": self.code,
            "title": self.title,
            "price": self.price,
            "change": self.change
        }

def get_data():
    url1 = 'https://www.oyakyatirim.com.tr/piyasa-verileri/XU030'
    response1 = requests.get(url1)
    soup = BeautifulSoup(response1.content, 'html.parser')
    
    titles1 = [element.get_text().strip() for element in soup.select('table > tbody > tr > td')]
    
    stock_data = []
    
    for i in range(18, len(titles1) - 3, 10):
        temp = StockData()
        temp.code = titles1[i]
        temp.title = titles1[i + 1]
        temp.price = float(titles1[i + 2].replace(',', '.'))
        temp.change = float(titles1[i + 6].replace(',', '.'))
        
        stock_data.append(temp)
    
    return stock_data
def post_data_to_localhost(stock_data):
    base_url = 'http://api:3000/stocks'
    headers = {'Content-Type': 'application/json'}
    control = 1
    for stock in stock_data:
        data = stock.to_dict()
        retries = 5
        url = f"{base_url}/{data['code']}"
        while retries:
            try:
                response = requests.patch(url, headers=headers, data=json.dumps(data))
                if response.status_code >= 200 and response.status_code < 300:
                    break
                else:
                    control = 0
                    break
            except requests.exceptions.ConnectionError:
                print("API is not ready yet, retrying...")
                retries -= 1
                time.sleep(5)  # w
    print("Successfully posted all the data!")

# Fetch stock data
data = get_data()

# Post stock data one by one to localhost:3000
post_data_to_localhost(data)
