import {CountedProduct} from "../../../types/Product";

export class CheckBoxField {
    root: HTMLElement;
    values: CountedProduct[]
    items: HTMLElement;

    constructor(
        readonly title: string,
        readonly nameInput: string,
        readonly id: string,
    ) {
        this.root = document.createElement("div")
        this.items = document.createElement("div")
        this.items.classList.add("category-filter-list")
        this.items.classList.add("filter-list");
        this.title = title;
        this.nameInput = nameInput;
        this.id = id;
        this.values = []
    }

    render(values: CountedProduct[]) {
        this.values = values

        this.root = document.createElement("div")
        this.root.classList.add("filter-item-wrapper")
        this.root.id = String(Date.now())
        let titleEl = document.createElement("h3")
        titleEl.classList.add("search__title")
        titleEl.innerText = this.title


        this.root.append(titleEl)
        this.root.append(this.items)
        this.createItems(values)
        return this.root
    }

    createItems(values: CountedProduct[]) {
        this.items.innerHTML = ""
        values.forEach(el => {
            let filterItem = document.createElement("div")
            filterItem.classList.add("filter-item")
            if (!el.filteredCount) {
                filterItem.classList.add("filter-item-disable")
            }

            let inputItem = document.createElement("input")
            inputItem.type = "checkbox";
            inputItem.name = this.nameInput;
            inputItem.value = el.title
            if (el.selected) inputItem.setAttribute('checked', 'checked');
            inputItem.id = el.title;

            let labelItem = document.createElement("label")
            labelItem.htmlFor = el.title
            labelItem.textContent = el.title

            let spanItem = document.createElement("span")
            spanItem.classList.add("count-stock")
            spanItem.textContent = `(${el.filteredCount}/${el.count})`
            filterItem.append(inputItem)
            filterItem.append(labelItem)
            filterItem.append(spanItem)
            this.items.append(filterItem)
        })

    }

    update(newValues: CountedProduct[]) {
        this.values = newValues
        this.createItems(this.values)
    }
}

export default CheckBoxField;