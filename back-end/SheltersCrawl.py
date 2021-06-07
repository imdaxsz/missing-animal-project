import json

from selenium.common.exceptions import NoSuchElementException

import areaCode
from selenium import webdriver

def uplodeData(file_data, driver) :
    with open('Shelters.json', 'w', encoding='utf-8') as file:
        json.dump(file_data, file, ensure_ascii=False, indent="\t")
    file.close()
    driver.quit()
    #file_list = list(zip(file_data.keys(), file_data.values()))
    #return file_list

def main():
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
        sidoCode, sigunguCode = areaCode.complex(address)
        file_data[rank] = {'Juris': Juris, 'name': name, 'num': num, 'address': address,
                           'sidoCode': sidoCode, 'sigunguCode': sigunguCode}
        rank = rank + 1


    for page in range(2, 11):   # 2페이지부터 10페이지까지
        nextBtn = driver.find_element_by_xpath('/html/body/div/div[5]/div[2]/div[2]/form/ul/li['+str(page)+']/a')
        nextBtn.click()
        tBody = driver.find_element_by_xpath("/html/body/div/div[5]/div[2]/div[2]/form/div[2]/table/tbody")
        rows = tBody.find_elements_by_tag_name("tr")
        for index, value in enumerate(rows):
            Juris = value.find_elements_by_xpath("td")[0].text
            name = value.find_elements_by_xpath("td")[1].text
            num = value.find_elements_by_xpath("td")[2].text
            address = value.find_elements_by_xpath("td")[3].text
            sidoCode, sigunguCode = areaCode.complex(address)
            file_data[rank] = {'Juris': Juris, 'name': name, 'num': num, 'address': address,
                               'sidoCode': sidoCode, 'sigunguCode': sigunguCode}
            rank = rank + 1


    nextpage = driver.find_element_by_xpath('/html/body/div/div[5]/div[2]/div[2]/form/ul/li[11]/a')
    nextpage.click()

    for page in range(3, 13):   # 11페이지부터 20페이지까지
        nextBtn = driver.find_element_by_xpath('/html/body/div/div[5]/div[2]/div[2]/form/ul/li['+str(page)+']/a')
        nextBtn.click()
        tBody = driver.find_element_by_xpath("/html/body/div/div[5]/div[2]/div[2]/form/div[2]/table/tbody")
        rows = tBody.find_elements_by_tag_name("tr")
        for index, value in enumerate(rows):
            Juris = value.find_elements_by_xpath("td")[0].text
            name = value.find_elements_by_xpath("td")[1].text
            num = value.find_elements_by_xpath("td")[2].text
            address = value.find_elements_by_xpath("td")[3].text
            sidoCode, sigunguCode = areaCode.complex(address)
            file_data[rank] = {'Juris': Juris, 'name': name, 'num': num, 'address': address,
                               'sidoCode': sidoCode, 'sigunguCode': sigunguCode}
            rank = rank + 1


    nextpage = driver.find_element_by_xpath('/html/body/div/div[5]/div[2]/div[2]/form/ul/li[13]/a')
    nextpage.click()

    for page in range(3, 13):    # 21페이지 부터 30페이지까지 (25페이지까지 있으나, 업데이트 고려)
        try:
            nextBtn = driver.find_element_by_xpath('/html/body/div/div[5]/div[2]/div[2]/form/ul/li[' + str(page) + ']/a')
            nextBtn.click()
        except NoSuchElementException:
            uplodeData(file_data, driver)
            return file_data
        tBody = driver.find_element_by_xpath("/html/body/div/div[5]/div[2]/div[2]/form/div[2]/table/tbody")
        rows = tBody.find_elements_by_tag_name("tr")
        for index, value in enumerate(rows):
            Juris = value.find_elements_by_xpath("td")[0].text
            name = value.find_elements_by_xpath("td")[1].text
            num = value.find_elements_by_xpath("td")[2].text
            address = value.find_elements_by_xpath("td")[3].text
            sidoCode, sigunguCode = areaCode.complex(address)
            file_data[rank] = {'Juris': Juris, 'name': name, 'num': num, 'address': address,
                               'sidoCode': sidoCode, 'sigunguCode': sigunguCode}
            rank = rank + 1

if __name__ == "__main__":
    main()
    #print(fileList)
    