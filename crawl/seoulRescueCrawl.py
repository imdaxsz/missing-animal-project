import json
import time

import requests
from selenium import webdriver

# 생성될 json파일
from selenium.common.exceptions import NoSuchElementException

import areaCode

file = open("./SeoulRescue.json", "w", encoding="UTF-8")

# 데이터가 담길 Dictionary 및 index
file_data = {}
rank = 1

chromedriver = 'C:\Webdriver\chromedriver.exe'
driver = webdriver.Chrome(chromedriver)

driver.get('http://www.karma.or.kr/human_boardA/animal_board.php?act=list&bid=animal&fid=55130&thread=AAAA&page=1&sn=0000055262')


def uplodeData() :
    with open('SeoulRescue.json', 'w', encoding='utf-8') as file:
        json.dump(file_data, file, ensure_ascii=False, indent="\t")
    file.close()
    driver.quit()
    exit()


# 1page 크롤링
for i in range(1, 7):
    # 동물 종류, 성별, 나이, 몸무게, 특징, 털 색, 본문, 구조일(구조된 동물만 게시됨), 목격위치, 게시글종류코드, 지역 코드
    type = driver.find_element_by_css_selector("body > div.wrap_sub > div > div:nth-child(" + str(i) + ") > form > ul > li:nth-child(4)")
    sex = driver.find_elements_by_css_selector("body > div.wrap_sub > div > div:nth-child(" + str(i) + ") > form > ul > li:nth-child(5)")
    age = driver.find_elements_by_css_selector("body > div.wrap_sub > div > div:nth-child(" + str(i) + ") > form > ul > li:nth-child(6)")
    weight = driver.find_elements_by_css_selector("body > div.wrap_sub > div > div:nth-child(" + str(i) + ") > form > ul > li:nth-child(10)")

    # 중성화수술, 성격, 건강상태를 특징으로 묶기로 함
    character_1 = driver.find_elements_by_css_selector("body > div.wrap_sub > div > div:nth-child(" + str(i) + ") > form > ul > li:nth-child(8)")
    character_2 = driver.find_elements_by_css_selector("body > div.wrap_sub > div > div:nth-child(" + str(i) + ") > form > ul > li:nth-child(9)")
    character_3 = driver.find_elements_by_css_selector("body > div.wrap_sub > div > div:nth-child(" + str(i) + ") > form > ul > li:nth-child(11)")

    character = character_1[0].text + ", " + character_2[0].text + ", " + character_3[0].text
    color = driver.find_elements_by_css_selector("body > div.wrap_sub > div > div:nth-child(" + str(i) + ") > form > ul > li:nth-child(7)")
    postCont = driver.find_elements_by_css_selector("body > div.wrap_sub > div > div:nth-child(" + str(i) + ") > form > ul > li:nth-child(13)")
    detailPlace = driver.find_element_by_css_selector("body > div.wrap_sub > div > div:nth-child(" + str(i) + ") > form > ul > li:nth-child(3)")

    # 구조된 동물 게시물이므로
    postCode = "resc"
    sidoCode, sigungu = areaCode.complex(detailPlace.text)

    # 날짜 입력이 2021-01-01 (SN:~~ 과같은 형태라 슬라이싱을 요함. 다듬기 전의 형태인 rescDateTmp
    lostDateTmp = driver.find_elements_by_css_selector("body > div.wrap_sub > div > div:nth-child(" + str(i) + ") > form > ul > li:nth-child(1) > i")[0].text
    lostDate = lostDateTmp[0:4] + lostDateTmp[5:7] + lostDateTmp[8:10]


    #이미지 저장을 위한 코드
    img = driver.find_elements_by_css_selector('body > div.wrap_sub > div > div:nth-child('+ str(i) + ') > form > a > a > img')
    r = requests.get(img[0].get_attribute('src'))
    file = open('seoulRescueImg_' + str(i) + '.jpg', 'wb')
    file.write(r.content)
    file.close()

    if sex[0].text.split()[1] == '미상':
        Sex = '미확인'
    else:
        Sex = sex[0].text.split()[1]


    file_data[rank] = {'title': "보호중에 있습니다.",
                       'postCode': postCode,
                       'breed': type.text.split()[3],
                       'sex': Sex,
                       'classification' : type.text.split()[1],
                       'age': age[0].text.split()[1],
                       'weight': weight[0].text.split()[1],
                       'character': character + ", 모색:" + color[0].text.split()[1],
                       'lostDate': lostDate,
                       'sidoCode': sidoCode,
                       'sigunguCode': sigungu,
                       'detailPlace': detailPlace.text,
                       'postDate' : lostDate,
                       'contact': "0318679119",
                       'postCont': postCont[0].text,
                       'postImg': str("seoulRescueImg_" + str(rank))
                     }
    print(rank)
    rank = rank + 1

time.sleep(1)
# 2페이지 크롤링
for page in range(2,100):
    print("page :", page)
    # 11, 21 등 다음 페이지로 넘어가야할 경우
    if page % 10 == 1:
        if page == 11:
            try:
                nextpage = driver.find_element_by_css_selector('#pagingNav > a.img')
                nextpage.click()
            except NoSuchElementException:
                uplodeData()
        else:
            try:
                nextpage = driver.find_element_by_xpath('/html/body/div[4]/div/div[7]/a[11]')
                nextpage.click()
            except NoSuchElementException:
                uplodeData()

    else:
        if page <= 10 :
            try:
                nextpage = driver.find_element_by_css_selector('#pagingNav > a:nth-child('+ str(page)+')')
            except NoSuchElementException:
                uplodeData()
        elif page%10 == 0:
            try:
                nextpage = driver.find_element_by_css_selector('#pagingNav > a:nth-child(11)')
            except NoSuchElementException:
                uplodeData()
        else:
            P = page
            temp = round(P%10+1)
            try:
                nextpage = driver.find_element_by_css_selector('#pagingNav > a:nth-child('+ str(temp) +')')
            except NoSuchElementException:
                uplodeData()
        nextpage.click()

    for i in range(1, 7):
        # 종, 성별, 나이, 몸무게, 특징, 털 색, 본문, 구조일(구조된 동물만 게시됨), 목격위치, 게시글종류코드, 지역 코드
        try:
            type = driver.find_element_by_css_selector("body > div.wrap_sub > div > div:nth-child(" + str(i) + ") > form > ul > li:nth-child(4)")
        except NoSuchElementException:
            uplodeData()

        sex = driver.find_elements_by_css_selector(
            "body > div.wrap_sub > div > div:nth-child(" + str(i) + ") > form > ul > li:nth-child(5)")
        age = driver.find_elements_by_css_selector(
            "body > div.wrap_sub > div > div:nth-child(" + str(i) + ") > form > ul > li:nth-child(6)")
        weight = driver.find_elements_by_css_selector(
            "body > div.wrap_sub > div > div:nth-child(" + str(i) + ") > form > ul > li:nth-child(10)")

        # 중성화수술, 성격, 건강상태를 특징으로 묶기로 함
        character_1 = driver.find_elements_by_css_selector(
            "body > div.wrap_sub > div > div:nth-child(" + str(i) + ") > form > ul > li:nth-child(8)")
        character_2 = driver.find_elements_by_css_selector(
            "body > div.wrap_sub > div > div:nth-child(" + str(i) + ") > form > ul > li:nth-child(9)")
        character_3 = driver.find_elements_by_css_selector(
            "body > div.wrap_sub > div > div:nth-child(" + str(i) + ") > form > ul > li:nth-child(11)")

        character = character_1[0].text + ", " + character_2[0].text + ", " + character_3[0].text
        color = driver.find_elements_by_css_selector(
            "body > div.wrap_sub > div > div:nth-child(" + str(i) + ") > form > ul > li:nth-child(7)")
        postCont = driver.find_elements_by_css_selector(
            "body > div.wrap_sub > div > div:nth-child(" + str(i) + ") > form > ul > li:nth-child(13)")
        detailPlace = driver.find_element_by_css_selector(
            "body > div.wrap_sub > div > div:nth-child(" + str(i) + ") > form > ul > li:nth-child(3)")

        # 구조된 동물 게시물이므로
        postCode = "resc"
        sidoCode, sigungu = areaCode.complex(detailPlace.text)

        # 날짜 입력이 2021-01-01 (SN:~~ 과같은 형태라 슬라이싱을 요함. 다듬기 전의 형태인 rescDateTmp
        lostDateTmp = driver.find_elements_by_css_selector(
            "body > div.wrap_sub > div > div:nth-child(" + str(i) + ") > form > ul > li:nth-child(1) > i")[0].text
        lostDate = lostDateTmp[0:4] + lostDateTmp[5:7] + lostDateTmp[8:10]

        # 이미지 저장을 위한 코드
        img = driver.find_elements_by_css_selector(
            'body > div.wrap_sub > div > div:nth-child(' + str(i) + ') > form > a > a > img')
        r = requests.get(img[0].get_attribute('src'))
        file = open('seoulRescueImg_' + str(rank) + '.jpg', 'wb')
        file.write(r.content)
        file.close()

        if sex[0].text.split()[1] == '미상':
            Sex = '미확인'
        else:
            Sex = sex[0].text.split()[1]

        print(rank)
        file_data[rank] = {'title': "보호중에 있습니다.",
                           'postCode': postCode,
                           'breed': type.text.split()[3],
                            'sex' : Sex,
                           'classification': type.text.split()[1],
                           'age': age[0].text.split()[1],
                           'weight': weight[0].text.split()[1],
                           'character': character + ", 모색:" + color[0].text.split()[1],
                           'lostDate': lostDate,
                           'sidoCode': sidoCode,
                           'sigunguCode': sigungu,
                           'detailPlace': detailPlace.text,
                           'postDate': lostDate,
                           'contact': "0318679119",
                           'postCont': postCont[0].text,
                           'postImg': str("seoulRescueImg_" + str(rank))
                           }

        rank = rank + 1