const proxy = "https://api.allorigins.win/raw?url=";

const indiaRSS = "https://news.google.com/rss/search?q=aviation+India";
const globalRSS = "https://news.google.com/rss/search?q=global+aviation";
const lawsRSS = "https://news.google.com/rss/search?q=DGCA+aviation+rules";

function fetchNews(rss) {
  document.getElementById("loading").style.display = "block";
  document.getElementById("error").innerText = "";
  document.getElementById("news-container").innerHTML = "";

  fetch(proxy + encodeURIComponent(rss))
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch news");
      return res.text();
    })
    .then(str => new DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
      const items = data.querySelectorAll("item");
      let output = "";

      items.forEach((el, i) => {
        if (i < 10) {
          const title = el.querySelector("title")?.textContent || "No title";
          const link = el.querySelector("link")?.textContent || "#";
          const source = el.querySelector("source")?.textContent || "Google News";

          // Google News thumbnail trick
          const image = `https://source.unsplash.com/800x400/?aircraft,airline,aviation`;

          output += `
            <div class="news-card">
              <img src="${image}" alt="Aviation News">
              <h3>${title}</h3>
              <p class="source">Source: ${source}</p>
              <a href="${link}" target="_blank">Read full news →</a>
            </div>
          `;
        }
      });

      document.getElementById("news-container").innerHTML = output;
    })
    .catch(err => {
      document.getElementById("error").innerText =
        "⚠ Unable to load news. Please try again later.";
      console.error(err);
    })
    .finally(() => {
      document.getElementById("loading").style.display = "none";
    });
}

function loadIndia() { fetchNews(indiaRSS); }
function loadGlobal() { fetchNews(globalRSS); }
function loadLaws() { fetchNews(lawsRSS); }

// Default load
loadIndia();

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
function searchNews() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".news-card");

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(input) ? "block" : "none";
  });
}
