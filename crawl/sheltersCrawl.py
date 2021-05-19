import json
from selenium import webdriver

file = open("./Shelters.json", "w", encoding="UTF-8")

chromedriver = 'C:\Webdriver\chromedriver.exe'
driver = webdriver.Chrome(chromedriver)

driver.get('https://www.animal.go.kr/front/awtis/institution/institutionList.do?menuNo=1000000059')

table = driver.find_elements_by_class_name('table')

tBody = driver.find_element_by_xpath("/html/body/div/div[5]/div[2]/div[2]/form/div[2]/table/tbody")
rows = tBody.find_elements_by_tag_name("tr")
page = 1

file_data = {}
rank = 1
for index, value in enumerate(rows):
    Juris = value.find_elements_by_xpath("td")[0].text
    name = value.find_elements_by_xpath("td")[1].text
    num = value.find_elements_by_xpath("td")[2].text
    address = value.find_elements_by_xpath("td")[3].text
    file_data[rank] = {'Juris': Juris, 'name': name, 'num': num, 'address': address}
    rank = rank + 1


for page in range(2, 12):   # 2페이지부터 10페이지까지
    nextBtn = driver.find_element_by_xpath('/html/body/div/div[5]/div[2]/div[2]/form/ul/li['+str(page)+']/a')
    nextBtn.click()
    tBody = driver.find_element_by_xpath("/html/body/div/div[5]/div[2]/div[2]/form/div[2]/table/tbody")
    rows = tBody.find_elements_by_tag_name("tr")
    for index, value in enumerate(rows):
        Juris = value.find_elements_by_xpath("td")[0].text
        name = value.find_elements_by_xpath("td")[1].text
        num = value.find_elements_by_xpath("td")[2].text
        address = value.find_elements_by_xpath("td")[3].text
        file_data[rank] = {'Juris': Juris, 'name': name, 'num': num, 'address': address}
        rank = rank + 1


nextpage = driver.find_element_by_xpath('/html/body/div/div[5]/div[2]/div[2]/form/ul/li[11]/a')
nextpage.click()

for page in range(3, 12):   # 11페이지부터 20페이지까지
    nextBtn = driver.find_element_by_xpath('/html/body/div/div[5]/div[2]/div[2]/form/ul/li['+str(page)+']/a')
    nextBtn.click()
    tBody = driver.find_element_by_xpath("/html/body/div/div[5]/div[2]/div[2]/form/div[2]/table/tbody")
    rows = tBody.find_elements_by_tag_name("tr")
    for index, value in enumerate(rows):
        Juris = value.find_elements_by_xpath("td")[0].text
        name = value.find_elements_by_xpath("td")[1].text
        num = value.find_elements_by_xpath("td")[2].text
        address = value.find_elements_by_xpath("td")[3].text
        file_data[rank] = {'Juris': Juris, 'name': name, 'num': num, 'address': address}
        rank = rank + 1


nextpage = driver.find_element_by_xpath('/html/body/div/div[5]/div[2]/div[2]/form/ul/li[13]/a')
nextpage.click()

for page in range(3, 8):    # 21페이지 부터 25페이지까지
    nextBtn = driver.find_element_by_xpath('/html/body/div/div[5]/div[2]/div[2]/form/ul/li['+str(page)+']/a')
    nextBtn.click()
    tBody = driver.find_element_by_xpath("/html/body/div/div[5]/div[2]/div[2]/form/div[2]/table/tbody")
    rows = tBody.find_elements_by_tag_name("tr")
    for index, value in enumerate(rows):
        Juris = value.find_elements_by_xpath("td")[0].text
        name = value.find_elements_by_xpath("td")[1].text
        num = value.find_elements_by_xpath("td")[2].text
        address = value.find_elements_by_xpath("td")[3].text
        file_data[rank] = {'Juris': Juris, 'name': name, 'num': num, 'address': address}
        rank = rank + 1


driver.quit()
with open('shelters.json', 'w', encoding='utf-8') as file:
    json.dump(file_data, file, ensure_ascii=False, indent="\t")

file.close()


"""
for mTable in mTable:       #1페이지 크롤링
    print(mTable[0].text)


for page in range(2, 11):   #2페이지부터 10페이지까지
    nextBtn = driver.find_element_by_xpath('/html/body/div/div[5]/div[2]/div[2]/form/ul/li['+str(page)+']/a')
    nextBtn.click()
    mTable = driver.find_elements_by_xpath('/html/body/div/div[5]/div[2]/div[2]/form/div[2]/table')
    print(page)
    for mTable in mTable:
        print(mTable.text)

    time.sleep(2)

nextpage = driver.find_element_by_xpath('/html/body/div/div[5]/div[2]/div[2]/form/ul/li[11]/a')
nextpage.click()

for page in range(3, 12):
    nextBtn = driver.find_element_by_xpath('/html/body/div/div[5]/div[2]/div[2]/form/ul/li['+str(page)+']/a')
    nextBtn.click()
    mTable = driver.find_elements_by_xpath('/html/body/div/div[5]/div[2]/div[2]/form/div[2]/table')
    print(page+8)
    for mTable in mTable:
        print(mTable.text)

    time.sleep(2)

nextpage = driver.find_element_by_xpath('/html/body/div/div[5]/div[2]/div[2]/form/ul/li[13]/a')
nextpage.click()

for page in range(3, 8):
    nextBtn = driver.find_element_by_xpath('/html/body/div/div[5]/div[2]/div[2]/form/ul/li['+str(page)+']/a')
    nextBtn.click()
    mTable = driver.find_elements_by_xpath('/html/body/div/div[5]/div[2]/div[2]/form/div[2]/table')
    print(page+18)
    for mTable in mTable:
        print(mTable.text)

    time.sleep(2)

driver.quit()
"""
