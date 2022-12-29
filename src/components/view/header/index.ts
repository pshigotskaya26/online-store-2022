import HeaderTemplate from "./index.html"
import "../header/index.scss"
import { updateDataInHeader } from "../../../types/updateDataInHeader"

const header = document.createElement("header")
header.innerHTML = HeaderTemplate

updateDataInHeader(header);

export default header