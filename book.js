const loadingButton = document.getElementById("loadingButton")
const result = document.getElementById("results")
const filterText = document.getElementById("filterText")
const url = "https://api.nytimes.com/svc/books/v3/"
const bestSeller = "lists.json?list-name=hardcover-fiction&api-key="
const key = "5khdzhlECTrkyjMJ6p14zGMhsnnz9p0q"

const makeSpoiler = (title, author,description, rank_last_week, weeks_on_list, amazon_link) =>{
    let input = '<input type="checkbox" id="' + title +'" aria-hidden="true">'
    let span = '<a href="' + amazon_link + '"> <span class="icon-link secondary"></span></a>'
    let label = '<label for="' + title + '" aria-hidden="true">' + title + " - " + author + span +  '</label>'
    let div = '<div><p>'+description + " - rank last week: " + rank_last_week + " - weeks on list: " + weeks_on_list +'</p></div>'
    return (input + label + div)
  }

const loadBestSeller = async () =>{
  console.log(url + bestSeller + key)
  fetch(url + bestSeller + key)
  .then(r => r.json())
  .then(body =>{
      books = body.results
      for(let i = 0; i < books.length; i++){
          let book = books[i]
          let book_details = book.book_details[0]
        results.innerHTML += makeSpoiler(book_details.title,book_details.author,book_details.description
                                        ,book.rank_last_week,book.weeks_on_list, book.amazon_product_url)
      }
    })
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadBestSeller()
});

//loadingButton.onclick = loadBestSeller()
filterText.oninput = (e) => {
    filter = e.target.value
}