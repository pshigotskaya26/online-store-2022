export class CheckBoxField {
    constructor(
        readonly title: string,
        readonly nameInput: string,
        readonly id: string,
        readonly values: any[]
    ) {
        this.title = title;
        this.nameInput = nameInput;
        this.id = id;
        this.values = values
    }

    render() {
        let wrapper = document.createElement("div")
        wrapper.classList.add("filter-item-wrapper")
        let titleEl = document.createElement("h3")
        titleEl.classList.add("search__title")
        titleEl.innerText = this.title

        let template = document.createElement("div")
        template.classList.add("category-filter-list")
        template.classList.add("filter-list");

        this.values.forEach(el => {
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

            template.append(filterItem)

            template.append(filterItem)
        })
        wrapper.append(titleEl)
        wrapper.append(template)

        return wrapper
    }
}

export default CheckBoxField;