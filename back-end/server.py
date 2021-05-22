from flask import Flask, request
from urllib.request import urlopen
from urllib.parse import urlencode, unquote, quote_plus
import urllib
import json
import xmltodict
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# Firebase database 인증 및 앱 초기화
cred = credentials.Certificate('missing-animal-project-firebase-adminsdk-mcp27-1361100ab3.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://missing-animal-project-default-rtdb.firebaseio.com/'
})

dir = db.reference()  # 기본 위치 지정
dir.update({'자동차': '기아'})


app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

sido_code = {'6110000':{'6110000':'서울특별시'}, '6260000':{'6260000':'부산광역시'}, '6270000':{'6270000':'대구광역시'}, '6280000':{'6280000':'인천광역시'},
             '6290000':{'6290000':'광주광역시'}, '5690000':{'5690000':'세종특별자치시'}, '6300000':{'6300000':'대전광역시'}, '6310000':{'6310000':'울산광역시'},
             '6410000':{'6410000':'경기도'}, '6420000':{'6420000':'강원도'}, '6430000':{'6430000':'충청북도'}, '6440000':{'6440000':'충청남도'},
             '6450000':{'6450000':'전라북도'}, '6460000':{'6460000':'전라남도'}, '6470000':{'6470000':'경상북도'}, '6480000':{'6480000':'경상남도'},
                                                      '6500000':{'6500000':'제주특별자치도'}}

def find_sido_code(sido):
    keylist = list(sido_code)
    for k in keylist:
        if sido == sido_code[k][k]:
            return k
    return "There is no such Key"

def find_sigungu_code(upr_cd, sigungu):
    keylist = list(sido_code)
    for k in keylist:
        if upr_cd == k:
            tempdict = sido_code[k]
            break
    for k in tempdict:
        if sigungu == tempdict[k]:
            return k
    return "There is no such Key"

def get_sigungu():
    sidokey = list(sido_code)
    sido_list = []
    for k in range(len(sidokey)):
        if k == 5:
            continue
        url = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/sigungu?upr_cd='+ sidokey[k]
        queryParams = '&' + urlencode({quote_plus(
            'ServiceKey'): 'g4fjxGQYBDsO7DJoSVH4qbE9pCV7knL71oKLyPbukZeY5tbq%2BY2GoDr6EqXF1DaQ7Zr%2F4mJvB6Lia9cf%2B1DbGQ%3D%3D'})

        request = urllib.request.Request(url + unquote(queryParams))
        request.get_method = lambda: 'GET'
        response_body = urlopen(request).read()

        result = xmltodict.parse(response_body)
        dict = json.loads(json.dumps(result))
        dict['header'] = 1
        temp = dict['response']['body']['items']
        tmplist = temp['item'] #type = list
        sido_list += tmplist

        for i in range(len(sido_list)):
            for k in range(len(sidokey)):
                if sido_list[i]['uprCd'] == sidokey[k]:
                    key = sidokey[k]
                    orgcd = sido_list[i]['orgCd']
                    sido_code[key][orgcd] = sido_list[i]['orgdownNm']
    return sido_code

get_sigungu()
print("결과:")
print(sido_code)


# 지역 코드 json 저장
file = open("./Region.json", "w", encoding="UTF-8")
with open('Region.json', 'w', encoding='utf-8') as file:
    json.dump(sido_code, file, ensure_ascii=False, indent="\t")
file.close()


@app.route('/')
def hello_world():
    return "hello"


@app.route('/shelter/animal') #유기동물 정보조회
def shelter_animal():
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


@app.route('/shelter/animal/<sido>') #시도별 유기동물 정보 조회
def shelter_sido(sido):
    code = find_sido_code(sido)
    print("code:", code)
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


@app.route('/shelter/animal/<sido>/<sigungu>') #시군구별 유기동물 정보 조회
def shelter_sigungu(sido, sigungu):
    upr_cd = find_sido_code(sido)
    org_cd = find_sigungu_code(upr_cd, sigungu)
    print(upr_cd, org_cd)
    url = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?upr_cd=' + upr_cd +\
          '&org_cd=' + org_cd + '&pageNo=1&numOfRows=10'
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
    app.run(host='0.0.0.0', port=5000, ssl_context=('cert.pem', 'key.pem'))
    #app.run(host='0.0.0.0', port=3000)

