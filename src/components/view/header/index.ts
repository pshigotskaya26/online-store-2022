import HeaderTemplate from "./index.html"
import "../header/index.scss"
//import { updateDataInHeader } from "../../../types/updateDataInHeader"
import { cart } from "../../app/app"

const header = document.createElement("header")
header.innerHTML = HeaderTemplate;

export default header