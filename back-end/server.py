from flask import Flask, request
from flask_cors import CORS
from urllib.request import urlopen
from urllib.parse import urlencode, unquote, quote_plus
import urllib
import json
import xmltodict

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

@app.route('/')
def hello_world():
    return "hello"

sido_code = {'6110000':'서울특별시', '6260000':'부산광역시', '6270000':'대구광역시', '6280000':'인천광역시', '6290000':'광주광역시', '5690000':'세종특별자치시',
             '6300000':'대전광역시', '6310000':'울산광역시', '6410000':'경기도', '6420000':'강원도','6430000':'충청북도', '6440000':'충청남도', '6450000':'전라북도',
             '6460000':'전라남도', '6470000':'경상북도', '6480000':'경상남도', '6500000':'제주특별자치도'}

@app.route('/shelter/animal', methods=['GET'])
def shelter_animal():
    if request.method == 'GET':
        # 보호소 유기동물 정보
        url = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?pageNo=1&numOfRows=10'
        queryParams = '&' + urlencode({quote_plus(
            'ServiceKey'): 'g4fjxGQYBDsO7DJoSVH4qbE9pCV7knL71oKLyPbukZeY5tbq%2BY2GoDr6EqXF1DaQ7Zr%2F4mJvB6Lia9cf%2B1DbGQ%3D%3D'})

        request = urllib.request.Request(url + unquote(queryParams))
        print('Your Request:\n' + url + queryParams)
        request.get_method = lambda: 'GET'
        response_body = urlopen(request).read()

        result = xmltodict.parse(response_body)
        dict = json.loads(json.dumps(result))
        dict['header'] = 1
        return dict

def find_sido_code(sido):
    for key, value in sido_code.items():
        if sido == value:
            return key
    return "There is no such Key"

@app.route('/shelter/animal/<sido>')
def shelter(sido):
    code = find_sido_code(sido)
    #return code

    url = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?upr_cd=' + code + '&pageNo=1&numOfRows=10'
    queryParams = '&' + urlencode({quote_plus(
        'ServiceKey'): 'g4fjxGQYBDsO7DJoSVH4qbE9pCV7knL71oKLyPbukZeY5tbq%2BY2GoDr6EqXF1DaQ7Zr%2F4mJvB6Lia9cf%2B1DbGQ%3D%3D'})

    request = urllib.request.Request(url + unquote(queryParams))
    print('Your Request:\n' + url + queryParams)
    request.get_method = lambda: 'GET'
    response_body = urlopen(request).read()

    result = xmltodict.parse(response_body)
    dict = json.loads(json.dumps(result))
    dict['header'] = 1
    return dict

@app.route('/test', methods=['POST'])
def test_post():
   if request.method == 'POST':
      value = request.form['title']
      return value


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)