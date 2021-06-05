import json

file_path = "./area.json"

with open(file_path, "r", encoding='UTF-8') as json_file:
    data = json.load(json_file)


def get_key(val):
    for key, value in sido_code.items():
        if val == value:
            return key

    return "There is no such Key"


def get_smallKey(val, Dict):
    for key, value in Dict.items():
        if val == value:
            return key

    return "There is no such Key"

sido_code = {'6110000':'서울특별시', '6260000':'부산광역시', '6270000':'대구광역시', '6280000':'인천광역시',
             '6290000':'광주광역시', '5690000':'세종특별자치시', '6300000':'대전광역시', '6310000':'울산광역시',
             '6410000':'경기도', '6420000':'강원도', '6430000':'충청북도', '6440000':'충청남도',
             '6450000':'전라북도', '6460000':'전라남도', '6470000':'경상북도', '6480000':'경상남도',
             '6500000':'제주특별자치도'}

def complex(str):
    A = str.split()[0]
    B = str.split()[1]
    sido = get_key(A)
    dict = data[sido]
    sigungu = get_smallKey(B, dict)

    return sido, sigungu

