import {FilterParams} from "../types/FilterParams";

export function generateURL(obj: FilterParams): string {
    let str = Object.entries(obj).map((param) => {
        if (typeof param[1] === "string") {
            if (param[1] === "") {
                return ""
            }
        }

        if (Array.isArray(param)) {
            if (param[1].length === 0) {
                return ""
            }
        }
        return `${param[0]}=${Array.isArray(param[1]) ? param[1].join(",") : param[1]}`
    }).filter(n => n).join("&")

    if (str.length) {
        return "?" + str
    }
    return str
}