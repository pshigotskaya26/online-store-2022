import {ProductInterface} from "../../../types/Product";

class Product {
    drawCard(data: ProductInterface[]) {
        (document.querySelector('#products') as HTMLElement).innerHTML = ""
        const fragment = document.createElement("div");
        if (data.length) {
            data.forEach((item) => {
                let itemNode = document.createElement("div")
                itemNode.innerHTML = `<h2>${item.title}</h2>`
                fragment.append(itemNode);
            })
            document.querySelector('#products')?.append(fragment);
        } else {
            let itemNode = document.createElement("div")
            itemNode.textContent = "пока ничего нет"
            fragment.append(itemNode);
            document.querySelector('#products')?.append(fragment);
        }
    }

    drawPage(data: any[]) {
        // (document.querySelector('#products') as HTMLElement).innerHTML = ""
        // const fragment = document.createElement("div");
        // if (data.length) {
        //     data.forEach((item) => {
        //         let itemNode = document.createElement("div")
        //         itemNode.innerHTML = `<h2>${item.title}</h2>`
        //         fragment.append(itemNode);
        //     })
        //     document.querySelector('#products')?.append(fragment);
        // } else {
        //     let itemNode = document.createElement("div")
        //     itemNode.textContent = "пока ничего нет"
        //     fragment.append(itemNode);
        //     document.querySelector('#products')?.append(fragment);
        // }
    }

}

export default Product;