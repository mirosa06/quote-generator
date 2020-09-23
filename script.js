const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")
const loader = document.getElementById("loader")

// Show loading
function showLoadingSpinner() {
    loader.hidden = false
    quoteContainer.hidden = true
}

// Hide loading
function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false
        loader.hidden = true
    }
}

// Get Quote from API
async function getQuote() {
    showLoadingSpinner()
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"
    const apiUrl = "https://api.quotable.io/random"
    try {
        const response = await fetch(proxyUrl + apiUrl)
        const data = await response.json()
        // If Author is blank, add 'Unknown'
        if (data.author === "") {
            authorText.innerText = "Unknown"
        } else {
            authorText.innerText = data.author
        }
        // Reduce font size for long Text
        if (data.content > 120) {
            quoteText.classList.add("long-quote")
        } else {
            quoteText.classList.remove("long-quote")
        }
        quoteText.innerText = data.content

        removeLoadingSpinner()
    } catch (error) {
        getQuote()
        console.log("Whoops, no quote ? ", error)
    }
}

// Tweet Quote function
function tweetQuote() {
    const quote = quoteText.innerText
    const author = authorText.innerText
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl, "_blank")
}

// Event Listener on New Quote & Twitter Button
newQuoteBtn.addEventListener("click", getQuote)
twitterBtn.addEventListener("click", tweetQuote)

// On Load
getQuote()
