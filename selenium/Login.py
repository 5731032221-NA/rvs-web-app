from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
import traceback




#This line opens a log file
with open("log.txt", "w") as log:

    try:
        driver = webdriver.Chrome(r"C:\Users\sopnk\PycharmProjects\SeleniumTest\Browers\chromedriver.exe")

        # input variable declaration
        path = "http://localhost:3000/"
        username = "ADMIN"
        password = "Abc12345"
        incorrectPassword = "Abc"
        devicecode = "computer22"
        devicename = "computer22"
        duplicateDevicecode = "Comp#Dell"
        duplicateDevicename = "Comp#Dell"
        property = "SPJ1"
        # ------------------Incorrect Username or Password----------------------
        print("1.General Flows")
        # ** check tablet size
        driver.maximize_window()
        driver.get(path)
        driver.find_element_by_id("usernamer").send_keys("")
        time.sleep(2)
        driver.find_element_by_id("password").send_keys("")
        time.sleep(2)
        driver.find_element_by_name("login").send_keys(Keys.ENTER)
        time.sleep(2)

        driver.find_element_by_id("username").send_keys(username)
        time.sleep(2)
        driver.find_element_by_id("password").send_keys(incorrectPassword)
        time.sleep(2)
        driver.find_element_by_name("login").send_keys(Keys.ENTER)
        time.sleep(2)

        # ----------------- Correct Username or Password -----------------------
        print("1.General Flows")
        driver.find_element_by_id("username").clear()
        time.sleep(2)
        driver.find_element_by_id("password").clear()
        time.sleep(2)
        driver.find_element_by_id("username").send_keys(username)
        time.sleep(2)
        driver.find_element_by_id("password").send_keys(password)
        time.sleep(2)
        driver.find_element_by_name("login").send_keys(Keys.ENTER)
        time.sleep(2)

        # --------------------------------------------------
        print("2.First Time Login")
        # ----------------- cancel -----------------------
        driver.find_element_by_id("devicecode").send_keys(devicecode)
        time.sleep(2)
        driver.find_element_by_id("devicename").send_keys(devicename)
        time.sleep(2)
        driver.find_element_by_name("cancel").send_keys(Keys.ENTER)
        time.sleep(2)
        # ------------------- Duplicate Save ---------------------
        driver.find_element_by_name("login").send_keys(Keys.ENTER)
        time.sleep(2)
        driver.find_element_by_id("devicecode").send_keys(duplicateDevicecode)
        time.sleep(2)
        driver.find_element_by_id("devicename").send_keys(duplicateDevicename)
        time.sleep(2)
        driver.find_element_by_name("save").send_keys(Keys.ENTER)
        time.sleep(3)
        driver.find_element_by_name("cancel").send_keys(Keys.ENTER)
        time.sleep(2)
        # ------------------- save ---------------------
        driver.find_element_by_name("login").send_keys(Keys.ENTER)
        time.sleep(2)
        driver.find_element_by_id("devicecode").send_keys(devicecode)
        time.sleep(2)
        driver.find_element_by_id("devicename").send_keys(devicename)
        time.sleep(2)
        driver.find_element_by_name("save").send_keys(Keys.ENTER)
        time.sleep(2)

        # ----------------------------------------
        print("1.General Flows")
        driver.find_element_by_id("username").send_keys(username)
        time.sleep(2)
        driver.find_element_by_id("password").send_keys(password)
        time.sleep(2)
        driver.find_element_by_name("login").send_keys(Keys.ENTER)
        time.sleep(2)

        # ----------------------------------------
        print("3.! First Time Login")
        driver.find_element_by_id("selectpropertyfield").send_keys(Keys.ENTER)
        time.sleep(2)
        driver.find_element_by_id(property).send_keys(Keys.ENTER)
        time.sleep(2)
        driver.find_element_by_name("selectpropertybutton").send_keys(Keys.ENTER)
        time.sleep(2)

        # close the browser
        driver.close()
        print("login test case successfully completed")
        print("Creating DB Connection", file = log)
    except Exception:
        traceback.print_exc(file=log)
        pass