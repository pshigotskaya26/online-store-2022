import Controller from "../../controller/controller";

export enum ModesViewKeys {
    BIG = "big",
    SMALL = "small",
}

let modesViews = [
    {
        key: ModesViewKeys.BIG,
    },
    {
        key: ModesViewKeys.SMALL
    }
]


export class ModeViewProductsList {
    root: HTMLDivElement
    controller: Controller;
    currentModeView: ModesViewKeys;

    constructor(controller: Controller) {
        this.root = document.createElement("div")
        this.controller = controller
        this.currentModeView = this.controller.getCurrentView()
    }

    render(): HTMLDivElement {
        let modeView = document.createElement("div")
        modeView.classList.add("sort-view")

        modesViews.forEach(el => {
            let mode = document.createElement("div")
            mode.classList.add("icon-view")
            mode.classList.add("icon-view_" + el.key)
            mode.setAttribute("data-key", el.key)
            if (el.key === this.currentModeView) {
                mode.classList.add("active")
            }
            modeView.append(mode)
        })


        modeView.addEventListener("click", (event) => {
            if (event.target instanceof HTMLElement && event.currentTarget instanceof HTMLElement) {
                if (!event.target.classList.contains("active")) {
                    let id = event.target.getAttribute("data-key") as any
                    if (modeView.querySelectorAll(".icon-view")) {
                        modeView.querySelectorAll(".icon-view").forEach(el => {
                            el.classList.remove("active")
                        })
                    }
                    event.target.classList.add("active")
                    // cb(id)
                }
            }
        })
        return modeView
    }
}