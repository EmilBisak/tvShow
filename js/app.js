var mainModule = (function (ui, data) {
    
    const setEventListener = () => {
        const $cardHolderElement = $(ui.DOMSelectors.divShowHolder);
        const $inputElement = $(ui.DOMSelectors.inputSearch);
        const $logoElement = $(ui.DOMSelectors.aLogo);
        const $searchResultElement = $(ui.DOMSelectors.divSearchResult);
        $cardHolderElement.on("click", cardHandler);
        $inputElement.on("keyup", searchHandler);
        $logoElement.on("click", homeButtonHandler);
        $searchResultElement.on("click", cardHandler);
    }

    const homeButtonHandler = event => {
        data.fetchShows(ui.displayShows,ui.displayError);
    }
    
    const cardHandler = event => {
        if (event.target.tagName === "A") {
            event.preventDefault();
            const id = ui.getShowId(event);
            data.fetchShowInfo(id, ui.displayShowInfo, ui.displayError)
        }
    }

    const searchHandler = event => {
        const searchValue = ui.collectInputData();
        if (event.key === "Enter") {
            if(searchValue === "") {
                return;
            }
            event.preventDefault();
            data.fetchSearchedShows(searchValue, ui.displayShows, ui.displayError);
            return ui.displaySearchedList([]);
        }
        if (searchValue === "") {
            return ui.displaySearchedList([]);
        }

        data.fetchSearchedShows(searchValue, ui.displaySearchedList, ui.displayError);
    }


    const initHomepage = () => {
        setEventListener();
        data.fetchShows( ui.displayShows, ui.displayError);
    }

    return {
        initHomepage
    }
})(uiModule, dataModule);