import { splitArrayIntoFourParts } from './core/splitArrayIntoFourParts.mjs'
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
    return new Promise((res) => {
        const worker = new Worker('./core/worker.mjs', {
            workerData: {
                array
            }
        })

        worker.on('message', (data) => {
            res(data)
        })
    })
}
performance.mark('worker start')
const partsOfBigArray = splitArrayIntoFourParts(bigArray, 12)

const res = await Promise.all(partsOfBigArray.map(compute))
console.log('Rusult', res.reduce((acc, cur) => acc + cur, 0))

performance.mark('worker end')
performance.measure('worker measure', 'worker start', 'worker end')
console.log(performance.getEntriesByName('worker measure'))
