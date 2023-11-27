# Essentially AI


## Overview of Task 
Built a webpage to display the trade statistics (Open, High, Low, Close, Volume) of a particular stock for a particular day and used Polygon free tier API for this task (https://polygon.io/)

## Defining Individual tasks implementation
1. The given codebase has two parts, client and server.
    - please ensure npm install command for all the dependency
2.Server(app.js functionality)
    2.1 => in app.js that a POST route is exposed at /api/fetchStockData. Implemented this API to fetch the trade statistics of a particular stock for a particular date(used react date picker libarary for date selection) using the Polygon API using Axios library(i.e for sending request using axios to Polygon API ) by taking input from the user and provided default Polygon API key 
    2.2 => Returned only the required fields in the response in a json format.
    Handled various edge cases along with relevant response codes like:
      - if user didn't proivide both date and stockName
      - handled for if stock is not available for particular date or not found
3.Client (App.js)
    3.1 => Created a form for the user to input the symbol of the stock and select a date and added a submit button as stockForm component.
    3.2 => sending request to respective route using axios library like axios.post('/fetchStockData',....);
    and also handling error and if getting successful response from server on respective route
    then populating StockData state using setStockData
    3.3 => On submitting the form, sending a request to the api route which is exposed like (axios.post('/fetchStockData',....)) and once the data is returned back, displaying the required details in the frontend (stockName , Open, High, Low, Close, Volume).

