import chalk from 'chalk'
import dedent from 'dedent-js'

const printError = (err) => {
    console.log(chalk.bgRed(' ERROR ' + ' ' + err))
}

const printSuccess = (success) => {
    console.log(chalk.bgGreen(' SUCCESS ' + ' ' + success))
}

const printHelp = () => {
    console.log(dedent`
        ${chalk.bgCyan(' HELP ')}
    `
    )
}

const printWeather = (weather) => {
    console.log(dedent`
       В городе ${weather.name} ${weather.weather[0].description}.
       Температура ${weather.main.temp}°C. Ветер ${weather.wind.speed} м/с.
    `
    )
}

export { printError, printSuccess, printHelp, printWeather }
