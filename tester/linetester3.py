import urllib.request, json

if __name__ == '__main__':
    url = "http://localhost:3000/linebot" 
    method = "POST"
    headers = {"Content-Type" : "application/json"}

    # PythonオブジェクトをJSONに変換する
    obj = {"xxx" : "xxxx", 123 : 123} 
    json_data = json.dumps(obj).encode("utf-8")
    json_data ='''{"events":[{"type":"message","replyToken":"aaaaa","source":{"userId":"yyyyyy","t\
ype":"user"},"timestamp":1476775063995,"message":{"type":"text","id":"xxxxxx","text":"い"\
}}]}'''.encode("utf-8")
    json_data='''{
    "events": [
        {
            "type": "message",
            "replyToken": "d87cc8abcee3412b9876aadd970ed17c",
            "source": {
                "userId": "xxxx3343e9621da816a02152f94058a12",
                "type": "user"
            },
            "timestamp": 1477658387396,
            "message": {
                "type": "image",
                "id": "5123720128629"
            }
        }
    ]
}'''.encode("utf-8")
    # httpリクエストを準備してPOST
    request = urllib.request.Request(url, data=json_data, method=method, headers=headers)
    with urllib.request.urlopen(request) as response:
        response_body = response.read().decode("utf-8")
        print(response_body)
