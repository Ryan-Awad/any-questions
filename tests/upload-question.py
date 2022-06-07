import requests
import json

question = json.dumps({
    'title': 'Hello World',
    'body': 'I like apples'
})
res = requests.post('http://127.0.0.1:8080/upload-question', data=question, headers={'Content-Type': 'application/json'})
print(res.content)
print(res.status_code)