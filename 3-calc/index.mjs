const firstNumber = Number(process.argv[2])
const secondNumber = Number(process.argv[3])
const operationParam = process.argv[4]

try {
    const operation = await import(`./${operationParam}.mjs`)
    const result = operation.default(firstNumber, secondNumber)
    console.log(`${firstNumber} ${operation.sign} ${secondNumber} = ${result}`)
} catch {
    console.error('No such operation exists')
}
