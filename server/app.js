// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const polygonApiKey = "SdlaJ7DFAht_SLyq35rxXPqq1Dg9ADRU";

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
     res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.post('/api/fetchStockData',async (req, res) => {
    // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION
    try {
        const { stockSymbol, date } = req.body; // Assuming the request body contains 'stockSymbol' and 'date' properties
    
        // Checking if the required fields are provided
        if (!stockSymbol || !date) {
          return res.status(400).json({ error: '!Please provide both stockSymbol and date in the request body' });
        }
    
   
        const formattedDate = new Date(date).toISOString().split('T')[0];

        
        // Make the request to the Polygon API
        const apiUrl = `https://api.polygon.io/v1/open-close/${stockSymbol}/${formattedDate}?apiKey=${polygonApiKey}`;
        const response = await axios.get(apiUrl);
    
        // Checking if the stock data is available for the specified date
        if (!response.data || response.data.status === 'NOT_FOUND') {
          return res.status(404).json({ error: 'Trade data not found for the specified stock and date.' });
        }
    
        // Extract the required trade statistics from the response
        const { symbol,open, close, high, low, volume} = response.data;
    
        // Preparing the data and sending  the res as per the parameters given in assignment
        const tradeStats = {
          symbol,
          open,
          close,
          high,
          low,
          volume,
        };
    
        res.status(200).json(tradeStats);
      } catch (error) {
        console.error('Error fetching stock data:', error.message);
        res.status(500).json({ error: 'Error fetching stock data' });
      }
    
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));