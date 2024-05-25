const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.getElementById("searchResults");
const showMoreButtonEl = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

const searchImages = () => {
  inputData = searchInputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (page === 1) {
        searchResultsEl.innerHTML = "";
      }
      const results = data.results;
      results.forEach(result => {
        const resultHTML = `
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div class="card search-result">
              <img src="${result.urls.small}" alt="${result.alt_description}" class="card-img-top">
              <div class="card-body">
                <a href="${result.links.html}" target="_blank" class="card-text">${result.alt_description}</a>
              </div>
            </div>
          </div>
        `;
        searchResultsEl.innerHTML += resultHTML;
      });

      page++;

      if (page > 1) {
        showMoreButtonEl.style.display = "block";
      }
    })
    .catch(error => {
      console.error("Error fetching images:", error);
    });
};

formEl.addEventListener("submit", event => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});
