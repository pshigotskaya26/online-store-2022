export function htmlToElement(htmlString: string) {
    let template = document.createElement("template");
    template.innerHTML = htmlString;
    return template.content.firstChild;
}