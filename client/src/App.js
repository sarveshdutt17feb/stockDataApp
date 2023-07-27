import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const StockForm = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [stockData, setStockData] = useState(null);

  const handleStockSymbolChange = (e) => {
    setStockSymbol(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (stockSymbol && selectedDate) {
      try {
        const response = await axios.post('/fetchStockData', {
          stockSymbol:stockSymbol,
          date: selectedDate.toISOString(),
        });
        setStockData(response.data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setStockData(null);
      }
    } else {
      alert('Please provide both stock symbol and date.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="stockSymbol">Stock Symbol:</label>
        <input
          type="text"
          id="stockSymbol"
          value={stockSymbol}
          onChange={handleStockSymbolChange}
          required
        />
      </div>
      <div>
        <label htmlFor="date">Select a Date:</label>
        <DatePicker
          id="date"
          selected={selectedDate}
          onChange={handleDateChange }
          dateFormat="yyyy-MM-dd"
          required
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
      {stockData && (
        <div>
          <h2>Stock Data:</h2>
          <p>Stock Name: {stockData.symbol}</p>
          <p>Open: {stockData.open}</p>
          <p>High: {stockData.high}</p>
          <p>Low: {stockData.low}</p>
          <p>Close: {stockData.close}</p>
          <p>Volume: {stockData.volume}</p>
        </div>
      )}
    </form>
  );
};
//added StockForm to App componet for rendering or displaying required details
function App() {
	return (
		<StockForm/>
	);
}

export default App;