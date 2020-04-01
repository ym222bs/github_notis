# GithubNotis 

This app was created to exercise and implement the below features and plan the appropriate architecture for the assignment. 

## Application requirements

:heavy_check_mark:  The application should be able to notify the user about certain events that 
occur in the various organizations, even if the user is not running the application.
This could, for instance, be solved using notifications sent to Slack, Facebook 
messenger, browser notifications, or SMS. Other alternatives could be discussed.

:heavy_check_mark:  The user should inside of the application be able to configure which organizations 
events will be sent as notifications in this way.

:heavy_check_mark:  The user should be able to close the application and return at a later date. 
If so, the application should be able to show information that is new since the last execution. 




A Github OAuth 2.0 application, using Passport.js and React + Bootstrap  :v:

Enjoy! <https://github-notis.herokuapp.com/>



## To start the app locally

#### Prerequisites:
  * MongoDB
  * NodeJS
  * Registered Github OAuth App :arrow_right:  [Getting started guide](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/).

  The registration provides you with the key and secret, that should later be used in your **.env** file.

1. Add your environment variables in a **.env** file in the **root** of the project. (Example in **env.txt**).
2. Run `npm install` in the **root**, do the same in the **client** directory.
3. Run `npm start` in both **root** and **client** directory. (If you use **nodemon** instead, then do `npm run dev` in root).



### Future addings/fixes
 **Functionality related stuff to add in the nearest future.**

1. Add _delete_ webhook functionality.

2. Somehow check if the organization is still active (existing),
    if not, remove from the database. This can be done by compairing the database with the 
    logged in user return (organization) object.

3. SOCKET EVERYWHERE! But mostly when updating settings and receiving new events.

4. Return an Alert if a webhook is duplicated, when created. 

5. Beautify the Slack notification message. Example here: https://api.slack.com/messaging/composing/layouts#attachments

6. Prettify: Make the alert slowly slide away (without jQuery)......Bye bye.

**Architectual fixes.**

1. Break up JSX in content.js file.


