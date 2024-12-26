#!/usr/bin/env node
import { getWeather } from './servises/api.servise.js'
import { printHelp, printError, printSuccess, printWeather } from './servises/log.servise.js'
import { saveKeyValue, TOKEN_DICTIONARY } from './servises/storage.servise.js'
import { parseArgs } from 'node:util'


const saveToken = async (token) => {
    if (!token.length) {
        printError('Token is empty')
        return
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Token saved')
    } catch (e) {
        printError(e.message)
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('City is empty')
        return
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess('City saved')
    } catch (e) {
        printError(e.message)
    }
}

const getForcast = async () => {
    try {
        const weather = await getWeather()
        weather.forEach((w) => printWeather(w))
    } catch (e) {
        if (e?.response?.status == 404) {
            printError('City not found')
        } else if (e?.response?.status == 401) {
            printError('Invalid token')
        } else {
            printError(e.message)
        }
    }
}

const initCli = () => {
    try {
        const { values } = parseArgs({
            options: {
                city: { type: 'string', short: 'c', multiple: true, },
                token: { type: 'string', short: 't' },
                help: { type: 'boolean' }
            },
            strict: true,
        });

        if (values.help) {
            printHelp()
        }
        if (values.city) {
            return saveCity(values.city)
        }
        if (values.token) {
            return saveToken(values.token)
        }

        getForcast()   
    } catch (err) {
        console.error(err.message);
    }
}

initCli()