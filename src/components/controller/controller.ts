class Controller {
    getProducts() {
        return [{id: "1"}, {id: "2"}, {id: "3"}]
    }

    getProduct(id: string) {
        return {id: "1"}
    }
}

export default Controller