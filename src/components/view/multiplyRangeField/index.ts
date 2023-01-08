import { RangeCounterProducts} from "../../../types/Product";

export class MultiplyRangeField {
    prices: RangeCounterProducts;
    template: HTMLElement;
    root: HTMLElement;

    constructor(
        readonly title: string,
        readonly nameInput: string,
        readonly id: string,
    ) {
        this.root = document.createElement("div")
        this.title = title;
        this.nameInput = nameInput;
        this.template = document.createElement("div")
        this.id = id;
        this.prices = {min: 0, max: 0, minDefault: 0, maxDefault: 0}
    }

    render(prices: RangeCounterProducts) {
        this.prices = prices

        this.root.classList.add("filter-item-wrapper")
        let titleEl = document.createElement("h3")
        titleEl.classList.add("search__title")
        titleEl.innerText = this.title

        this.root.append(titleEl)
        this.createInputRange()


        return this.root
    }

    createInputRange() {
        this.template.innerHTML = ""
        let {min, max, minDefault = 0, maxDefault = 0} = this.prices

        let fromValue = min
        let toValue = max

        let headers = document.createElement("div")
        headers.classList.add("release-date-data")
        let headerFrom = document.createElement("div")
        headerFrom.classList.add("release-date-data__from")
        headerFrom.textContent = String(minDefault) ? String(minDefault) : String(min)
        let headerTo = document.createElement("div")
        headerTo.classList.add("release-date-data__to")
        headerTo.textContent = String(maxDefault) ? String(maxDefault) : String(max)

        headers.append(headerFrom)
        headers.append(headerTo)

        let ranges = document.createElement("div")
        ranges.classList.add("release-date-ranges")

        let inputFrom = document.createElement("input")
        inputFrom.type = "range"
        inputFrom.classList.add("range__from")
        inputFrom.classList.add("range")
        inputFrom.classList.add("price-range")
        inputFrom.min = String(min)
        inputFrom.max = String(max)
        inputFrom.setAttribute("data-name", "from")
        inputFrom.name = this.nameInput
        inputFrom.defaultValue = String(minDefault)
        inputFrom.addEventListener("input", (e) => {
            if (e.target instanceof HTMLInputElement) {
                fromValue = +e.target.value
                writeRangeValues(fromValue, toValue)
            }
        })


        let inputTo = document.createElement("input")
        inputTo.type = "range"
        inputTo.classList.add("range__to")
        inputTo.classList.add("range")
        inputTo.classList.add("price-range")
        inputTo.min = String(min)
        inputTo.max = String(max)
        inputTo.setAttribute("data-name", "to")
        inputTo.name = this.nameInput
        inputTo.defaultValue = String(maxDefault)
        inputTo.addEventListener("input", (e) => {
            if (e.target instanceof HTMLInputElement) {
                toValue = +e.target.value
                writeRangeValues(fromValue, toValue)
            }
        })
        ranges.append(inputFrom)
        ranges.append(inputTo)

        function writeRangeValues(n1: number, n2: number) {
            if (n1 > n2) {
                headerFrom.textContent = String([n1, n2].sort((a, b) => a - b)[0])
                headerTo.textContent = String([n1, n2].sort((a, b) => a - b)[1])
            }
            headerFrom.textContent = String([n1, n2].sort((a, b) => a - b)[0])
            headerTo.textContent = String([n1, n2].sort((a, b) => a - b)[1])
        }

        this.template.append(headers)
        this.template.append(ranges)
        this.root.append(this.template)
    }

    update(prices: RangeCounterProducts) {
        this.prices = prices
        this.createInputRange()
    }
}

export default MultiplyRangeField;


