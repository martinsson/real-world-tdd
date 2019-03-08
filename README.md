# Get started

     npm install
     npm run compile
     npm run start-events-api
     
 You now have a webserver running you can get todays 
 events on http://localhost:5010/events
 
 Now write an API that returns a scoreboard
 
 home team | visitor team | state | score
 --- | --- | --- | ---  
 Barcelona | Madrid | in progress | 0 -1  
 Arsenal | Paris | finished | 4 - 3      


You don't have to worry about formatting, just return 
JSON of the form

    [
      { "home": "Barcelona", "visitor": "Madrid", "score": [0, 1], "state": "in progress" }
    ]


## TODOs
* make jest work also
* publish docker
* write clear instructions
* make sure there is some coordination between external ws so that they can't be
  that easily mocked out
