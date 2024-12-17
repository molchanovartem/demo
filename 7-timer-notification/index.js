const notifier = require('node-notifier');

const firstParam = process.argv[2] || '0h'
const secondParam = process.argv[3] || '0m'
const thirdParam = process.argv[4] || '0s'

const params = [firstParam, secondParam, thirdParam]

let hours = parseInt(params.find(param => param.includes('h')) || 0)
let minutes = parseInt(params.find(param => param.includes('m')) || 0)
let seconds = parseInt(params.find(param => param.includes('s')) || 0)

const hourDuration = 3600000;
const minuteDuration = 60000;
const secondDuration = 1000;

const resultTime = hourDuration * hours + minuteDuration * minutes + secondDuration * seconds

console.log('result time', resultTime)
const nc = new notifier.NotificationCenter();

setTimeout(() => {
    nc.notify('Done!');

// Object
    nc.notify({
        title: 'Done!',
        message: 'Timer is over'
    });

}, resultTime)
