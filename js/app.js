const $main = $('main')
const $selector = $('#image-selector')
const allHorns = []

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

$.getJSON(apiURL)
  .then(response => {
    response.forEach(horn => {
      let newHorn = new Horn(horn.title, horn.image_url, horn.description, horn.keyword )
      newHorn.displayHorn()
      allHorns.push(newHorn)
      $selector.append(`<option value=${newHorn.keyword}>${newHorn.keyword}</option>`)
    })
    console.log($(`option[value='narwhal']`))
    if($(`option[value='Horn']`[0])) {
      console.log('nope')
    }
  })
