# GithubNotis 

This app was created to exercise and implement the below features and plan the appropriate architecture for the assignment of creating a Github Notification handler. 

## Application requirements

:heavy_check_mark:  The application should be able to notify the user about certain events that 
occur in the various organizations, even if the user is not running the application.
This could, for instance, be solved using notifications sent to Slack, Facebook 
messenger, browser notifications, or SMS. Other alternatives could be discussed.

:heavy_check_mark:  The user should inside of the application be able to configure which organizations 
events will be sent as notifications in this way.

:heavy_check_mark:  The user should be able to close the application and return at a later date. 
If so, the application should be able to show information that is new since the last execution. 




A Github OAuth 2.0 application using Passport.js and React + Bootstrap witch an Expressjs backend :v:


Enjoy!  <https://github-notis.herokuapp.com/>



## To start the app locally

#### Prerequisites:
  * MongoDB
  * NodeJS
  * Registered Github OAuth App :arrow_right:  [Getting started guide](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/).

  The Github OAuth App registration provides you with the key and secret, that should later be used in your **.env** file.

1. Add your environment variables in a **.env** file in the **root** of the project. (Example in **env.txt**).
2. Run `npm install` in the **root**, do the same in the **client** directory.
3. Run `npm start` in both **root** and **client** directory. (Or use **nodemon** instead).



### Future addings/fixes
 **Functionality related stuff to add in the nearest future:**

1. Add _delete_ webhook functionality.

2. Add SOCKET, mostly for when updating settings and get new events.

3. Return an Alert message if a webhook is duplicated when created. 

4. Beautify the Slack notification message. Example here: https://api.slack.com/messaging/composing/layouts#attachments

**Architectual fixes:**

1. Clean JSX in content.js file.



#### Useful information:

  React has input sanitization, helps to prevent injection attacks, [Doc](https://reactjs.org/docs/introducing-jsx.html#jsx-prevents-injection-attacks).

  How to create a Slack-incoming-webhook-key to receive webhooks to your personal Slack, [Doc](https://slack.com/intl/en-se/help/articles/115005265063-Incoming-Webhooks-for-Slack).

  OAuth tips on security, [Doc](https://auth0.com/docs/tokens/guides/store-tokens).



 
##### If build does not work with heroku and React, then run command:
From server:

```bash
git rm -r --cached client
```
and commit all changes.
