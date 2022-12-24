export function getMinMaxValueInObject<T>(key: keyof T, array: T[]): [number, number] {
    let min = +array.map(el => el[key]).sort((a, b) => +a - +b)[0]
    let max = +array.map(el => el[key]).sort((a, b) => +a - +b).reverse()[0]
    return [min, max]
}