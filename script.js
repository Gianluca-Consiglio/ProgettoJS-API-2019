const loadingButton = document.getElementById("loadingButton")
const result = document.getElementById("results")
const filterText = document.getElementById("filterText")
const url = "https://api.nytimes.com/svc/"
const archive = "archive/v1"
const search = "/search/v2/articlesearch"
const key = "5khdzhlECTrkyjMJ6p14zGMhsnnz9p0q"
let year = "2019"
let month = "11"
let filter = "cat"

const makeSpoiler = (main, lead_paragraph,link) =>{
  let input = '<input type="checkbox" id="' + main + '" aria-hidden="true">'
  let span = '<a href="' + link + '"> <span class="icon-link secondary"></span></a>'
  let label = '<label for="' + main + '" aria-hidden="true">' + main + span +  '</label>'
  let div = '<div><p>'+lead_paragraph+'</p></div>'
  return (input + label + div)
}

const viewArticles = (articles) =>{
  for(let i = 0; i < articles.length; i++){
        result.innerHTML += makeSpoiler(articles[i].headline.main,articles[i].lead_paragraph,articles[i])
      }
}


const searchArticles = () =>{
  if(filter === "")
    return
  result.innerHTML = ""
  console.log(url + search + ".json?q="+ filter  + "&api-key=" + key)
    fetch(url + search + ".json?q="+ filter  + "&api-key=" + key)
    .then(r => r.json())
    .then(body => {
      articles = body.response.docs
      for(let i = 0; i < articles.length; i++){
        result.innerHTML += makeSpoiler(articles[i].headline.main,articles[i].lead_paragraph,articles[i].url)
      }
    });
    console.log("endfetch")
}

const popularArticles =  (time, ranking_type) =>{
  result.innerHTML = ""
  console.log(url+"mostpopular/v2/"+ranking_type + "/" + time + ".json?api-key=" + key)
  fetch(url+"mostpopular/v2/"+ranking_type + "/" + time + ".json?api-key=" + key)
  .then(r => r.json())
    .then(body => {
      articles = body.results
      for(let i = 0; i < articles.length; i++){
        result.innerHTML += makeSpoiler(articles[i].title,articles[i].abstract,articles[i].url)
      }
      
    });
    console.log("endfetch")
}


document.addEventListener('DOMContentLoaded', (event) => {
    popularArticles("1","viewed")
});

loadingButton.onclick = searchArticles
filterText.oninput = (e) => {
    filter = e.target.value
}