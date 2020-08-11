# Rating App

## Description

Full-stack application for rating the quality of service rendered. The application gives the user a possibility to rate the service on an emoticon based system(3-5 emoticons on the scale).While the admin part gives control over the number of reactions as well as the message displayed after voting. A report system is integrated into the admin panel as well you can see graphicly represented reports on quality & volume of votes and act acoringly.

## Installation
`npm install`

## Start

All sensitive variables stored in config.js encrypted with transcrypt clone the repo then contact rmvc-mirza to get the transcrypt info

Build containers with:
`docker-compose build`

Start the server with:
`docker-compose up `

Development is running at http://localhost:80 by default.

In localhost you need to comment out https server start in app.js

Current working version running @ https://praksans.dyndns.org:80/

Routes:
## Reactions
`/api/reactions`

`/getreaction/:id` expects a number in the parameter returns an object (GET request)

`/insertreaction`  expects an object in the body of the request (POST request) {"id":number}

`/deletereaction/:id` expects a number in the parameter returns 200 (GET request)

`/bydate/:date` expects time-stamp formated (YYYYMMDD) returns object (GET request)

`/countreactions/:date`expects time-stamp formated (YYYYMMDD) returns object (GET request)

## Settings 
`/api/settings`

`/getsettings` expects nothing returns object (GET request)

`/setsettings` expects object returns 200{"id":1,"poruka":"string","trajanje":int,"brojEmotikona":int}(POST request)

## Users
`/api/users`

`/register` expects object returns 201 {"username":"string","password":"string","level":int,"company":"string"}

`/login` expects object returns token in format {"token":"string"} {"username":"string","password":"string"}

`/getallusers` expects nothing returns array



