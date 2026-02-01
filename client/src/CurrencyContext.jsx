import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [rates, setRates] = useState({ USD: 1 });
    const [isLoading, setIsLoading] = useState(true);

    const currencies = [
        { code: 'USD', name: 'US Dollar', symbol: '$' },
        { code: 'EUR', name: 'Euro', symbol: '€' },
        { code: 'GBP', name: 'British Pound', symbol: '£' },
        { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
        { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
        { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
        { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
        { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
        { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
        { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
        { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
        { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' }
    ];

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
                const data = await response.json();
                setRates(data.rates);
            } catch (error) {
                console.error("Error fetching rates:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all?fields=name,currencies,flags,cca2');
                const data = await response.json();
                const formatted = data.map(c => ({
                    name: c.name.common,
                    code: c.cca2,
                    flag: c.flags.svg,
                    currency: Object.keys(c.currencies || {})[0] || 'USD'
                })).sort((a, b) => a.name.localeCompare(b.name));
                setCountries(formatted);

                // Try to auto-select based on currency if selectedCurrency is already set
                // or just leave it for the user
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchRates();
        fetchCountries();
    }, []);

    const currencySymbol = useMemo(() => {
        const curr = currencies.find(c => c.code === selectedCurrency);
        return curr ? curr.symbol : '$';
    }, [selectedCurrency]);

    const formatPrice = (amountUsd) => {
        if (!amountUsd && amountUsd !== 0) return '';
        const rate = rates[selectedCurrency] || 1;
        const converted = amountUsd * rate;

        // Format based on currency type
        if (selectedCurrency === 'INR') {
            return `${currencySymbol}${Math.round(converted).toLocaleString('en-IN')}`;
        }
        return `${currencySymbol}${Math.round(converted).toLocaleString()}`;
    };

    const convert = (amount, from, to) => {
        const fromRate = rates[from] || 1;
        const toRate = rates[to] || 1;
        return (amount / fromRate) * toRate;
    };

    const convertStringPrice = (priceString) => {
        if (!priceString || typeof priceString !== 'string') return priceString;

        // Handle "Free"
        if (priceString.toLowerCase().includes('free')) return priceString;

        // Try to extract numeric value (assuming USD by default if '$' is present or no symbol)
        const match = priceString.match(/(\d+\.?\d*)/);
        if (!match) return priceString;

        const amount = parseFloat(match[1]);

        // If it was already in the selected currency (unlikely for AI output which is usually USD), return as is
        // But here we assume AI output is USD-based
        return formatPrice(amount);
    };

    const handleSelectCountry = (country) => {
        setSelectedCountry(country);
        setSelectedCurrency(country.currency);
    };

    return (
        <CurrencyContext.Provider value={{
            selectedCurrency,
            setSelectedCurrency,
            currencySymbol,
            formatPrice,
            convert,
            convertStringPrice,
            rates,
            isLoading,
            currencies,
            countries,
            selectedCountry,
            handleSelectCountry
        }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => useContext(CurrencyContext);
