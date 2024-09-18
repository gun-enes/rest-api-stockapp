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
    url1 = 'https://www.oyakyatirim.com.tr/piyasa-verileri/XU100'
    try:
        response1 = requests.get(url1, timeout=10)  # Add timeout
        soup = BeautifulSoup(response1.content, 'html.parser')
        
        titles1 = [element.get_text().strip() for element in soup.select('table > tbody > tr > td')]
        
        stock_data = []
        
        for i in range(18, len(titles1) - 3, 10):  # Fixed the "i" loop variable
            temp = StockData()
            temp.code = titles1[i]
            temp.title = titles1[i + 1]
            temp.price = float(titles1[i + 2].replace(',', '.'))
            temp.change = float(titles1[i + 6].replace(',', '.'))
            stock_data.append(temp)
        
        return stock_data
    except requests.exceptions.RequestException as e:
        print(f"Failed to fetch data: {str(e)}")
        return []

def post_data_to_localhost(operation="PATCH"):
    ws_url = "ws://api:3000"  # WebSocket server URL
    retries = 5  # Retry logic for WebSocket connection

    try:
        # Retry WebSocket connection
        while retries:
            try:
                ws = create_connection(ws_url)
                print("WebSocket connection established")
                break
            except Exception as e:
                print(f"Failed to establish WebSocket connection, retrying... {str(e)}")
                retries -= 1
                time.sleep(5)
        
        if retries == 0:
            print("WebSocket connection failed after multiple attempts.")
            return
        
        # Main loop to fetch and send stock data
        while True:
            stock_data = get_data()
            
            if stock_data:
                stocks_list = [stock.to_dict() for stock in stock_data]  # Prepare the list of stocks

                # Prepare the WebSocket message with operation and stock data
                message = json.dumps({
                    "resource": "stocks",
                    "data": stocks_list  # Sending the entire list of stock data
                })
                
                send_retries = 5

                while send_retries:
                    try:
                        # Send the message to the WebSocket server
                        ws.send(message)
                        print(f"Sent {operation} request with stock data")

                        # Optional: If the server sends a response, receive it
                        response = ws.recv()
                        print(f"Received response: {response}")
                        
                        # Exit the retry loop after a successful send
                        break
                    except Exception as e:
                        print(f"Failed to send {operation} request, retrying... {str(e)}")
                        send_retries -= 1
                        time.sleep(5)
                        
                if send_retries == 0:
                    print(f"Failed to send {operation} request after multiple attempts.")
            
            # Wait before fetching data again
            time.sleep(10)
            print("Successfully processed all the data!")

    except Exception as e:
        print(f"WebSocket connection failed: {str(e)}")
    finally:
        # Close the WebSocket connection
        if 'ws' in locals():
            ws.close()
            print("WebSocket connection closed")

# Run the function to post data
post_data_to_localhost()

