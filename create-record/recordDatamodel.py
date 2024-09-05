from dataclasses import dataclass
from datetime import date

@dataclass
class Record:
    code: str
    price: float
    date: date
 
    def to_dict(self):
        return {
            "code": self.code,
            "price": self.price,
            "date": self.date.isoformat()  # To convert date to a string format
        }
