import { splitArrayIntoParts } from './core/splitArrayIntoParts.mjs'
import { Worker } from 'worker_threads'

const bigArray = Array.from({ length: 300000 }, (_, idx) => idx + 1)

let counter = 0

performance.mark('start')
bigArray.forEach(item => {
    if (item % 3 === 0) counter++
})
performance.mark('end')
performance.measure('measure', 'start', 'end')

console.log(performance.getEntriesByName('measure'))

const compute = (array) => {
    return new Promise((res, rej) => {
        const worker = new Worker('./core/worker.mjs', {
            workerData: {
                array
            }
        })

        worker.on('message', (data) => {
            res(data)
        })

        worker.on('error', (data) => {
            rej(data)
        })
    })
}
performance.mark('worker start')
const partsOfBigArray = splitArrayIntoParts(bigArray, 12)

try {
    const res = await Promise.all(partsOfBigArray.map(compute))
    console.log('Rusult', res.reduce((acc, cur) => acc + cur, 0))
} catch (e) {
    console.log(e)
}

performance.mark('worker end')
performance.measure('worker measure', 'worker start', 'worker end')
console.log(performance.getEntriesByName('worker measure'))
