# Get started

     npm install
     npm run start-events-api
     
 You now have a webserver running you can get todays 
 events on http://localhost:5010/events
 
 Now write an API that returns a scoreboard
 
 home team | visitor team | state | score
 --- | --- | --- | ---  
 Barcelona | Madrid | playing | 0 -1  
 Arsenal | Paris | finished | 4 - 3      


You don't have to worry about formatting, just return 
JSON of the form

    [
      { "home": "Barcelona", "visitor": "Madrid", "score": [0, 1], "state": "in progress" }
    ]
