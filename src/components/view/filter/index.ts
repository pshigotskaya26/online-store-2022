import {FilterParams, keysParamsFilter} from "../../../types/FilterParams";
import {ProductInterface} from "../../../types/Product";

enum typesParamsFilter {
    search, checkbox, rangeMultiply
}

interface CountedElement {
    title: string,
    count: number,
    selected?: boolean
}

const schemaParamsFilter = [
    {title: "Поиск", key: keysParamsFilter.search, type: typesParamsFilter.search},
    {title: "Категория", key: keysParamsFilter.category, type: typesParamsFilter.checkbox},
    {title: "Производитель", key: keysParamsFilter.brand, type: typesParamsFilter.checkbox},
    {title: "Стоимость", key: keysParamsFilter.price, type: typesParamsFilter.rangeMultiply},
    {title: "Скидка", key: keysParamsFilter.discountPercentage, type: typesParamsFilter.rangeMultiply}
]

class Filter {
    products: ProductInterface[]
    filterParams: FilterParams;

    constructor(filterParams: FilterParams, products: ProductInterface[]) {
        this.filterParams = filterParams
        this.products = products
    }

    public drawFilter() {
        let template = document.createElement("div")
        let form = document.createElement("form")
        let brands = this.countElements(keysParamsFilter.brand)
        let categories = this.countElements(keysParamsFilter.category)

        if (schemaParamsFilter) {
            schemaParamsFilter.forEach((params) => {
                let currentType = params.type
                if (currentType === typesParamsFilter.search) {
                    let searchField = this.drawSearchField(params.title, "")
                    form.append(searchField)
                }
                if (currentType === typesParamsFilter.checkbox) {
                    let field: HTMLElement | null = null
                    if (params.key === keysParamsFilter.brand) {
                        field = this.drawCheckboxField(params.title, brands)
                    }
                    if (params.key === keysParamsFilter.category) {
                        field = this.drawCheckboxField(params.title, categories)
                    }
                    if (field) {
                        form.append(field)
                    }
                }

                if (currentType === typesParamsFilter.rangeMultiply) {
                    let field = this.drawRangeMultiplyField(params.title)
                    form.append(field)
                }
            })
        }

        let buttons = document.createElement("div")
        buttons.classList.add("filter-buttons")

        let buttonReset = document.createElement("button")
        buttonReset.classList.add("button")
        buttonReset.classList.add("button-reset")
        buttonReset.textContent = "Сбросить фильтры"

        let buttonCopy = document.createElement("button")
        buttonCopy.classList.add("button")
        buttonCopy.classList.add("button--copy-link")
        buttonCopy.textContent = "Копировать ссылку"

        buttons.append(buttonReset)
        buttons.append(buttonCopy)
        form.append(buttons)


        template.append(form)

        return template
    }

    private drawSearchField(title: string, value: string) {
        let wrapper = document.createElement("div")
        wrapper.classList.add("filter-item-wrapper")
        let titleEl = document.createElement("h3")
        titleEl.classList.add("search__title")
        titleEl.innerText = title
        wrapper.append(titleEl)
        let input = document.createElement("input")
        input.classList.add("search-input")
        input.type = "search"
        input.value = value
        wrapper.append(input)
        return wrapper
    }

    private countElements(param: keyof FilterParams): CountedElement[] {
        let res: CountedElement[] = []
        let values = null
        if (param !== keysParamsFilter.search) {
            values = this.products.map(el => el[param]).sort()
        }

        if (values) {
            let tempValue = values[0]
            let count = 1
            let isHighlightValue = this.filterParams[param].includes("Apple")
            console.log(isHighlightValue)
            for (let i = 1; i <= values.length; i++) {
                if (values[i] === tempValue) {
                    count += 1
                } else {
                    console.log()
                    let obj = {
                        title: typeof tempValue === "string" ? tempValue : "",
                        count: count,
                        selected: false
                    }

                    res.push(obj)
                    tempValue = values[i]
                    count = 1
                }
            }
        }
        return res
    }

    private isHighlightElement(): boolean {
        return true
    }

    private drawCheckboxField(title: string, arr: CountedElement[]) {
        let wrapper = document.createElement("div")
        wrapper.classList.add("filter-item-wrapper")
        let titleEl = document.createElement("h3")
        titleEl.classList.add("search__title")
        titleEl.innerText = title

        let template = document.createElement("div")
        template.classList.add("category-filter-list")
        template.classList.add("filter-list");

        arr.forEach(el => {
            let filterItem = document.createElement("div")
            filterItem.classList.add("filter-item")

            let inputItem = document.createElement("input")
            inputItem.type = "checkbox"
            inputItem.checked = !!el.selected
            inputItem.id = el.title

            let labelItem = document.createElement("label")
            labelItem.htmlFor = el.title
            labelItem.textContent = el.title

            let spanItem = document.createElement("span")
            spanItem.classList.add("count-stock")
            spanItem.textContent = `(${el.count}/${el.count})`

            filterItem.append(inputItem)
            filterItem.append(labelItem)
            filterItem.append(spanItem)

            template.append(filterItem)
        })
        wrapper.append(titleEl)
        wrapper.append(template)

        return wrapper
    }

    private drawRangeMultiplyField(title: string) {
        let wrapper = document.createElement("div")
        wrapper.classList.add("filter-item-wrapper")
        let titleEl = document.createElement("h3")
        titleEl.classList.add("search__title")
        titleEl.innerText = title


        let template = document.createElement("div")

        let headers = document.createElement("div")
        headers.classList.add("release-date-data")
        let headerFrom = document.createElement("div")
        headerFrom.classList.add("release-date-data__from")
        headerFrom.textContent = '2018'
        let headerTo = document.createElement("div")
        headerTo.classList.add("release-date-data__to")
        headerTo.textContent = "2022"

        headers.append(headerFrom)
        headers.append(headerTo)

        let ranges = document.createElement("div")
        ranges.classList.add("release-date-ranges")

        let inputFrom = document.createElement("input")
        inputFrom.type = "range"
        inputFrom.classList.add("range__from")
        inputFrom.classList.add("range")
        inputFrom.classList.add("price-range")
        inputFrom.min = "0"
        inputFrom.max = "100"
        inputFrom.value = "0"

        let inputTo = document.createElement("input")
        inputTo.type = "range"
        inputTo.classList.add("range__to")
        inputTo.classList.add("range")
        inputTo.classList.add("price-range")
        inputTo.min = "0"
        inputTo.max = "100"
        inputTo.value = "100"

        ranges.append(inputFrom)
        ranges.append(inputTo)

        template.append(headers)
        template.append(ranges)

        wrapper.append(titleEl)
        wrapper.append(template)

        return wrapper
    }
}

export default Filter;