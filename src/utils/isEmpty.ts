export function isEmpty<T>(obj: T): boolean {

    let isTrue = true
    for (let key in obj) {
        if (String(obj[key]).trim().length !== 0) {
            isTrue = false
        }
    }
    return isTrue
}