import { getKeyValue, TOKEN_DICTIONARY } from './storage.servise.js';
import axios from 'axios';

const getWeather = async () => {
    const token = await getKeyValue(TOKEN_DICTIONARY.token)
    const cities = await getKeyValue(TOKEN_DICTIONARY.city)

    if(!token) {
        throw new Error('No token')
    }

    const citiesPromisees = cities.map(city => {
        return axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                appid: token,
                units: 'metric',
                lang: 'ru'
            }
        })
    })
    const weathers = await Promise.all(citiesPromisees)

    return weathers.map(({ data }) => data)
};

export { getWeather }
