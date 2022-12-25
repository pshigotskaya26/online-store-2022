import {ModesViewKeys} from "../../../pages/products";

export class ModeViewProductsList {
    render(defaultMode: ModesViewKeys, modes: { key: ModesViewKeys }[], cb: (data: ModesViewKeys) => void): HTMLDivElement {
        let modeView = document.createElement("div")
        modeView.classList.add("sort-view")

        modes.forEach(el => {
            let mode = document.createElement("div")
            mode.classList.add("icon-view")
            mode.classList.add("icon-view_" + el.key)
            mode.setAttribute("data-key", el.key)
            if (el.key === defaultMode) {
                mode.classList.add("active")
            }
            mode.textContent = el.key
            modeView.append(mode)
        })


        modeView.addEventListener("click", (event) => {
            if (event.target instanceof HTMLElement && event.currentTarget instanceof HTMLElement) {
                if (!event.target.classList.contains("active")) {
                    let id = event.target.getAttribute("data-key") as ModesViewKeys
                    if (modeView.querySelectorAll(".icon-view")) {
                        modeView.querySelectorAll(".icon-view").forEach(el => {
                            el.classList.remove("active")
                        })
                    }
                    event.target.classList.add("active")
                    cb(id)
                }
            }
        })
        return modeView
    }
}