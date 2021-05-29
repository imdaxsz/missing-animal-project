from flask import Flask, request, render_template
from urllib.request import urlopen
from urllib.parse import urlencode, unquote, quote_plus
import urllib
import json
import xmltodict

# 지역 코드
sido_code = {'6110000':{'6110000':'서울특별시'}, '6260000':{'6260000':'부산광역시'}, '6270000':{'6270000':'대구광역시'}, '6280000':{'6280000':'인천광역시'},
             '6290000':{'6290000':'광주광역시'}, '5690000':{'5690000':'세종특별자치시'}, '6300000':{'6300000':'대전광역시'}, '6310000':{'6310000':'울산광역시'},
             '6410000':{'6410000':'경기도'}, '6420000':{'6420000':'강원도'}, '6430000':{'6430000':'충청북도'}, '6440000':{'6440000':'충청남도'},
             '6450000':{'6450000':'전라북도'}, '6460000':{'6460000':'전라남도'}, '6470000':{'6470000':'경상북도'}, '6480000':{'6480000':'경상남도'},
                                                      '6500000':{'6500000':'제주특별자치도'}}

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
        print(dict)
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


# 지역 코드 json 저장
with open('Region.json', 'w', encoding='utf-8') as file:
    json.dump(sido_code, file, ensure_ascii=False, indent="\t")
file.close()
