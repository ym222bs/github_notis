# GithubNotis

This app was created to exercise and implement the below features and plan the appropriate architecture for the assignment. 

## Application requirements

:heavy_check_mark: The application should be able to notify the user about certain events that 
occur in the various organizations, even if the user is not running the application.
This could, for instance, be solved using notifications sent to Slack, Facebook 
messenger, browser notifications, or SMS. Other alternatives could be discussed.

:heavy_check_mark: The user should inside of the application be able to configure which organizations 
events will be sent as notifications in this way.

:heavy_check_mark: The user should be able to close the application and return at a later date. 
If so, the application should be able to show information that is new since the last execution. 




A Github OAuth 2.0 application, using Passport.js and React + Bootstrap  :v:

Enjoy! <https://github-notis.herokuapp.com/>


<hr>

## To start the app locally

#### Prerequisites:
  * MongoDB
  * NodeJS
  * Registered Github OAuth App :arrow_right:  [Getting started guide](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/).

  The registration provides you with the key and secret, that should later be used in your **.env** file.

1. Add your environment variables in a **.env** file in the **root** of the project. (Example in **env.txt**).
2. Run `npm install` in the **root**, do the same in the **client** directory.
3. Run `npm start` in both **root** and **client** directory. (If you use **nodemon** instead, then do `npm run dev` in root).



