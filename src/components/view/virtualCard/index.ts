import "./index.scss"

export class VirtualCard {
    root: HTMLDivElement;
    activeCard: string;

    constructor() {
        this.root = document.createElement("div")
        this.root.classList.add("credit-card")
        this.activeCard = this.renderDefaultLogo()
    }

    _enableValidation() {
        let numberCurd = this.root.querySelector("#numberCard")
        numberCurd?.addEventListener("keyup", this.handleKeyUpNumberCard)
        numberCurd?.addEventListener("blur", this.handleBlurNumberCard)

        let date = this.root.querySelector("#dateCard")
        date?.addEventListener("keyup", this.handleKeyUpDateCard)
        // date?.addEventListener("input", this.handleInputNumberCard)

    }

    handleKeyUpNumberCard(e: Event) {
        let regexpCard = /^[0-9]{16}$/
        this.updateLogoCard(4)
        if (e.target instanceof HTMLInputElement) {
            e.target.value = e.target.value.replace(/[^0-9\.]/g, '')

            if (regexpCard.test(e.target.value)) {
                e.target.classList.remove("error")
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

    handleKeyUpDateCard = (e: Event) => {
        console.log("b")
        if (e.target instanceof HTMLInputElement) {
            let error = this.root.querySelector(".form__error-date-text")
            e.target.value = e.target.value.replace(/[^0-9\.]/g, '')

            if (e.target.value.length >= 5) {
                e.target.value = e.target.value.substring(0, 5)
            }

            if (e.target.value.length === 2) {
                if (+e.target.value <= 12) {
                    e.target.value = e.target.value + "/"
                } else {
                    error?.classList.remove("hidden")
                }
            }

            if (e.target.value.length === 3) {
                console.log(e.target.value)
            }
            if (e.target.value.length === 4) {
                console.log(e.target.value)
            }

        }
    }

    updateLogoCard = (value?: number): void => {
        let creditCardLogo: HTMLDivElement | null = document.querySelector(".credit-card__logo")
        if (creditCardLogo) {
            if (value === 4) {
                creditCardLogo.innerHTML = this.renderVISA()
            } else if (value === 5) {
                creditCardLogo.innerHTML = this.renderMasterCard()
            } else {
                creditCardLogo.innerHTML = this.renderDefaultLogo()
            }
        }
    }

    render() {
        this.root.innerHTML = `            
        <div class="credit-card__content">
            <div class="credit-card__logo">${this.activeCard}</div>
            <div class="credit-card__data">
                <div class="credit-card__number">
                    <input id="numberCard" name="numberCard" value="" placeholder="1111 1111 1111 1111">
                    <p class="form__error-text form__error-number-text hidden">16 символов!</p>
                </div>
                <div class="credit-card__desc">
                    <div class="credit-card__date">
                        <input id="dateCard" name="date" value="" placeholder="12/17">
                        <p class="form__error-text form__error-date-text hidden">Некорректный формат</p>
                    </div>
                    <div class="credit-card__cvv">
                        <input name="cvv" value="" placeholder="126">
                        <p class="form__error-text hidden">Некорректный формат</p>
                    </div>
                </div>
            </div>
        </div>
        `
        this._enableValidation()
        return this.root
    }

    renderDefaultLogo = (): string => {
        return `<img src="#" alt="df"/>`
    }
    renderVISA = (): string => {
        return `
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->

<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   version="1.1"
   id="Layer_1"
   x="0px"
   y="0px"
   width="40"
   height="20"
   viewBox="0 0 1000.046 323.653"
   enable-background="new 0 0 258.381 161.154"
   xml:space="preserve"
   inkscape:version="0.91 r13725"
   sodipodi:docname="Visa_2006.svg"><metadata
   id="metadata23"><rdf:RDF><cc:Work
       rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type
         rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title></dc:title></cc:Work></rdf:RDF></metadata><defs
   id="defs21">
\t
\t
\t
\t
\t
\t
\t
</defs><sodipodi:namedview
   pagecolor="#ffffff"
   bordercolor="#666666"
   borderopacity="1"
   objecttolerance="10"
   gridtolerance="10"
   guidetolerance="10"
   inkscape:pageopacity="0"
   inkscape:pageshadow="2"
   inkscape:window-width="1366"
   inkscape:window-height="705"
   id="namedview19"
   showgrid="false"
   inkscape:zoom="0.35355339"
   inkscape:cx="34.690897"
   inkscape:cy="131.15483"
   inkscape:window-x="-8"
   inkscape:window-y="-8"
   inkscape:window-maximized="1"
   inkscape:current-layer="Layer_1" />
<g
   id="g4158"
   transform="matrix(4.4299631,0,0,4.4299631,-81.165783,-105.04783)"><polygon
     points="116.145,95.719 97.858,95.719 109.296,24.995 127.582,24.995 "
     id="polygon9"
     style="fill:#00579f" /><path
     d="m 182.437,26.724 c -3.607,-1.431 -9.328,-3.011 -16.402,-3.011 -18.059,0 -30.776,9.63 -30.854,23.398 -0.15,10.158 9.105,15.8 16.027,19.187 7.075,3.461 9.48,5.72 9.48,8.805 -0.072,4.738 -5.717,6.922 -10.982,6.922 -7.301,0 -11.213,-1.126 -17.158,-3.762 l -2.408,-1.13 -2.559,15.876 c 4.289,1.954 12.191,3.688 20.395,3.764 19.188,0 31.68,-9.481 31.828,-24.153 0.073,-8.051 -4.814,-14.22 -15.35,-19.261 -6.396,-3.236 -10.313,-5.418 -10.313,-8.729 0.075,-3.01 3.313,-6.093 10.533,-6.093 5.945,-0.151 10.313,1.278 13.622,2.708 l 1.654,0.751 2.487,-15.272 0,0 z"
     id="path11"
     inkscape:connector-curvature="0"
     style="fill:#00579f" /><path
     d="m 206.742,70.664 c 1.506,-4.063 7.301,-19.788 7.301,-19.788 -0.076,0.151 1.503,-4.138 2.406,-6.771 l 1.278,6.094 c 0,0 3.463,16.929 4.215,20.465 -2.858,0 -11.588,0 -15.2,0 l 0,0 z m 22.573,-45.669 -14.145,0 c -4.362,0 -7.676,1.278 -9.558,5.868 l -27.163,64.855 19.188,0 c 0,0 3.159,-8.729 3.838,-10.609 2.105,0 20.771,0 23.479,0 0.525,2.483 2.182,10.609 2.182,10.609 l 16.932,0 -14.753,-70.723 0,0 z"
     id="path13"
     inkscape:connector-curvature="0"
     style="fill:#00579f" /><path
     d="M 82.584,24.995 64.675,73.222 62.718,63.441 C 59.407,52.155 49.023,39.893 37.435,33.796 l 16.404,61.848 19.338,0 28.744,-70.649 -19.337,0 0,0 z"
     id="path15"
     inkscape:connector-curvature="0"
     style="fill:#00579f" /><path
     d="m 48.045,24.995 -29.422,0 -0.301,1.429 c 22.951,5.869 38.151,20.016 44.396,37.02 L 56.322,30.94 c -1.053,-4.517 -4.289,-5.796 -8.277,-5.945 l 0,0 z"
     id="path17"
     inkscape:connector-curvature="0"
     style="fill:#faa61a" /></g>
</svg>`
    }
    renderMasterCard = (): string => {
        return `
<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 23.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1"
\t id="svg3409" inkscape:version="0.91 r13725" sodipodi:docname="MasterCard 2016.svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"
\t xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="20px"
\t viewBox="0 0 999.2 776" enable-background="new 0 0 999.2 776" xml:space="preserve">
<path id="XMLID_1775_" inkscape:connector-curvature="0" d="M181.1,774.3v-51.5c0-19.7-12-32.6-32.6-32.6
\tc-10.3,0-21.5,3.4-29.2,14.6c-6-9.4-14.6-14.6-27.5-14.6c-8.6,0-17.2,2.6-24,12v-10.3h-18v82.4h18v-45.5c0-14.6,7.7-21.5,19.7-21.5
\ts18,7.7,18,21.5v45.5h18v-45.5c0-14.6,8.6-21.5,19.7-21.5c12,0,18,7.7,18,21.5v45.5H181.1z M448.1,691.9h-29.2V667h-18v24.9h-16.3
\tv16.3h16.3v37.8c0,18.9,7.7,30,28.3,30c7.7,0,16.3-2.6,22.3-6l-5.2-15.5c-5.2,3.4-11.2,4.3-15.5,4.3c-8.6,0-12-5.2-12-13.7v-36.9
\th29.2V691.9z M600.9,690.1c-10.3,0-17.2,5.2-21.5,12v-10.3h-18v82.4h18v-46.4c0-13.7,6-21.5,17.2-21.5c3.4,0,7.7,0.9,11.2,1.7
\tl5.2-17.2C609.4,690.1,604.3,690.1,600.9,690.1L600.9,690.1z M370,698.7c-8.6-6-20.6-8.6-33.5-8.6c-20.6,0-34.3,10.3-34.3,26.6
\tc0,13.7,10.3,21.5,28.3,24l8.6,0.9c9.4,1.7,14.6,4.3,14.6,8.6c0,6-6.9,10.3-18.9,10.3c-12,0-21.5-4.3-27.5-8.6l-8.6,13.7
\tc9.4,6.9,22.3,10.3,35.2,10.3c24,0,37.8-11.2,37.8-26.6c0-14.6-11.2-22.3-28.3-24.9l-8.6-0.9c-7.7-0.9-13.7-2.6-13.7-7.7
\tc0-6,6-9.4,15.5-9.4c10.3,0,20.6,4.3,25.8,6.9L370,698.7L370,698.7z M848.9,690.1c-10.3,0-17.2,5.2-21.5,12v-10.3h-18v82.4h18v-46.4
\tc0-13.7,6-21.5,17.2-21.5c3.4,0,7.7,0.9,11.2,1.7L861,691C857.5,690.1,852.4,690.1,848.9,690.1L848.9,690.1z M618.9,733.1
\tc0,24.9,17.2,42.9,43.8,42.9c12,0,20.6-2.6,29.2-9.4l-8.6-14.6c-6.9,5.2-13.7,7.7-21.5,7.7c-14.6,0-24.9-10.3-24.9-26.6
\tc0-15.5,10.3-25.8,24.9-26.6c7.7,0,14.6,2.6,21.5,7.7l8.6-14.6c-8.6-6.9-17.2-9.4-29.2-9.4C636.1,690.1,618.9,708.2,618.9,733.1
\tL618.9,733.1L618.9,733.1z M785.4,733.1v-41.2h-18v10.3c-6-7.7-14.6-12-25.8-12c-23.2,0-41.2,18-41.2,42.9c0,24.9,18,42.9,41.2,42.9
\tc12,0,20.6-4.3,25.8-12v10.3h18V733.1L785.4,733.1z M719.3,733.1c0-14.6,9.4-26.6,24.9-26.6c14.6,0,24.9,11.2,24.9,26.6
\tc0,14.6-10.3,26.6-24.9,26.6C728.8,758.8,719.3,747.6,719.3,733.1L719.3,733.1z M503.9,690.1c-24,0-41.2,17.2-41.2,42.9
\tc0,25.8,17.2,42.9,42.1,42.9c12,0,24-3.4,33.5-11.2l-8.6-12.9c-6.9,5.2-15.5,8.6-24,8.6c-11.2,0-22.3-5.2-24.9-19.7h60.9
\tc0-2.6,0-4.3,0-6.9C542.5,707.3,527,690.1,503.9,690.1L503.9,690.1L503.9,690.1z M503.9,705.6c11.2,0,18.9,6.9,20.6,19.7h-42.9
\tC483.3,714.2,491,705.6,503.9,705.6L503.9,705.6z M951.1,733.1v-73.8h-18v42.9c-6-7.7-14.6-12-25.8-12c-23.2,0-41.2,18-41.2,42.9
\tc0,24.9,18,42.9,41.2,42.9c12,0,20.6-4.3,25.8-12v10.3h18V733.1L951.1,733.1z M885,733.1c0-14.6,9.4-26.6,24.9-26.6
\tc14.6,0,24.9,11.2,24.9,26.6c0,14.6-10.3,26.6-24.9,26.6C894.4,758.8,885,747.6,885,733.1L885,733.1z M282.4,733.1v-41.2h-18v10.3
\tc-6-7.7-14.6-12-25.8-12c-23.2,0-41.2,18-41.2,42.9c0,24.9,18,42.9,41.2,42.9c12,0,20.6-4.3,25.8-12v10.3h18V733.1L282.4,733.1z
\t M215.5,733.1c0-14.6,9.4-26.6,24.9-26.6c14.6,0,24.9,11.2,24.9,26.6c0,14.6-10.3,26.6-24.9,26.6
\tC224.9,758.8,215.5,747.6,215.5,733.1z"/>
<g>
\t<rect id="rect19" x="364" y="66.1" fill="#FF5A00" width="270.4" height="485.8"/>
\t<path id="XMLID_330_" inkscape:connector-curvature="0" fill="#EB001B" d="M382,309c0-98.7,46.4-186.3,117.6-242.9
\t\tC447.2,24.9,381.1,0,309,0C138.2,0,0,138.2,0,309s138.2,309,309,309c72.1,0,138.2-24.9,190.6-66.1C428.3,496.1,382,407.7,382,309z"
\t\t/>
\t<path id="path22" inkscape:connector-curvature="0" fill="#F79E1B" d="M999.2,309c0,170.8-138.2,309-309,309
\t\tc-72.1,0-138.2-24.9-190.6-66.1c72.1-56.7,117.6-144.2,117.6-242.9S570.8,122.7,499.6,66.1C551.9,24.9,618,0,690.1,0
\t\tC861,0,999.2,139.1,999.2,309z"/>
</g>
</svg>`
    }

}

export default VirtualCard;