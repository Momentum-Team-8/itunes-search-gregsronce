const form = document.getElementById("input-field");
const head = document.getElementById("header");
const artistSearch = document.getElementById("artist-search");
const artistDisplay = document.querySelector(".song-info-container");

form.addEventListener("submit", (event) => {
  // prevent the form being submitted when the page reloads
  event.preventDefault();
  form.remove();

  const newSearch = document.createElement("button");
  newSearch.classList.add("clear-search-button");
  newSearch.innerText = "New Search";
  head.appendChild(newSearch);
  newSearch.addEventListener("click", (event) => {
    location.reload();
  });

  const line = document.createElement("hr");
  head.appendChild(line);

  getInfo();
});

function getInfo() {
  const url = `https://proxy-itunes-api.glitch.me/search?term=${artistSearch.value}&limit=14&media=music&entity=song`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // for of loop where each member of data.results is assigned to result in order.
      for (let result of data.results) {
        const artistBox = document.createElement("div");
        artistBox.classList.add("artist-box");
        artistDisplay.appendChild(artistBox);

        const artistImage = document.createElement("img");
        artistImage.src = result.artworkUrl100;
        artistBox.appendChild(artistImage);

        const song = document.createElement("p");
        song.classList.add("song-title");
        const songTitle = document.createElement("a");
        songTitle.classList.add("link");
        songTitle.innerText = result.trackName;
        song.appendChild(songTitle);
        artistBox.appendChild(song);

        const artistName = document.createElement("h4");
        artistName.innerText = result.artistName;
        artistBox.appendChild(artistName);

        songTitle.addEventListener("click", (event) => {
          const figure = document.createElement("figure");
          figure.classList.add("figure");
          head.appendChild(figure);

          const songPreview = document.createElement("audio");
          songPreview.classList.add("audio-player");
          songPreview.setAttribute("type", "audio/mpeg");
          songPreview.setAttribute("controls", "controls");
          songPreview.src = result.previewUrl;
          figure.appendChild(songPreview);

          const figCaption = document.createElement("figcaption");
          figCaption.classList.add("fig-caption");
          figCaption.innerText = "Now playing: " + result.trackName;
          figure.appendChild(figCaption);

          const resetButton = document.createElement("button");
          resetButton.classList.add("remove-song-button");
          resetButton.innerText = "Remove Song";
          figure.appendChild(resetButton);
          resetButton.addEventListener("click", (event) => {
            figure.remove();
          });
          const line = document.createElement("hr");
          figure.appendChild(line);
        });
      }
    });
}
