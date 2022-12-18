import {URLParams} from "../types/URLParams";

export function getURLParams(url:string): URLParams {
    let hashPage = url.slice(1)

    let idProduct = hashPage.includes("product/")
        ? hashPage.substring(hashPage.indexOf("/") + 1, hashPage.length)
        : ""

    let queryParams = hashPage.includes("?")
        ? hashPage.substring(hashPage.indexOf("?") + 1, hashPage.length)
        : ""

    return {hashPage, idProduct, queryParams}
}