import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Quote: React.FC = () => {
    const [quote, setQuote] = useState('');
    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await axios.get('https://api.api-ninjas.com/v1/quotes', {
                    headers: { 'X-Api-Key': process.env.REACT_APP_API_KEY },
                });
                setQuote(response.data[0].quote);
            } catch (error) {
                console.error('Error fetching quote', error);
            }
        };

        fetchQuote();
        const interval = setInterval(fetchQuote, 5000);
        return () => clearInterval(interval);
    }, []);

    return <div className="mt-4 text-[4vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1vw] text-black absolute top-0 left-5 right-5 text-center">
        <p>Click on the Clock!!</p>
        <h1 className="text-center text-[9vw] sm:text-[4.5vw] md:text-[4vw] lg:text-[3.5vw] xl:text-[3vw] font-semibold">Random Quotes</h1>
        {quote.length > 0 ? <p>{quote}</p> : <p className="mt-4 text-lg">Loading...</p>}
    </div>;
};

export default Quote;
