var SlackBot = require('slackbots');
const Reaction = require('./models/Reactions')
const Settings = require('./models/Settings')
const timestamp = require('time-stamp');
const { Op } = require("sequelize");
const request = require("request");
setInterval(()=>
{ 
//take settings from all companies
Settings.findAll({raw:true}) 
.then(users=>
  {
    //forEach users( array - result of Settings.findAll ) to take single company and slacktoken
    users.forEach(user=> 
      {
       //counts negative inserted reactions during the day in single company - return is integer
        Reaction.count({ 
          where: {
            emoticon: {
              [Op.gt]: 3
            },
            company:  user.company,
            date:  { [Op.gt]: timestamp('YYYYMMDD') }
          }
        })
          .then(reactions1 => {
          //counts positive inserted reactions during the day in single company - return is integer 
          Reaction.count({
            where: {
              emoticon: {
                [Op.lt]: 3
              },
              company: user.company,
              date:  { [Op.gt]: timestamp('YYYYMMDD') }
            }
          })
            .then(reactions2 => {
              if(reactions1>reactions2) 
               //if negative count is bigger then positive in single company 
              {
               //slack token validation
                var options = { method: 'GET',
                url: 'https://slack.com/api/auth.test',
                qs: { token: user.SlackToken },
               };
              request(options, function (error, response, body) {
                if (error) throw new Error(error);
                body  = JSON.parse(body);
                if(body.ok==true)
                //if token is valid  send report to slackbot
                {
                  var bot = new SlackBot({
                    token: user.SlackToken,     //slacktoken
                    name: user.SlackBot             //slackbot 
                });
                 //start bot
                bot.on('start', function() {
                    var params = {
                        icon_emoji: ':smiley:'
                    };
                    //post message (channel,message,icon_emoji)
                    bot.postMessageToChannel(
                      user.SlackChannel,
                      "Company " +user.company+" Bad Daily Rating - Negative:" +reactions1+ " Positive: " + reactions2,
                      params
                  )
                  console.log("Company "+user.company+ ': valid token '+user.SlackToken) 
                });
                }
                
                else
                console.log("Company "+user.company+ ': invalid token '+user.SlackToken)
                
              });
              console.log("Company "+user.company+ " Bad Daily Rating - Negative:" +reactions1+ " Positive: " + reactions2)
              }
              else
              console.log("Company "+user.company + " Good Daily Rating - Negative:" +reactions1+ " Positive: " + reactions2)
            })
            .catch(err => console.log(err))
          })
          .catch(err => console.log(err
            ))
          })
          })
          }, 60000); //interval

