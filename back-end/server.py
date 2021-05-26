from flask import Flask, request
from urllib.request import urlopen
from urllib.parse import urlencode, unquote, quote_plus
import urllib
import json
import xmltodict
import os
import pyrebase
from firebase_admin import db
from flask_cors import CORS
from werkzeug.utils import secure_filename


app = Flask(__name__)
CORS(app, resources={r'*': {'origins': '*'}})
app.config['JSON_AS_ASCII'] = False


# Firebase database
config = {
  "apiKey": "AIzaSyCu2WRIIfu_o3-aHCoNWv6SJ1qnlbsS-Ic",
  "authDomain": "missing-animal-project.firebaseapp.com",
  "databaseURL": "https://missing-animal-project-default-rtdb.firebaseio.com",
  "projectId": "missing-animal-project",
  "storageBucket": "missing-animal-project.appspot.com",
  "messagingSenderId": "327509368295",
  "appId": "1:327509368295:web:ba84aeeede3a63d70ef142",
  "measurementId": "G-70N5H0RJKV",
};

firebase = pyrebase.initialize_app(config)
db = firebase.database()


#--------------------- 지역 관리 ---------------------#

# 지역 코드
sido_code = {'6110000':{'6110000':'서울특별시'}, '6260000':{'6260000':'부산광역시'}, '6270000':{'6270000':'대구광역시'}, '6280000':{'6280000':'인천광역시'},
             '6290000':{'6290000':'광주광역시'}, '5690000':{'5690000':'세종특별자치시'}, '6300000':{'6300000':'대전광역시'}, '6310000':{'6310000':'울산광역시'},
             '6410000':{'6410000':'경기도'}, '6420000':{'6420000':'강원도'}, '6430000':{'6430000':'충청북도'}, '6440000':{'6440000':'충청남도'},
             '6450000':{'6450000':'전라북도'}, '6460000':{'6460000':'전라남도'}, '6470000':{'6470000':'경상북도'}, '6480000':{'6480000':'경상남도'},
                                                      '6500000':{'6500000':'제주특별자치도'}}

# 시도 코드 검색
def find_sido_code(sido):
    keylist = list(sido_code)
    for k in keylist:
        if sido == sido_code[k][k]:
            return k
    return "There is no such Key"


# 시군구 코드 검색
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


# api로부터 시군구 코드 가져와서 저장
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

#get_sigungu()


# 지역 코드 json 저장
file = open("./Region.json", "w", encoding="UTF-8")
with open('Region.json', 'w', encoding='utf-8') as file:
    json.dump(sido_code, file, ensure_ascii=False, indent="\t")
file.close()



#--------------------- 라우터 ---------------------#

@app.route('/')
def hello_world():
    return "hello"



# 유기동물 정보조회
@app.route('/shelter/animal')
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


# 시도별 유기동물 정보 조회
@app.route('/shelter/animal/<sido>')
def shelter_sido(sido):
    code = find_sido_code(sido)
    print("code:", code)
    path = '지역코드/' + code + "/" + code
    print("db 결과:", db.child(path).get().val())
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





# 게시글 작성
@app.route('/postok', methods=['POST'])
def postok():
   if request.method == 'POST':
      title = request.form['title']
      postType = request.form['postType']
      breed = request.form['breed']
      sex = request.form['sex']
      classification = request.form['classification']
      age = request.form['age']
      weight = request.form['weight']
      character = request.form['character']
      lostDate = request.form['lostDate']
      sidoCode = request.form['sidoCode']
      sigunguCode = request.form['sigunguCode']
      detailPlace = request.form['detailPlace']
      postDate = request.form['postDate']
      contact = request.form['contact']
      postContent = request.form['postContent']
      writer = request.form['writer']

      resultdict = {'title':title, 'postType':postType, 'writer':writer, 'breed':breed,
        'sex':sex, 'classification':classification, 'age':age, 'weight':weight, 'character':character,
        'lostDate':lostDate, 'sidoCode':sidoCode, 'sigunguCode':sigunguCode, 'detailPlace':detailPlace,
        'postDate':postDate, 'contact':contact, 'postContent':postContent}

      postKey = db.child('게시글/' + postType).push(resultdict)
      print("postkey:", postKey['name'])

      postImgs = request.files.getlist("postImg[]")
      i = 0
      for postImg in postImgs:
          name, ext = os.path.splitext(postImg.filename)
          print(ext)
          i += 1
          filename = writer + postKey['name'] + "_" + postDate + "_" + str(i)
          postImg.filename = filename + ext
          postImg.save(f'images/{secure_filename(postImg.filename)}')

      print(resultdict)
      return resultdict



# 실종동물 찾기 (임시보호/목격 제보 조회)
@app.route('/disc_resc')
def disc_resc_list():
    resc = db.child('게시글/임시보호').get().val()
    disc = db.child('게시글/목격').get().val()
    if disc is not None and resc is not None:
        result = dict({**resc, **disc})
    elif disc is None and resc is not None:
        result = (resc)
    elif disc is not None and resc is None:
        result = (disc)
    if result is not None:
        print("임시보호/목격:", result.keys())
        print("임시보호/목격:", result)
        return result
    else:
        print("임시보호/목격 없음")
        return "임시보호/목격 없음"


# 실종신고 조회
@app.route('/mis')
def mis_list():
    mis_data = db.child('게시글/실종신고').get().val()
    if mis_data is not None:
        mis = dict(mis_data)
        print("실종신고:", mis)
        print("실종신고:", mis.keys())
        return mis
    else:
        print("실종신고 없음")
        return "실종신고 없음"

# 게시글 상세 조회
@app.route('/<postCode>/<postID>')
def post_detail(postCode, postID):
    if postCode == 'mis':
        postType = '실종신고'
    elif postCode == 'disc':
        postType = '목격'
    elif postCode == 'resc':
        postType = '임시보호'
    path = '게시글/' + postType + "/" + postID
    result = dict(db.child(path).get().val())
    print(result)
    return result


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)