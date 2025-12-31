const proxy = "https://api.allorigins.win/raw?url=";

const indiaRSS =
  "https://news.google.com/rss/search?q=aviation+India";
const globalRSS =
  "https://news.google.com/rss/search?q=global+aviation";
const lawsRSS =
  "https://news.google.com/rss/search?q=DGCA+aviation+rules";

function fetchNews(rss) {
  fetch(proxy + encodeURIComponent(rss))
    .then(res => res.text())
    .then(str => new window.DOMParser()
      .parseFromString(str, "text/xml"))
    .then(data => {
      let items = data.querySelectorAll("item");
      let output = "";
      items.forEach((el, i) => {
        if (i < 10) {
          output += `
          <div class="article">
            <h3>${el.querySelector("title").textContent}</h3>
            <a href="${el.querySelector("link").textContent}" target="_blank">
              Read full news
            </a>
          </div>`;
        }
      });
      document.getElementById("news").innerHTML = output;
    });
}

function loadIndia() { fetchNews(indiaRSS); }
function loadGlobal() { fetchNews(globalRSS); }
function loadLaws() { fetchNews(lawsRSS); }

// Load India news by default
loadIndia();
