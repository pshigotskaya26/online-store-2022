import Product from "./product";

export class AppView {
    product: Product;
    constructor() {
        this.product = new Product();
    }

    drawProducts(data: any[]) {
        const values = data ?? [];
        this.product.drawCard(values)
    }
}

export default AppView;