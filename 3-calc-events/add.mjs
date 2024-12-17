export const sign = '+'
export default function (emitter) {
    emitter.on('add', (a, b) => {
        emitter.emit('result', a + b)
    })
}
