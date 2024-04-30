const API_KEY = "hPLiLRR4wSIPRRFML70Qd8kOK5itmBhY";
const API_PREFIX = "https://api.giphy.com/v1/gifs/search?api_key=";
const API_SETTINGS = "offset=0&rating=g&lang=en&bundle=messaging_non_clips";
function formSubmitted(event) {
    event.preventDefault();
    let inputFieldContent = document.querySelector('[name=memeInput]').value;
    let inputNumber = document.querySelector('[name=memeNumber]').value;
    getMemes(inputFieldContent, inputNumber);
}

function renderGifs(response) {
    let result = '';

    if (response.data.length === 0) {
        renderError("Error: No Results");
    } else {
        for (let meme of response.data) {
            result += `
            <img src="${meme.images.original.url}" alt="${meme.alt_text}" class="meme-img">
            `;
        }
    }
    document.querySelector(".js-memes-container").innerHTML = 
    result;
}

function renderError(message) {
    
    document.querySelector(".error-container").innerHTML = 
    `<div class='error'>${message}</div>`;
}


function getMemes(searchExpression, memeNumber) {
    memeNumber = memeNumber.trim();
    if (searchExpression.trim() === "") {
        renderError("Error: Please provide a valid search expression.");
    } else if (memeNumber === "" || isNaN(memeNumber)) {
        renderError("Error: Please provide a number.");
    }
    else {
        document.querySelector(".error-container").innerHTML = "";
        fetch(`${API_PREFIX}${API_KEY}&q=${searchExpression}&limit=${memeNumber}&${API_SETTINGS}`)
        .then(data => data.json())
        .then(renderGifs)
        .catch(renderError)
    ;
    }
}

document.querySelector("#memeForm").addEventListener('submit', formSubmitted);