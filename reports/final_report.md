# Final Version Report
### Samuel Revucky
### babovkejsn

`repos:` https://github.com/samuelrevucky/babovkejsn-client/ https://github.com/samuelrevucky/babovkejsn-server/

`tag:` final_version

`link:` https://babovkejsn-30864ec1411d.herokuapp.com/home

`implemented:` 
- home page, with basic info about the business
- products pages with info about the products, where guests can interactively choose different variants and price changes accordingly
- login page which communicates with backend and sets a cookie that stores the jwt received from the BE
- functional register page that properly validates user inputs
- forgot password page that doesn't work for now
- fully funcional ordering mechanism for users
- order history
- admin interface
- user profile

`not completed:`
- profile info change

`not working properly:`
- admin framework not working on deployed version
- only the first order after logging in seems to work on deployed version

`problems I had on the way:`
- understanding the principles of next.js framework
- communication between server and client, especially CORS, when I tried to set cookies from the server, which I had to leave alone in the end and set cookies on the client
- setting up hosting, that was the most annoying part
- setting up admin framework so that it works also when deployed
