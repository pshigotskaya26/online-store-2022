class PromokodSearch {
	render() {
		let inputSearch = document.createElement("input")
        inputSearch.type = "serach";
		inputSearch.classList.add('search-input');
		inputSearch.classList.add('promo-search');
		inputSearch.placeholder = "Введите навание промокода";

		return inputSearch;
	}
}

export default PromokodSearch;