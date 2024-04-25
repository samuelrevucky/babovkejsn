# Beta Version Report
### Samuel Revucky
### babovkejsn

`repos:` https://github.com/samuelrevucky/babovkejsn-client/ https://github.com/samuelrevucky/babovkejsn-server/

`tag:` beta_version

`link:` https://babovkejsn-30864ec1411d.herokuapp.com/home

`implemented:` 
- home page, with basic info about the business
- products pages with info about the products, where guests can interactively choose different variants and price changes accordingly
- login page which communicates with backend and sets a cookie that stores the jwt received from the BE
- register page which for now doesn't communicate with the BE
- forgot password page that also doesn't work for now
- fully funcional ordering mechanism for users

`in progress:`
- order history for users, graphical formatting is needed

`not yet implemented:`
- admin interface
- user profile
- profile info change

`plans:`
- implement the rest of the user features
- start working on the admin interface
- hopefully by the end of next week I will have it done

`problems I had on the way:`
- understanding the principles of next.js framework
- communication between server and client, especially CORS, when I tried to set cookies from the server, which I had to leave alone in the end and set cookies on the client
- setting up hosting, that was the most annoying part so far
