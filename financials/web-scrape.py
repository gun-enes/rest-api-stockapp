import requests
from bs4 import BeautifulSoup
import json
import time

def get_data():
    url1 = 'https://www.kap.org.tr/tr/sirket-finansal-bilgileri/4028e4a1413b7ef401413bc2251e0047'
    response1 = requests.get(url1)
    soup = BeautifulSoup(response1.content, 'html.parser')
    
    titles1 = [element.get_text().strip() for element in soup.select('#printAreaDiv > div > div')]
    fin = titles1[0].replace(' \n\n ','')
    tit = fin.replace(' \n\n', '').split('\n\n')
    a = 0
    for x in range(len(tit)):
        if len(tit[x]) > 10:
            a = a + 1 
            b = tit[x].replace('\n','').strip();
            print(b.split("  ")[0].replace(" ", "_").lower())
            #print(str(a) + ": " + tit[x].replace('\n','').strip())
"""
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
"""
# Fetch stock data
data = get_data()