import { useEffect, useState } from "react";
import config from "../config.js";

const CurrencyConversion = ({ to, val }) => {
  const [convertedValue, setConvertedValue] = useState(0);

  const DECIMAL_PLACES = 2;

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/${config.CURRENCY_API_KEY}/latest/UAH`
        );
        const data = await res.json();
        const exchangeRate = data.conversion_rates[to];
        setConvertedValue((exchangeRate * val).toFixed(DECIMAL_PLACES));
      } catch (err) {
        console.log(err);
      }
    };

    fetchExchangeRate();
  }, [to, val]);

  return (
    <p>
      Converted amount: {convertedValue} {to}
    </p>
  );
};

export default CurrencyConversion;
