export function replaceHash(currentHref: string, hash: string): string {
    let URL = currentHref.slice(0, currentHref.indexOf("#"))
    debugger
    if (!!URL.includes("#")) {
        return URL.replace("#", hash)
    } else {
        return hash
    }
}