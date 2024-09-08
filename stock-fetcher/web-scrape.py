import requests
from bs4 import BeautifulSoup
import json
import time
from websocket import create_connection

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

def post_data_to_localhost(operation="PATCH"):
    ws_url = "ws://localhost:3000"  # WebSocket server URL
    control = 1

    try:
        # Establish a WebSocket connection
        ws = create_connection(ws_url)
        print("WebSocket connection established")
        
        while True:
            time.sleep(1)
            stock_data = get_data()
            for stock in stock_data:
                data = stock.to_dict()
                retries = 5

                # Prepare the WebSocket message with operation and stock data
                message = json.dumps({
                    "operation": operation,
                    "resource": "stocks",
                    "data": data
                })
                
                while retries:
                    try:
                        # Send the message to the WebSocket server
                        ws.send(message)
                        print(f"Sent {operation} request for stock {data['code']}")
                        
                        # Optional: If the server sends a response, receive it
                        response = ws.recv()
                        print(f"Received response: {response}")
                        
                        # Exit the retry loop after a successful send
                        break
                    except Exception as e:
                        print(f"Failed to send {operation} request for {data['code']}, retrying... {str(e)}")
                        retries -= 1
                        time.sleep(5)
                        
                if retries == 0:
                    control = 0
                    print(f"Failed to send {operation} request for {data['code']} after multiple attempts.")
            
        print("Successfully processed all the data!")
    except Exception as e:
        print(f"WebSocket connection failed: {str(e)}")
        control = 0
    finally:
        # Close the WebSocket connection
        if ws:
            ws.close()
            print("WebSocket connection closed")



post_data_to_localhost()