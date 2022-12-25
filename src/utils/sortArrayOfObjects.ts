export function sortArrayOfObjects<T>(obj: T[], key: keyof T, type: string): T[] {
    if (type === "ASC") {
        return obj.sort((a, b) => +a[key] - +b[key])
    }
    return obj.sort((a, b) => +b[key] - +a[key])
}