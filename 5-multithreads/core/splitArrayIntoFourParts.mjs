export function splitArrayIntoFourParts(array, parts = 12) {
    const partSize = Math.ceil(array.length / parts);
    const result = [];
    
    for (let i = 0; i < array.length; i += partSize) {
        result.push(array.slice(i, i + partSize));
    }
    
    return result;
}
