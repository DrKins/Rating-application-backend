# Rating App

## Description

Full-stack application for rating the quality of service rendered. The application gives the user a possibility to rate the service on an emoticon based system(3-5 emoticons on the scale).While the admin part gives control over the number of reactions as well as the message displayed after voting. A report system is integrated into the admin panel as well you can see graphicly represented reports on quality & volume of votes and act acoringly.

## Installation
`npm install`

## Start

First step is to create a file called `.env` in root directory. Follow instructions in `envexample` to create its content. DB credentials will be provided on demand.

Run server with:
`npm run start`

or using nodemon for development run:
`npm run dev`

Development is running at http://localhost:5000 by default.

Routes:
## Reactions
`/api/reactions`
`/getreaction/:id` expects a number in the parameter returns an object (GET request)
`/insertreaction`  expects an object in the body of the request (POST request) {"id":number}
`/deletereaction/:id` expects a number in the parameter returns 200 (GET request)
`/countreaction` expects nothing returns array (GET request)
`/countreactions/:date`expects time-stamp formated (YYYYMMDD) returns number (GET request)
## Settings 
`/api/settings`
`/getsettings` expects nothing returns object (GET request)
`/setsettings` expects object returns 200{"id":1,"poruka":"string","trajanje":int,"brojEmotikona":int}(POST request)
## User
`/api/user`
`/register` expects object returns 201 {"username":"string","password":"string"}
`/login` expects object returns boolean {"username":"string","password":"string"}


