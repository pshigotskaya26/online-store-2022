import "./index.scss"
import VirtualCard from "../virtualCard";

export class Modal {
    root: HTMLDivElement;
    isVisibleModal: boolean
    vc: VirtualCard;

    constructor() {
        this.root = document.createElement("div")
        this.isVisibleModal = false
        this.root.classList.add("modal")
        // this.root.classList.add("hidden")
        this.root.id = "modal"
        this.vc = new VirtualCard()
    }

    showModal() {
        this.root.classList.remove("hidden")
    }

    hideModal() {
        this.root.classList.add("hidden")
    }

    handleModal() {
        this.isVisibleModal = !this.isVisibleModal
        this.isVisibleModal ? this.showModal() : this.hideModal()
    }

    _enableHandlerCloseModal() {
        let buttonClose = this.root.querySelector(".modal__button-close")
        buttonClose?.addEventListener("click", () => {
            this.handleModal()
        })

        let modalOverlay = this.root.querySelector(".modal__overlay")
        modalOverlay?.addEventListener("click", (event) => {
            if (event.target instanceof HTMLElement && event.target.classList.contains('modal__overlay')) {
                this.handleModal()
            }
        })
    }

    _enableHandlersForm = () => {
        this.vc._enableValidation()
    }

    render() {
        this.root.innerHTML = `
        <div class="modal__overlay">
            <div class="modal__content">
                <div class="modal__title">
                    <h2 class="cart__title">Форма заказа</h2>
                    <button class="modal__button-close">X</button>
                </div>
                <div class="modal__main">
                    <form action="#" class="form">
                        <div class="form__item">
                            <label class="form__item-label" for="name">Имя Фамилия</label>
                            <input type="text" class="form-control" id="name" placeholder="Enter email">
                            <p class="form__error-text">Валидация: содержит не менее двух слов, длина каждого не
                                менее 3 символов</p>
                        </div>
                        <div class="form__item">
                            <label class="form__item-label" for="phone">Номер телефона</label>
                            <input type="text" class="form-control" id="phone" placeholder="Enter phone">
                            <p class="form__error-text">Валидация: должно начинаться с '+', содержать только
                                цифры и быть не короче 9 цифр +5</p>
                        </div>
                        <div class="form__item">
                            <label class="form__item-label" for="address">Адрес доставки</label>
                            <input type="text" class="form-control" id="address" placeholder="Enter address">
                            <p class="form__error-text">Валидация: содержит не менее трех слов, длина каждого не
                                менее 5 символов +5</p>
                        </div>
                        <div class="form__item">
                            <label class="form__item-label" for="email">E-mail</label>
                            <input type="email" class="form-control" id="email" placeholder="Enter email">
                            <p class="form__error-text">проверяется, является ли введенный текст электронной
                                почтой</p>
                        </div>
                        <div class="form__item">
                            <label class="form__item-label" for="numbercard">numbercard</label>
                            <div>logo</div>
                            <input type="email" class="form-control" id="numbercard" placeholder="Enter email">
                            <p class="form__error-text"> реализована автоматическая смена логотипа платежной
                                   системы.
                                   Например, если номер карты начинает с 4, устанавливается логотип Visa, если 5 -
                                   MasterCard. Реализовать не менее 3 платежных систем. +5</p>
                        </div>
                        
                        ${this.vc.render()}

                        <input type="submit" disabled class="button" value="Submit">
                    </form>

                </div>
            </div>
        </div>
        `
        this._enableHandlerCloseModal()
        this._enableHandlersForm()
        return this.root
    }
}