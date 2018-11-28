const $main = $('main')
const $selector = $('#image-selector')
const allHorns = []

const apiURL = 'https://github.com/Simonni/lab2/blob/master/page-1.json'


const Horn = function(title, filePath, description) {
  this.title = title
  this.path = filePath
  this.description = description
}

Horn.prototype.displayHorn = function(){
  const $cloneHorn = $('#photo-template').clone()
  $main.append($cloneHorn)
  $cloneHorn.attr('id', this.title)
  $cloneHorn.find('img').attr('class', 'images')
  $cloneHorn.find('img').attr('src', this.path)
  $cloneHorn.find('img').attr('alt', this.description)
  $cloneHorn.find('h6').text(this.title)
}

$($selector).on('change', ()=>{
  $('div').hide()
  $(`#${event.target.value}`).show()
})

$.getJSON(apiURL)
  .then(response => {
    response.forEach(horn => {
      let newHorn = new Horn(horn.name, horn.image_url, horn.hobbies)
      newHorn.displayDog()
      allHorns.push(newHorn)
      $selector.append(`<option>${newHorn.title}</option>`)
    })
  })