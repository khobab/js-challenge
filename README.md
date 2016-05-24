# Pre-requisite
1. NodeJS (Install the latest NodeJS from nodejs.org) (Tested with Node 6.1.0)
2. Install MongoDB (Tested with MongoDB shell version: 3.0.1)
3. Git 
4. Gulp CLI

## Installation
1. Clone the project from git url: https://github.com/khobab/js-challenge.git

2. Open a terminal and using cd go into the cloned project folder. e.g lets suppose if directory name is js-challenge then terminal command would be like.
cd js-challenge

3. Run following command to install all Node Dependencies
npm install

4. Run following command to install gulp-cli globally if not installed .
npm install -g gulp-cli

you may need to run it with sudo like following
sudo npm install -g gulp-cli

4. Run following command to compile and bundle react source files
gulp bundle

If you want gulp to keep on watching src files for any changes then just run following command and leave the terminal alone.
gulp

5. Now open another terminal and using cd go into the cloned project folder (cd js-challenge) and create a new folder called db. Following command can be used to create folder named db.
mkdir db

6. Now run following command to start mongodb
mongod --dbpath ./db

7. Now open another terminal and go into cloned repo and run following command.
node webapp.js

8. This will start the application at port 3000.

9. Open browser and goto localhost:3000 or 127.0.0.1:3000 to browse the application

***Note***: MongoDB and Application (node webapp.js) should be run with same permissiona (i.e same users) otherwise application may not be able to connect to mongo.