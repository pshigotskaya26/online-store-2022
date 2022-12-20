import Product from "./product";
import {ProductInterface} from "../../types/Product";

export class AppView {
    product: Product;
    constructor() {
        this.product = new Product();
    }

    drawProducts(data: ProductInterface[]) {
        const values = data ?? [];
        this.product.drawCard(values)
    }
    //
    drawProductPage(product: ProductInterface) {
        const value = product ?? {};
        this.product.drawProductPage(value)
    }


}

export default AppView;