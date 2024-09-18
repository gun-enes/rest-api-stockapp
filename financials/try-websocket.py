import time
from websocket import create_connection
import json

def post_data_to_localhost(operation="GET"):
    ws_url = "ws://54.235.247.243:3000"  # WebSocket server URL
    control = 1

    try:
        # Establish a WebSocket connection
        c = 0
        ws = create_connection(ws_url)
        print("WebSocket connection established")
        while c<5:
            c = c+1
            time.sleep(2)
            message = json.dumps({
                        "operation": operation,
                        "resource": "stocks",
                        "data": {
                            "code": 'THYAO'
                        }
                    })
            ws.send(message)
            response = ws.recv()
            parsed_data = json.loads(response)
            stock_code = parsed_data['result']['code']
            stock_price = parsed_data['result']['price']
            print(stock_code + "  " + str(stock_price))

    except Exception as e:
        print(f"WebSocket connection failed: {str(e)}")
        control = 0
    finally:
        # Close the WebSocket connection
        if ws:
            ws.close()
            print("WebSocket connection closed")

post_data_to_localhost()