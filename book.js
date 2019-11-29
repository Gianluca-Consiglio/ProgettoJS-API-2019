const loadingButton = document.getElementById("loadingButton")
const result = document.getElementById("results")
const filterText = document.getElementById("filterText")
const url = "https://api.nytimes.com/svc/books/v3/"
const key = "5khdzhlECTrkyjMJ6p14zGMhsnnz9p0q"


const makeSpoiler = (main, lead_paragraph) =>{
  let input = '<input type="checkbox" id="' + main + '" aria-hidden="true">'
  let label = '<label for="' + main + '" aria-hidden="true">' + main + '</label>'
  let div = '<div><p>'+lead_paragraph+'</p></div>'
  return (input + label + div)
}

const viewArticles = (articles) =>{
  for(let i = 0; i < articles.length; i++){
        result.innerHTML += makeSpoiler(articles[i].headline.main,articles[i].lead_paragraph)
      }
}


document.addEventListener('DOMContentLoaded', (event) => {
    popularArticles("1","viewed")
});

loadingButton.onclick = searchArticles
filterText.oninput = (e) => {
    filter = e.target.value
}