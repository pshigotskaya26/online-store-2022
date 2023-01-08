import HeaderTemplate from "./index.html"
import "../header/index.scss"
import {replaceHash} from "../../../utils/replaceHash";

const header = document.createElement("header")
header.innerHTML = HeaderTemplate;
let logo: HTMLElement | null = header.querySelector(".logo")

logo?.addEventListener("click", (e) => {
    window.location.href = replaceHash(window.location.href, "#products" + "/#")
})

let headerLink: HTMLAnchorElement | null = header.querySelector(".navigation-link-main")

headerLink?.addEventListener("click", () => {
    window.location.href = replaceHash(window.location.href, "#products" + "/#")
})


export default header