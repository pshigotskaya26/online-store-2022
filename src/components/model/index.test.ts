import ProductsModel from "./index";

describe("modelproducts", () => {
    let productsModel = new ProductsModel()
    it("should get product", () => {
        expect(productsModel.getProduct(1).id).toBe(1);
        expect(productsModel.getProduct(1).brand.toLowerCase()).toBe("apple");
        expect(productsModel.getProduct(2).id).toBe(2);
        expect(productsModel.getProduct(158)).toBeUndefined()
    })

    it("should get min and max value", () => {
        let products = [12, 1, 10, 25, 2, 37, 19]
        expect(productsModel.getMinMaxValue(products)).toStrictEqual([1, 37])
    })

    // set brands
    it("should set brands to filter params", () => {
        productsModel.setBrands(["apple", "samsung"])
        expect(productsModel.paramsFilter.brands.length).toBe(2)
    })
    // set brands
    it("should handle brands in the filter params", () => {
        productsModel.handleBrands("apple") // remove
        productsModel.handleBrands("apple1") // set
        productsModel.handleBrands("apple1") //remove
        expect(productsModel.paramsFilter.brands.length).toBe(1)
    })

    it("should set search value in filter params", () => {
        productsModel.setSearchValue("text")
        expect(productsModel.paramsFilter.search).toBe("text")
    })

    it("should reset filter params", () => {
        productsModel.setSearchValue("tffext")
        expect(productsModel.getFilteredProducts().length).not.toBe(productsModel.products.length)
        productsModel.resetParamsFilter()
        expect(productsModel.getFilteredProducts().length).toBe(productsModel.products.length)
    })

    it("should get products of selected category", () => {
        expect(productsModel.getFilteredProducts().length).toBe(productsModel.products.length)

        productsModel.handleCategories("smartphones")
        expect(productsModel.paramsFilter.categories[0]).toBe("smartphones")
        expect(productsModel.getFilteredProducts().length).toBe(5)
        productsModel.handleCategories("laptops")
        expect(productsModel.getFilteredProducts().length).toBe(10)
        productsModel.handleCategories("smartphones")
        expect(productsModel.getFilteredProducts().length).toBe(5)
    })


})