import json

import requests
from selenium import webdriver

file = open("./SeoulRescue.json", "w", encoding="UTF-8")


chromedriver = 'C:\Webdriver\chromedriver.exe'
driver = webdriver.Chrome(chromedriver)

driver.get('http://www.karma.or.kr/human_boardA/animal_board.php?act=list&bid=animal&fid=55130&thread=AAAA&page=1&sn=0000055262')

for i in range(1, 7):
    """table = driver.find_elements_by_xpath("/html/body/div[4]/div/div[" + str(i) + "]")
    print(table[0].text)"""
    # 성별, 나이, 몸무게, 특징, 털 색, 본문, 목격일, 목격위치, 게시글종류코드, 지역 코드
    sex = driver.find_elements_by_css_selector("body > div.wrap_sub > div > div:nth-child(" + str(i) + ") > form > ul > li:nth-child(5)")
    place = driver.find_element_by_css_selector("body > div.wrap_sub > div > div:nth-child(" + str(i) + ") > form > ul > li:nth-child(3)")
    img = driver.find_elements_by_css_selector('body > div.wrap_sub > div > div:nth-child('+ str(i) + ') > form > a > a > img')
    r = requests.get(img[0].get_attribute('src'))
    file = open('seoulRescueImg_' + str(i) + '.jpg', 'wb')
    file.write(r.content)
    file.close()
    print(place.text, sex[0].text.split()[1])

# table = driver.find_elements_by_xpath("/html/body/div[4]/div/div[2]")



#print(table[0].text)

"""
for i in range(6):

date = driver.find_element_by_xpath("/html/body/div[4]/div/div[1]/form/ul/li[1]/i/span").text
date_y = date.split('-')[1]

print(date)"""
driver.quit()