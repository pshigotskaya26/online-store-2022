import "./index.scss"

const visa = require('../../../assets/icons/cards/visa.png');
const masterCard = require('../../../assets/icons/cards/mastercard.png');
const maestro = require('../../../assets/icons/cards/maestro.png');
const mir = require('../../../assets/icons/cards/mir.png');

export class VirtualCard {
    root: HTMLDivElement;
    logoCard: HTMLElement | null;

    constructor() {
        this.root = document.createElement("div")
        this.root.classList.add("credit-card")
        this.logoCard = null
    }

    _enableValidation() {
        let numberCurd = this.root.querySelector("#numberCard")
        numberCurd?.addEventListener("keyup", this.handleKeyUpNumberCard)
        numberCurd?.addEventListener("blur", this.handleBlurNumberCard)

        let date: HTMLInputElement | null = this.root.querySelector("#dateCard")
        date?.addEventListener("keypress", this.handleKeyUpDateCard)
        date?.addEventListener("blur", this.handleBlurDateCard)

        let cvv: HTMLInputElement | null = this.root.querySelector("#cvvCard")
        cvv?.addEventListener("keypress", this.handleKeyPressCvvCard)
        cvv?.addEventListener("blur", this.handleBlurCvvCard)
    }

    handleKeyUpNumberCard = (e: Event) => {
        let regexpCard = /^[0-9]{16}$/
        if (e.target instanceof HTMLInputElement) {
            let error = this.root.querySelector(".form__error-number-text")

            e.target.value = e.target.value.replace(/[^0-9\.]/g, '')
            this.updateLogo(+e.target.value[0])
            if (regexpCard.test(e.target.value)) {
                e.target.classList.remove("error")
                error?.classList.add("hidden")
            }
        }
    }
    handleBlurNumberCard = (e: Event) => {
        let error = this.root.querySelector(".form__error-number-text")
        if (e.target instanceof HTMLInputElement) {
            let regexpCard = /^[0-9]{16}$/

            if (!regexpCard.test(e.target.value)) {
                e.target.classList.add("error")
                error?.classList.remove("hidden")
            } else {
                e.target.classList.remove("error")
                error?.classList.add("hidden")
            }
        }
    }

    handleKeyUpDateCard = (e: KeyboardEvent) => {

        let error = this.root.querySelector(".form__error-date-text")
        if (e.target instanceof HTMLInputElement) {
            e.target.value = e.target.value.replace(/[^0-9/\.]/g, '')
            if (e.keyCode < 47 || e.keyCode > 57) {
                e.preventDefault();
            }

            let length = e.target.value.length;

            if (length !== 1) {
                if (e.keyCode == 47) {
                    e.preventDefault();
                }
            }

            if (length === 2) {
                e.target.value += '/';
            }

            if (length >= 2) {
                if (+e.target.value.slice(0, 2) >= 13) {
                    error?.classList.remove("hidden")
                } else {
                    error?.classList.add("hidden")
                }
            }


            if (length >= 4) {
                e.target.value = e.target.value.slice(0, 4)
            }
        }
    }
    handleBlurDateCard = (e: Event) => {
        let error = this.root.querySelector(".form__error-date-text")
        if (e.target instanceof HTMLInputElement) {
            console.log(e.target.value.length)
            if (e.target.value.length !== 5) {
                error?.classList.remove("hidden")
            }
        }
    }

    handleKeyPressCvvCard = (e: KeyboardEvent) => {
        if (e.target instanceof HTMLInputElement) {
            e.target.value = e.target.value.replace(/[^0-9\.]/g, '')
            if (e.target.value.length >= 3) {
                e.target.value = e.target.value.slice(0, 2)
            }
        }
    }
    handleBlurCvvCard = (e: Event) => {
        let error = this.root.querySelector(".form__error-cvv-text")
        if (e.target instanceof HTMLInputElement) {
            if (e.target.value.length < 3) {
                error?.classList.remove("hidden")
            } else {
                error?.classList.add("hidden")
            }
        }
    }

    updateLogo(number: number | undefined = undefined) {
        if (this.logoCard) {
            let imgSrc = ""
            switch (number) {
                case 2:
                    imgSrc = mir
                    break
                case 4:
                    imgSrc = visa
                    break
                case 5:
                    imgSrc = masterCard
                    break
                case 6:
                    imgSrc = maestro
                    break
                default:
                    imgSrc = ""

            }
            this.logoCard.innerHTML = imgSrc ? `<img src=${imgSrc} alt=${imgSrc}>` : ""
        }
    }

    render() {
        this.root.innerHTML = `            
        <div class="credit-card__content">
            <div class="credit-card__logo"></div>
            <div class="credit-card__data">
                <div class="credit-card__number">
                    <input id="numberCard" name="numberCard" value="" required pattern="[0-9]{16}" placeholder="1111 1111 1111 1111">
                    <p class="form__error-text form__error-number-text hidden">16 символов должно быть!</p>
                </div>
                <div class="credit-card__desc">
                    <div class="credit-card__date">
                        <input id="dateCard" name="date" value="" pattern="^(0[1-9]|1[0-2])\\/?([0-9]{4}|[0-9]{2})$" required placeholder="12/17">
                        <p class="form__error-text form__error-date-text hidden">Некорректный формат</p>
                    </div>
                    <div class="credit-card__cvv">
                        <input id="cvvCard" name="cvv" value="" pattern="[0-9]{3}" required placeholder="126">
                        <p class="form__error-text form__error-cvv-text hidden">Некорректный формат</p>
                    </div>
                </div>
            </div>
        </div>
        `
        this.logoCard = this.root.querySelector(".credit-card__logo")
        this.updateLogo()
        this._enableValidation()
        return this.root
    }

}

export default VirtualCard;