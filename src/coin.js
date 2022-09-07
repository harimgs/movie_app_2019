import { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [convert, setConvert] = useState(1);
  const [value, setValue] = useState(0);
  const [swap, setSwap] = useState(true);

  const onSwap = () => {
    setSwap((current) => !current);
  };

  const getValue = (event) => {
    setValue(event.target.value);
  };
  const onConvert = (event) => {
    setConvert(event.target.value);
  };
  const onReset = () => {
    setValue('');
    setConvert(1);
  };

  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers')
      .then((response) => response.json())
      .then((json) => {
        setCoins(json.slice(0, 20));
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? '' : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select value={value} onChange={getValue}>
          <option>Please select your coin</option>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.quotes.USD.price.toFixed(2)}>
              {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price.toFixed(2)}
              USD
            </option>
          ))}
        </select>
      )}
      <div>
        <label htmlFor="usd">USD</label>
        <input
          onChange={onConvert}
          id="usd"
          value={swap ? (value ? value * convert : '0') : convert}
          type="number"
          placeholder="USD"
          disabled={swap}
        />
        <hr />
        <label htmlFor="coins">Coins</label>
        <input
          onChange={onConvert}
          id="coins"
          value={swap ? convert : (value ? convert / value : '0')}
          type="number"
          placeholder="Coins"
          disabled={!swap}
        />
      </div>
      <button onClick={onReset}>Reset</button>
      <button onClick={onSwap}>Swap</button>
    </div>
  );
}

export default App;
