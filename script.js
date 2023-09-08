const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoader() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoader() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// show new quote
function newQuote() {
  showLoader();
  // pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // console.log(quote);
  // check if author field is null and replace it with 'Unknown'
  if (!quote.author) {
    quote.author = "Unknown";
  }
  // check quote length to determine styling
  if (quote.text.length > 80) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // set quote, hide loader
  quoteText.textContent = quote.text;
  authorText.textContent = quote.author;
  removeLoader();
}

async function getQuotes() {
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    showLoader();
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    // console.log(apiQuotes[101]);

    newQuote();
  } catch (error) {
    console.error(error);
  }
}

// tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}\n - ${authorText.textContent}`;
  // open new window
  window.open(twitterUrl, "_blank");
}

// event listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
