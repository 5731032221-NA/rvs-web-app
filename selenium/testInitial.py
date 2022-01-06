from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
print("sample test case started")
driver = webdriver.Chrome(r"C:\Users\sopnk\PycharmProjects\SeleniumTest\Browers\chromedriver.exe")
#driver=webdriver.firefox()
#driver=webdriver.ie()
#maximize the window size
driver.maximize_window()
#navigate to the url
driver.get("http://localhost:3000/")
e = driver.find_element_by_name("paperlogin")

location = e.location
size = e.size
w, h = size['width'], size['height']

print(location)
print(size)
print(w, h)
#identify  text box and enter the value
# driver.find_element_by_id("username").send_keys("ADMIN")
# time.sleep(3)
# driver.find_element_by_id("password").send_keys("Abc12345")
# time.sleep(3)
# #click on the Google search button
# driver.find_element_by_name("login").send_keys(Keys.ENTER)
# time.sleep(3)
#close the browser
# driver.close()
# print("sample test case successfully completed")