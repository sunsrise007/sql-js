this is a mssql project with supported node.js
there are there file related eachother.
server file has an server.js
it has an ability to handle req from client and searh file
server uses some libraries like expres, tedious, corps
client helps manage your active database, it has ability to edit, delete, instert and reset data base
reseting database onlu deletes data from database not colomn metadata.
search files has own react code as cliend which provides you to find your inputed in database.
this experiment succseeds with predefined values and you need to define your own parameters.
1-install sql express from ms and caonfigure by server management studio (like server name, authenticator[sql server] user name, pw,[tick] trust server cert..)* make your port configuration for sql 1433 and it uses localhost default
2-define your parameters in server.js file. 
3 define your desired port number like i used 3001 for client and 3002 for search react project
4 open server directory and start server first by node server.js
5 open client directory and run npm start
6 open search directory and run npm start
7 enjoy the view with this urls below
http://localhost:3001/
http://localhost:3001/api/data
http://localhost:3000/
http://localhost:3002/
*firt initilazing migh be done with windows authentication because sa (super administrator) may not be enabled. further help searhc online or ask me :)
