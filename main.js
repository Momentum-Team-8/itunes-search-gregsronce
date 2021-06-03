
// Look at the iTunes documentation, especially search examples in the documentation.

// First steps:
// Build a form that has an <input> where a user can type in the name of a band or an artist.
// When the user types their search term (the name of the artist) and presses the submit button (or presses Enter), make the search request to the API.
// A fetch request goes to the iTunes API to get that information back. 
// Use insomnia to figure out url specifications. Try dot notating one item to the DOM. Use ideas from customer currency project to build boxes. 
// Loop through every time we do a GET request to extrapolate the exact data we need to build boxes in the container. 


const form = document.getElementById('input-field')
const head = document.getElementById('header')
const artistSearch = document.getElementById('artist-search')
const artistDisplay = document.querySelector('.song-info-container')
// const submitSearch = document.getElementById('search-button')


form.addEventListener('submit', event => {
    event.preventDefault()
    // const searchTitle = document.createElement('h1')
    // searchTitle.classList.add('search-title')
    // searchTitle.innerText = "Search Results"
    // artistDisplay.appendChild(searchTitle)
   getInfo()
}) 


function getInfo() {
json = {}
const url = `https://proxy-itunes-api.glitch.me/search?term=${artistSearch.value}&limit=15&media=music&entity=song`
fetch(url)
.then(res => res.json())
.then(data => {
console.log(data)
for (let result of data.results) {
    const artistBox = document.createElement('div')
    artistBox.classList.add('artist-box')
    artistDisplay.appendChild(artistBox)
    const artistImage = document.createElement('img')
    artistImage.src = result.artworkUrl100
    artistBox.appendChild(artistImage) 
    const songTitle = document.createElement('p')
    songTitle.innerText = result.trackName
    artistBox.appendChild(songTitle)
    const artistName = document.createElement('p')
    artistName.innerText = result.artistName
    artistBox.appendChild(artistName)
    // const songPreview = document.createElement('audio')
    // songPreview.setAttribute('type', 'audio/mpeg')
    // songPreview.setAttribute('controls', 'controls')
    // songPreview.src = result.previewUrl
    // artistBox.appendChild(songPreview) 
 }
})
}

// Insert for of loop into GET fetch request looping through data?
// for (let result of results)?


// Start by creating a new div to fit in the container
    // const artistBox = document.createElement('div')
    // artistBox.classList.add('artist-box')
    // artistDisplay.appendChild(artistBox)

// Next comes the image associated with each song (artworkURl--3 different sizes in JSON--create another get request?)
    // const artistImage = document.createElement('img')
    // artistImage.src = x
    // artistBox.appendChild(artistImage)

// Next comes the song title. Will have to add add event listener to the parent element with event delegation??
// ("preveiwURL" in JSON--build in audio tag here and it will have to be appended to header below title?//create another get request?)
    // const songTitle = document.createElement('href to the audio file' with text of song name)

// Next comes the Band/Artist Name ("artistName in JSON").
    // const artistName = document.createElement('p')
    // artistName = results[0].artistName
    // artistBox.appendChild(artistName)

// When the API returns a response, use the results to display a listing of songs related to the search term.
// You'll use artist data from the API to display song titles, and then allow the user to select and play song previews.
// When a user clicks a song in your listing, the song should play in an <audio> tag that you've also added to the page (see the mockup).
// const audio = document.createElement('audio')
// audio.value
// header.appendChild(audio)