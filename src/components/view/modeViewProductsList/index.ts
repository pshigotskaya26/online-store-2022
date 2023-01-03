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
    handleView: () => void

    constructor(controller: Controller, handleView: () => void) {
        this.root = document.createElement("div")
        this.controller = controller
        this.currentModeView = this.controller.getCurrentView();
        this.handleView = handleView
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
                    let id = event.target.getAttribute("data-key") as ModesViewKeys;
                    if (modeView.querySelectorAll(".icon-view")) {
                        modeView.querySelectorAll(".icon-view").forEach(el => {
                            el.classList.remove("active")
                        })
                    }
                    event.target.classList.add("active")
                    this.handleModeView(id)
                }
            }
        })
        return modeView
    }

    private handleModeView(key: ModesViewKeys) {
        if (key === ModesViewKeys.SMALL || key === ModesViewKeys.BIG) {
            this.controller.setView(key)
            this.handleView()
        }
    }
}