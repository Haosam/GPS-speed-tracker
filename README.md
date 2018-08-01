# GPS-speed-tracker
This is a react native project that uses GPS to track your location and adds markers for the distance you have traveled. It also tells you your approximate speed and total distance traveled.

**Acknowledgement to son-bui developer from youtube for teaching how to code this react native application. For further details, you can visit [this youtube link](https://www.youtube.com/sonbuideveloper)**

### This readme will provide the basics on how to deploy the application on your phone. I will not go through the code as you can watch the youtube for that. I am working on Android, but I think for iOS you have to change something on the maps issue.
1. React Native Application Init
2. Installing of Maps
3. Install Haversine
4. Ready-to-go

## 1. React Native Application Init
I assume you have installed React Native on your working device, otherwise, please follow this [documentation](https://facebook.github.io/react-native/docs/getting-started.html)
I am working on Native code, so we will not require expo
- Go to your working folder directory, and react-native init [Project Name]; there might be some issues with the current version, otherwise use this react-native init [projectName] --version react-native@0.55.4 --verbose. [Click here](https://stackoverflow.com/questions/51186637/cant-create-project-using-react-native-init) for more info.

## 2. Maps installation
We will be using the react-native-maps that has been created by Airbnb as the Maps that react native had has been degraded. Follow this [link](https://itnext.io/install-react-native-maps-with-gradle-3-on-android-44f91a70a395) to install, link and change some files for the maps to work

## 3. Install Haversine
Installation of Haversine is required for this application as it will help us do the distance calculation.

## 4. Ready-to-go
If you are using Android, please **EDIT** the Google API section in the Manifest.xml file i have added to this repo

You should be able to run *react-native run-android* to run this application on your phone thereafter
