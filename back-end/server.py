from flask import Flask
from flask_cors import CORS
from urllib.request import urlopen
from urllib.parse import urlencode, unquote, quote_plus
import urllib
import json
import xmltodict
from flask import request


# 유기동물 정보
url = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?bgnde=20210410&endde=20210428&pageNo=1&numOfRows=10'
queryParams = '&' + urlencode({ quote_plus('ServiceKey') : 'g4fjxGQYBDsO7DJoSVH4qbE9pCV7knL71oKLyPbukZeY5tbq%2BY2GoDr6EqXF1DaQ7Zr%2F4mJvB6Lia9cf%2B1DbGQ%3D%3D'})

request = urllib.request.Request(url + unquote(queryParams))
print ('Your Request:\n'+url+queryParams)
request.get_method = lambda: 'GET'
response_body = urlopen(request).read()

result = xmltodict.parse(response_body)
dict = json.loads(json.dumps(result))
dict['header']=1

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app)

@app.route('/')
def hello_world():
    return dict

@app.route('/test')
def test():
    return "test hello"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)