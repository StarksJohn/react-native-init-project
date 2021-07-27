# AwesomeProject

    The basic framework of the react native project to help you quickly build a high-quality RN project

HomePage:  
    
    https://github.com/StarksJohn/AwesomeProject.git

Install:

    git clone --recurse-submodules https://github.com/StarksJohn/AwesomeProject.git
    yarn
    cd ios && pod install
    
Pull:

    First update the latest code of the submodule :
        git submodule update --remote  
    If you update to the latest commit of the submodule, You need to commit first
    at end :
        git pull --recurse-submodules

Push:
    
    git push origin main
    Username for 'https://github.com.cnpmjs.org': 397866153@qq.com
    Password for 'https://397866153@qq.com@github.com.cnpmjs.org': "your github Password"

Main technology stack:

    react-navigation: V5
        you can choose whether to use DrawerNavigator by changing useDrawer
    react-native-easy-app
    dva : implemented dva that can cache data
    react-intl: support internationalization
    sentry: support crash monitoring
    react-native-paper: support dark mode and Cacheable dark mode status
    react-native-config: a .env file can configure all of the project
    
RUN: 

    yarn ios
    yarn android

    



