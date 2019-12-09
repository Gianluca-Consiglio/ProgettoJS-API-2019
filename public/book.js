const loadingButton = document.getElementById("loadingButton")
const result = document.getElementById("results")
const filterText = document.getElementById("filterText")
const url = "https://api.nytimes.com/svc/books/v3/"
const bestSeller = "lists.json?list-name=hardcover-fiction&api-key="
const reviews = "https://api.nytimes.com/svc/books/v3/reviews.json?"
const key = "5khdzhlECTrkyjMJ6p14zGMhsnnz9p0q"
const googleKey = "AIzaSyDvZ91kj4Cc1gCEA3Nv5INVuLRB4pilyR8"
const imgquery = "https://www.googleapis.com/books/v1/volumes?q=isbn:"
let filter = ""

const makeSpoilerBestSeller = (title, author,description, rank_last_week, weeks_on_list, amazon_link, thumbnail) =>{
    let input = '<input type="checkbox" id="' + title +'" aria-hidden="true">'
    let span = '<a href="' + amazon_link + '"> <span class="icon-cart secondary"></span></a>'
    let label = '<label for="' + title + '" aria-hidden="true">' + title + " - " + author + span +  '</label>'
    let img = '<img src="' + thumbnail + '" alt="Thumbnail"/>'
    let div = '<div><p>'+description + " - rank last week: " + rank_last_week + " - weeks on list: " + weeks_on_list+'</p> <br> ' + img + '</div>'
    return (input + label + div)
  }

const makeSpoilerReview = (title, author, description,review_link, thumbnail) => {
  let input = '<input type="checkbox" id="' + title +'" aria-hidden="true">'
  let span = '<a href="' + review_link + '"> <span class="icon-link secondary"></span></a>'
  let label = '<label for="' + title + '" aria-hidden="true">' + title + " - " + author + span +  '</label>'
  let img = '<img src="' + thumbnail + '" alt="Thumbnail"/>'
  let div = '<div><p>' + description + '</p> <br> ' + img + '</div>'
  return (input + label + div)
}

const search = async() =>{
  if (filter === "")
    return
  results.innerHTML = '<div class="spinner"></div>'
  console.log(reviews + "author=" + filter + "&api-key=" + key)
  let result = await fetch(reviews + "author=" + filter + "&api-key=" + key).then(r => r.json())
  if(result.num_results === 0){
    results.innerHTML = '<p> No results found for the author: "' + filter + '".</p>'
    return
  }
  let all = ""
  let titles = ["temp"]
  books = result.results
  for(let i = 0; i < books.length && i < 20; i++){
          let book = books[i]
          let isbn13
          
          if(!titles.includes(book.book_title)){
            titles.push(book.book_title)
            if(book.hasOwnProperty("isbn13"))
            isbn13 = book.isbn13[0]
            else
              isbn13 ="none"
            //console.log(imgquery + isbn13 + "&key=" + googleKey)
            let description = book.summary
            let t = await fetch(imgquery + isbn13 + "&key=" + googleKey).then(r => r.json())
            if(t.totalItems === 0)
              t = "Thumbnail_default.png"
            else{
              description = t.items[0].volumeInfo.description
              t = t.items[0].volumeInfo.imageLinks.smallThumbnail 
            }
              
            all += makeSpoilerReview(book.book_title,book.book_author,description,book.url,t)
          }  
  }
  results.innerHTML = all
}

const loadBestSeller = async() =>{
  results.innerHTML = '<div class="spinner"></div>'
  //console.log(url + bestSeller + key)
  let result = await fetch(url + bestSeller + key).then(r => r.json())
  let all = ""
  books = result.results
      for(let i = 0; i < books.length; i++){
          let book = books[i]
          let book_details = book.book_details[0]
          let t = await fetch(imgquery + book.isbns[0].isbn10 + "&key=" + googleKey).then(r => r.json())
          if(t.totalItems === 0)
            t = "Thumbnail_default.png"
          else
            t = t.items[0].volumeInfo.imageLinks.smallThumbnail
        all += makeSpoilerBestSeller(book_details.title,book_details.author,book_details.description
                                        ,book.rank_last_week,book.weeks_on_list, book.amazon_product_url,
                                        t)
      }
      results.innerHTML = all
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadBestSeller()
});

loadingButton.onclick = search
filterText.oninput = (e) => {
    filter = e.target.value
}
