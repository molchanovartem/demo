import { parentPort, workerData } from 'worker_threads'

const { array } = workerData
let counter = 0

array.forEach(item => {
    if (item % 3 === 0) counter++
})

parentPort.postMessage(counter)