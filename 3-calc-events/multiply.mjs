export const sign = '*'
export default function (emitter) {
    emitter.on('multiply', (a, b) => {
        emitter.emit('result', a * b)
    })
}
