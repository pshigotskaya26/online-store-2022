export function splitArrayAndChangeSpaces(str: string): string[] {
    return str.split(",").map(el => el.replace(/%20/g, " "))
}