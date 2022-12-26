import {FilterParams, FilterParamSetter, keysParamsFilter} from "../../../types/FilterParams";
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
    {title: "Наличие на складе", key: keysParamsFilter.stock, type: typesParamsFilter.rangeMultiply}
]

class Filter {
    products: ProductInterface[]
    filterParams: FilterParams;
    form: HTMLFormElement
    cb: (data: FilterParamSetter) => void

    constructor(filterParams: FilterParams, products: ProductInterface[], cb: (data: FilterParamSetter) => void) {
        this.filterParams = filterParams
        this.products = products
        this.form = document.createElement("form")
        this.cb = cb
    }
    public drawFilter() {
        let template = document.createElement("div")
        let valueInput = this.getValueInSearchField(keysParamsFilter.search)
        let brands = this.countElements(keysParamsFilter.brand)
        let categories = this.countElements(keysParamsFilter.category)
        let pricesRange = this.getMinMaxValue(keysParamsFilter.price)
        let stocksRange = this.getMinMaxValue(keysParamsFilter.stock)

        if (schemaParamsFilter) {
            schemaParamsFilter.forEach((params) => {
                let currentType = params.type
                if (currentType === typesParamsFilter.search) {
                    let searchField = this.drawSearchField(params.title, keysParamsFilter.search, valueInput)
                    this.form.append(searchField)
                }
                if (currentType === typesParamsFilter.checkbox) {
                    let field: HTMLElement | null = null
                    if (params.key === keysParamsFilter.brand) {
                        field = this.drawCheckboxField(params.title, keysParamsFilter.brand, brands)
                    }
                    if (params.key === keysParamsFilter.category) {
                        field = this.drawCheckboxField(params.title, keysParamsFilter.category, categories)
                    }
                    if (field) {
                        this.form.append(field)
                    }
                }
                if (currentType === typesParamsFilter.rangeMultiply) {
                    let field: HTMLElement | null = null
                    if (params.key === keysParamsFilter.price) {
                        field = this.drawRangeMultiplyField(params.title, keysParamsFilter.price, pricesRange)
                    }
                    if (params.key === keysParamsFilter.stock) {
                        field = this.drawRangeMultiplyField(params.title, keysParamsFilter.stock, stocksRange)
                    }
                    if (field) {
                        this.form.append(field)
                    }

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
        this.form.append(buttons)

        template.append(this.form)

        this._enableHandlerForm()
        return template
    }
    private drawSearchField(title: string, key: keysParamsFilter, value: string) {
        let wrapper = document.createElement("div")
        wrapper.classList.add("filter-item-wrapper")
        let titleEl = document.createElement("h3")
        titleEl.classList.add("search__title")
        titleEl.innerText = title
        wrapper.append(titleEl)
        let input = document.createElement("input")
        input.classList.add("search-input")
        input.type = keysParamsFilter.search
        input.name = key
        input.value = value
        wrapper.append(input)
        return wrapper
    }
    private drawCheckboxField(title: string, key: keysParamsFilter, arr: CountedElement[]) {
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
            inputItem.name = key

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
    private drawRangeMultiplyField(title: string, key: keysParamsFilter, [min, max]: [number, number]) {
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
        let defaultValueFrom = this.filterParams[key][0]
        headerFrom.textContent = defaultValueFrom ? String(defaultValueFrom) : String(min)
        let headerTo = document.createElement("div")
        headerTo.classList.add("release-date-data__to")
        let defaultValueTo = this.filterParams[key][1]
        headerTo.textContent = defaultValueTo ? String(defaultValueTo) : String(max)

        headers.append(headerFrom)
        headers.append(headerTo)

        let ranges = document.createElement("div")
        ranges.classList.add("release-date-ranges")
        let fromValue = min
        let toValue = max


        let inputFrom = document.createElement("input")
        inputFrom.type = "range"
        inputFrom.classList.add("range__from")
        inputFrom.classList.add("range")
        inputFrom.classList.add("price-range")
        inputFrom.min = String(min)
        inputFrom.max = String(max)
        inputFrom.setAttribute("data-name", "from")
        inputFrom.name = key
        inputFrom.value = this.filterParams[key][0] ? String(this.filterParams[key][0]) : String(min)
        inputFrom.addEventListener("input", (e) => {
            let target = e.target as HTMLInputElement // Вот та ситуация, где не могу обойтись без as
            fromValue = +target.value
            writeRangeValues(fromValue, toValue)
        })

        let inputTo = document.createElement("input")
        inputTo.type = "range"
        inputTo.classList.add("range__to")
        inputTo.classList.add("range")
        inputTo.classList.add("price-range")
        inputTo.min = String(min)
        inputTo.max = String(max)
        inputTo.setAttribute("data-name", "to")
        inputTo.name = key
        inputTo.value = this.filterParams[key][1] ? String(this.filterParams[key][1]) : String(max)
        inputTo.addEventListener("input", (e) => {
            let target = e.target as HTMLInputElement // Вот та ситуация, где не могу обойтись без as
            toValue = +target.value
            writeRangeValues(fromValue, toValue)
        })
        ranges.append(inputFrom)
        ranges.append(inputTo)

        template.append(headers)
        template.append(ranges)

        wrapper.append(titleEl)
        wrapper.append(template)


        function writeRangeValues(n1: number, n2: number) {
            if (n1 > n2) {
                headerFrom.textContent = String([n1, n2].sort((a, b) => a - b)[0])
                headerTo.textContent = String([n1, n2].sort((a, b) => a - b)[1])
            }
            headerFrom.textContent = String([n1, n2].sort((a, b) => a - b)[0])
            headerTo.textContent = String([n1, n2].sort((a, b) => a - b)[1])
        }

        return wrapper
    }
    private countElements(param: keyof FilterParams): CountedElement[] {
        let res: CountedElement[] = []
        let values = null
        if (param !== keysParamsFilter.search) {
            values = this.products.map(el => el[param]).sort()
        }

        if (values) {
            let tempValue = values[0];
            let count = 1;
            for (let i = 1; i <= values.length; i++) {
                if (values[i] === tempValue) {
                    count += 1;
                } else {
                    let obj = {
                        title: typeof tempValue === "string" ? tempValue : "",
                        count: count,
                        selected: this.isHighlightElement(String(tempValue), this.filterParams[param])
                    }
                    res.push(obj);
                    tempValue = values[i];
                    count = 1;
                }
            }
        }
        return res
    }

    private isHighlightElement(str: string, arr: string | string[] | [number, number] | []): boolean {
        if (Array.isArray(arr)) {
            return arr.some(el => el === str);
        }
        return false;
    }

    private getMinMaxValue(param: keyof FilterParams): [number, number] {
        let values = null
        if (param !== keysParamsFilter.search) {
            values = this.products.map(el => el[param]).sort()
        }
        let min = 0
        let max = 0
        if (values) {
            let arr = values.sort((a, b) => +a - +b)
            min = +arr[0];
            max = +arr[arr.length - 1];
        }

        return [min, max]

    }
    private getValueInSearchField(param: keyof FilterParams): string {
        let value = ""
        if (param === keysParamsFilter.search) {
            value = this.filterParams[param]
        }
        return value
    }

    private _enableHandlerForm() {
        this.form.addEventListener("change", (event) => {
            let target = event.target as HTMLInputElement
            if (target.tagName === 'INPUT') {
                if (target.type === "checkbox") {
                    let key = target.name as keysParamsFilter
                    let value = target.id
                    this.cb({key, value})
                } else {
                    let key = target.name as keysParamsFilter
                    let keyHelper = null
                    if (target.type === "range") {
                        keyHelper = target.getAttribute("data-name")
                    }
                    let value = target.value
                    this.cb({key, keyHelper, value})
                }
            }


        })

    }
}

export default Filter;