const API_KEY="6c14568cae5549cd97a57b45fe5270e3"
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews('India'))

function reload() {
    window.location.reload();
} 

async function fetchNews(query){
    const response=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data=await response.json();
    //console.log(data);
    bindData(data.articles)
}

function bindData(articles){

    const cardcontainer=document.getElementById("card-contain");
    const newcardtemplate= document.getElementById("template-news-card");

    cardcontainer.innerHTML='';

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const newcardClone=newcardtemplate.content.cloneNode(true);
        
        fillDataInCard(newcardClone,article);
        cardcontainer.appendChild(newcardClone);
       
    });


}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

function onAboutClick() {
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

// searchButton.addEventListener("click", () => {
//     const query = searchText.value;
//     if (!query) return;
//     fetchNews(query);
//     curSelectedNav?.classList.remove("active");
//     curSelectedNav = null;
// });
// searchButton.addEventListener("click", function(){
//     search();
// });


function search(){
    const searchText = document.getElementById("search-text");

    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
}