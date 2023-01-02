import Controller from "../../controller/controller";
import controller from "../../controller/controller";

export enum SortKeys {
    PRICEASC = "price-ASC",
    PRICEDESK = "price-DESC",
    RATINGASC = "rating-ASC",
    RATINGDESK = "rating-DESC",
}

let sortFields = [
    {
        key: SortKeys.PRICEASC,
        title: "По возрастанию цены"
    },
    {
        key: SortKeys.PRICEDESK,
        title: "По убыванию цены"
    },
    {
        key: SortKeys.RATINGASC,
        title: "По возрастанию рейтинга"
    },
    {
        key: SortKeys.RATINGDESK,
        title: "По убыванию рейтинга"
    }
]

export class SortBy {
    controller: Controller;
    currentModeSort: SortKeys
    constructor(controller: Controller) {
        this.controller = controller
        this.currentModeSort = this.controller.getCurrentSort()
    }

    render(): HTMLDivElement {
        let sortBarBlock = document.createElement("div")
        sortBarBlock.classList.add("sort-bar")

        let sortBarText = document.createElement("div")
        sortBarText.textContent = "Сортировать по:"

        let selectParameter = document.createElement("select")
        selectParameter.classList.add("select-parametr")

        sortFields.forEach(el => {
            let option = document.createElement("option")
            option.value = el.key
            option.textContent = el.title
            option.selected = el.key === this.currentModeSort
            selectParameter.append(option)
        })

        selectParameter.addEventListener("change", (e: Event) => {
            let target = e.target as HTMLSelectElement
            // cb(target.value as SortKeys)
        })

        sortBarBlock.append(sortBarText)
        sortBarBlock.append(selectParameter)
        return sortBarBlock
    }
}