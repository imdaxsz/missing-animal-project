from flask import Flask, request, render_template
from urllib.request import urlopen
from urllib.parse import urlencode, unquote, quote_plus
import urllib
import json
import xmltodict
import os
import os.path
import pyrebase
from firebase_admin import db
from flask_cors import CORS
from werkzeug.utils import secure_filename
import glob

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

# 지역 코드 DB에서 조회 및 서버에 저장
def getsido():
    return dict(db.child('지역코드').get().val())

sido_code = getsido()

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



#--------------------- 라우터 ---------------------#

@app.route('/')
def hello_world():
    return "hello"


# 시도코드 정보조회
@app.route('/get_sido_code')
def get_sido_code():
    codelist = {}
    keylist = list(sido_code)
    for k in keylist:
        tempdict = sido_code[k]
        for tk in tempdict:
            if k == tk:
                codelist[tempdict[tk]] = k
    return codelist

# 시군구코드 정보조회
@app.route('/get_sigungu_code/<sido>')
def get_sigungu_code(sido):
    sidoCode = find_sido_code(sido)
    temp = sido_code[sidoCode]
    codelist = {v:k for k, v in temp.items()}
    return codelist

# 유기동물 정보조회
@app.route('/shelter/animal/<pageNo>')
def shelter_animal(pageNo):
    # 보호소 유기동물 정보
    url = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?pageNo='+ pageNo + '&numOfRows=20'
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
@app.route('/shelter/animal/<sido>/<pageNo>')
def shelter_sido(sido, pageNo):
    code = find_sido_code(sido)
    print("code:", code)
    path = '지역코드/' + code + "/" + code
    print("db 결과:", db.child(path).get().val())
    url = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?upr_cd=' + code + \
          '&pageNo=' + pageNo + '&numOfRows=20'
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


# 시군구별 유기동물 정보 조회
@app.route('/shelter/animal/<sido>/<sigungu>/<pageNo>')
def shelter_sigungu(sido, sigungu, pageNo):
    upr_cd = find_sido_code(sido)
    org_cd = find_sigungu_code(upr_cd, sigungu)
    print(upr_cd, org_cd)
    path = '지역코드/' + upr_cd + "/" + org_cd
    print("db 결과:", db.child(path).get().val())
    url = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?upr_cd=' + upr_cd +\
          '&org_cd=' + org_cd + '&pageNo=' + pageNo + '&numOfRows=20'
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
      writer = request.form['writer']
      uid = request.form['uid']
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


      resultdict = {'title':title, 'postType':postType, 'writer':writer, 'uid':uid, 'breed':breed,
        'sex':sex, 'classification':classification, 'age':age, 'weight':weight, 'character':character,
        'lostDate':lostDate, 'sidoCode':sidoCode, 'sigunguCode':sigunguCode, 'detailPlace':detailPlace,
        'postDate':postDate, 'contact':contact, 'postContent':postContent}

      postKey = db.child('게시글/' + postType).push(resultdict)
      postkey = postKey['name'][1:]
      print(postkey)
        
      postImgs = request.files.getlist("postImg[]")
      imgList = []
      i = 0
      for postImg in postImgs:
          name, ext = os.path.splitext(postImg.filename)
          i += 1
          filename = uid + "_" + postkey + "_" + postDate + "_" + str(i)
          postImg.filename = filename + ext
          imgList.append(postImg.filename)
          postImg.save(f'static/images/{secure_filename(postImg.filename)}')
      
      resultdict['postImg'] = imgList
      print(resultdict)
      return resultdict


# 게시글 삭제
@app.route('/post_delete/<postID>', methods=['DELETE'])
def post_delete(postID):
    if request.method == 'DELETE':
        postType = request.form['postType']
        path = '게시글/' + postType + '/' + postID
        db.child(path).remove()
        return "post has been deleted"


# 게시글 수정
@app.route('/post_update/<postID>', methods=['PUT'])
def post_update(postID):
    if request.method == 'PUT':
        title = request.form['title']
        writer = request.form['writer']
        uid = request.form['uid']
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

        resultdict = {'title': title, 'postType': postType, 'writer': writer, 'uid': uid, 'breed': breed,
                      'sex': sex, 'classification': classification, 'age': age, 'weight': weight,
                      'character': character,
                      'lostDate': lostDate, 'sidoCode': sidoCode, 'sigunguCode': sigunguCode,
                      'detailPlace': detailPlace,
                      'postDate': postDate, 'contact': contact, 'postContent': postContent}

        postType = request.form['postType']
        path = '게시글/' + postType + '/' + postID
        db.child(path).update(resultdict)
        return "post has been updated"



# 실종동물 찾기 (임시보호/목격 제보 조회)
@app.route('/disc_resc/<pageNo>')
def disc_resc_list(pageNo):
    resc = db.child('게시글/임시보호').get().val()
    disc = db.child('게시글/목격제보').get().val()

    result = None
    if disc is not None and resc is not None:
        result = dict({**resc, **disc})
    elif disc is None and resc is not None:
        result = dict(resc)

    elif disc is not None and resc is None:
        result = dict(disc)

    if result is not None:
        print("임시보호/목격제보:", result.keys())
        print("임시보호/목격제보:", result)
        keylist = list(result)
        valuelist = list(result.values())

        postdict = {}
        idx = (int(pageNo)-1) * 10
        for i in range(idx, idx+10):
            if i < len(keylist):
                postdict[keylist[i]] = valuelist[i]

        if postdict != None:
            print(postdict)
           # 이미지 가져오기
            for k in postdict.keys():
                postId = k[1:]
                uid = postdict[k]['uid']
                postDate = postdict[k]['postDate']
                name = uid + "_" + postId + "_" + postDate + "_" + str(1)
                condition = 'static/images/' + name + '*.*'

                files = glob.glob(condition)
                for file in files:
                    imgName = os.path.basename(file)
                    postdict[k]['postImg'] = imgName
                    print(imgName)

            return postdict
    else:
        print("임시보호/목격제보 없음")
        return "임시보호/목격제보 없음"


# 실종신고 조회
@app.route('/mis/<pageNo>')
def mis_list(pageNo):
    print(pageNo)
    mis_data = db.child('게시글/실종신고').get().val()
    if mis_data is not None:
        result = dict(mis_data)
        keylist = list(result)
        #keylist.reverse()
        #print(keylist)
        valuelist = list(result.values())
        #valuelist.reverse()
        #print(valuelist)

        postdict = {}
        idx = (int(pageNo)-1) * 10
        for i in range(idx, idx+10):
            if i < len(keylist):
                postdict[keylist[i]] = valuelist[i]

        if postdict != None:
            print(postdict)
            # 이미지 가져오기
            for k in postdict.keys():
                postId = k[1:]
                uid = postdict[k]['uid']
                postDate = postdict[k]['postDate']
                name = uid + "_" + postId + "_" + postDate + "_" + str(1)
                condition = 'static/images/' + name + '*.*'

                files = glob.glob(condition)
                for file in files:
                    imgName = os.path.basename(file)
                    postdict[k]['postImg'] = imgName
                    print(imgName)

            return postdict
    else:
        print("실종신고 없음")
        return "실종신고 없음"


# 게시글 상세 조회
@app.route('/detail/<postType>/<postID>')
def post_detail(postType, postID):
    post_type = ''
    if postType == 'mis':
        post_type = '실종신고'
    elif postType == 'disc':
        post_type = '목격제보'
    elif postType == 'resc':
        post_type = '임시보호'
    path = '게시글/' + post_type + '/' + postID
    result = dict(db.child(path).get().val())

    # 이미지 전달 위한 날짜 및 사용자 아이디 가져오기
    uid = result['uid']
    postDate = result['postDate']

    # 이미지 가져오기
    postId = postID[1:]
    name = uid + "_" + postId + "_" + postDate
    condition = 'static/images/' + name + '*.*'
    files = glob.glob(condition)
    imgList = []
    for file in files:
        imgName = os.path.basename(file)
        imgList.append(imgName)
        print(imgName)

    result['postImg'] = imgList

    print(result)
    return result


# 보호소 유기동물 상세 조회
@app.route('/shelter/animal/detail/<pageNo>/<desertionNo>')
def shelter_animal_detail(pageNo, desertionNo):
    url = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?pageNo=' + pageNo + '&numOfRows=20'
    queryParams = '&' + urlencode({quote_plus(
        'ServiceKey'): 'g4fjxGQYBDsO7DJoSVH4qbE9pCV7knL71oKLyPbukZeY5tbq%2BY2GoDr6EqXF1DaQ7Zㅔr%2F4mJvB6Lia9cf%2B1DbGQ%3D%3D'})

    request = urllib.request.Request(url + unquote(queryParams))
    # print('Your Request:\n' + url + queryParams)
    request.get_method = lambda: 'GET'
    response_body = urlopen(request).read()

    result = xmltodict.parse(response_body)
    dict = json.loads(json.dumps(result))
    dict['header'] = 1
    temp = dict['response']['body']['items']
    postlist = temp['item']  # type = list

    for i in range(20):
        if postlist[i]['desertionNo'] == desertionNo:
            return postlist[i]


# 보호소 정보 조회
@app.route('/shelter_info/<pageNo>')
def shelter_info(pageNo):
    shelter_data = db.child('보호소').get().val()
    if shelter_data is not None:
        result = shelter_data[1:]
        print(result)

        idx = (int(pageNo) - 1) * 10
        sh = result[idx:idx+10]
        info = {'data':sh}
        return info
    else:
        return "no shelter data"


# 로컬 이미지 서버 전달
@app.route('/img/<imgName>')
def show_img(imgName):
    imgPath = 'images/' + imgName
    return render_template('./img_test.html', image_file=imgPath)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)