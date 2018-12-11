const $main = $('main')
const $selector = $('#image-selector')
const allHorns = []
const allKeywords = []

const apiURL = 'https://raw.githubusercontent.com/Simonni/lab2/master/page-1.json'


const Horn = function(title, filePath, description, keyword) {
  this.title = title
  this.path = filePath
  this.description = description
  this.keyword = keyword
}

Horn.prototype.displayHorn = function() {
  const $cloneHorn = $('#template').clone()
  $main.append($cloneHorn)
  $cloneHorn.attr('class', this.keyword)
  $cloneHorn.find('img').attr('class', 'images')
  $cloneHorn.find('img').attr('src', this.path)
  $cloneHorn.find('img').attr('alt', this.description)
  $cloneHorn.find('h6').text(this.title)
}

$($selector).on('change', () => {
  $('div').hide()
  $(`.${event.target.value}`).show()
})

let duplicate = function(arr, dup){
  let count = 0
  for(let i=0; i<arr.length; i++){
    if(arr[i]===dup){
      count++
    }
  }
  return count
}

$.getJSON(apiURL)
  .then(response => {
    response.forEach(horn => {
      let newHorn = new Horn(horn.title, horn.image_url, horn.description, horn.keyword )
      newHorn.displayHorn()
      allHorns.push(newHorn)
      allKeywords.push(newHorn.keyword)
      if(duplicate(allKeywords, newHorn.keyword)===1){
        $selector.append(`<option value=${newHorn.keyword}>${newHorn.keyword}</option>`)
      
      }
    
    })
  })
