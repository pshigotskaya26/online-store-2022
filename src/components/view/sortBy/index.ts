import { SortKeys } from "../../../pages/products"

export class SortBy {
    render(defaultValue: string, sortFields: { title: string, key: string }[], cb: (data: SortKeys) => void): HTMLDivElement {
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
            option.selected = el.key === defaultValue
            selectParameter.append(option)
        })

        selectParameter.addEventListener("change", (e: Event) => {
            let target = e.target as HTMLSelectElement
            cb(target.value as SortKeys)
        })

        sortBarBlock.append(sortBarText)
        sortBarBlock.append(selectParameter)
        return sortBarBlock
    }
}