import EventEmitter from 'events'

const firstNumber = Number(process.argv[2])
const secondNumber = Number(process.argv[3])
const operationParam = process.argv[4]

const emitter = new EventEmitter()

try {
    const subscriber = await import(`./${operationParam}.mjs`)
    subscriber.default(emitter)

    emitter.on('result', (result) => {
        console.log(`${firstNumber} ${subscriber.sign} ${secondNumber} = ${result}`)
    })
    emitter.emit(operationParam, firstNumber, secondNumber)
} catch {
    console.error('No such operation exists')
}
