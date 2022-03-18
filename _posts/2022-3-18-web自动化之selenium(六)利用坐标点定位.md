---
layout: post
title: "web自动化之selenium(六)利用坐标点定位"
date: "2022-03-18T02:48:19.382Z"
---
web自动化之selenium(六)利用坐标点定位
=========================

这是通过第三发库实现对元素的定位,因为在无法定位元素的时候,只能通过外部来定位,此时就可以使用pyautogui模块,操作鼠标,模拟人进行操作

    # 使用注意事项，不要过于的依赖它
      1.使用时需要在通过自动化工具打开的界面当中进行坐标点定位
      2.我们最好将自己电脑的分辨率改成100%
      3.每个人的电脑的屏幕尺寸不一样，脚本可能无法在其他人的电脑上运行
      4.使用时如果需要进一行下一步操作（使用selenium操作）可能需要先进行窗口的切换
      5.使用时最好将窗口最大化
    from selenium.webdriver.common.action_chains import ActionChains
    from selenium import webdriver
    import pyautogui
    import time
    
    
    driver=webdriver.Edge()#打开浏览器
    driver.get("https://www.ctrip.com/")
    driver.maximize_window() # 窗口最大化
    time.sleep(1)
    
    #获取屏幕分辨率
    tu=pyautogui.size()
    
    # pyautogui.moveTo(400,500) #移动鼠标至指定位置
    
    #通过获取的屏幕大小坐标,给出相应倍数,移动鼠标到指定位置
    pyautogui.moveTo(tu1[0]*0.2671,tu1[1]*0.474)
    
    pyautogui.click() #模拟鼠标点击
    time.sleep(2)
    
    pyautogui.moveTo(tu1[0]*0.369,tu1[1]*0.583)
    pyautogui.click()
    
    driver.quit()