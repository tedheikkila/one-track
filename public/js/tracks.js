
// stores search input into local storage and does a page redirect
function storeInput(e) {
  e.preventDefault()
  searchInput = $("#userInput").val()
  typeInput = $("#type").val()

  localStorage.setItem("search", searchInput)
  localStorage.setItem("type", typeInput)
  document.location.replace("/tracks")
}

// calls storeInput
$("#searchBtn").on("click", storeInput)

// renders tracks as a table from api Spotify call using a template literal
const renderTracks = (trackArr) => {

  let tableHead = $('#thead')
  tableHead.append(`
  <tr>
  <th>Name</th>
  <th>Artist</th>
  <th id="album-head">Album</th>
  <th>Play</th>
  <th>Save</th>
</tr>
  `)
  let tableBody = $('#tbody')
  trackArr.forEach((track) => {
    let tr = $('<tr>')
    let rowData = `
  <th scope="row" class="track-title">${track.name}</th>
                    <td>${track.artists[0].name}</td>
                    <td id="album-data">${track.album.name}<img src=${track.album.images[1].url} alt="${track.album.name} cover image" style="display: none" width="1" height="1" /> </td>
                    <td><button id="play-one-btn">&#9836;<audio controls id="audio-file">
                    <source src="${track.preview_url}" type="audio/mp3">
                  </audio></button></td>
                    <td><button id="plus-one-btn">+1</button></td>
  `
    tr.append(rowData);
    tableBody.append(tr);
  })
}

// saves/adds a song to user profile on each click event for +1 (aka saveBtn) btns
const addToProfile = async (e) => {
  e.preventDefault()

  let rowData = e.target.parentElement.parentElement.children

  let title = rowData[0].innerText
  let artist = rowData[1].innerText
  let album = rowData[2].innerText
  let url = rowData[3].children[0].childNodes[1].childNodes[1].attributes[0].textContent;
  let album_image = rowData[2].childNodes[1].currentSrc

  try {
    const response = await fetch(`/api/tracks/newtrack`, {
      method: 'POST',
      body: JSON.stringify({ title, artist, album, url, album_image }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log("New track saved");

    } else {
      alert('Failed to create tracks');
    }

  } catch (error) {
    console.log(error);
  }
}

// calls addToProfile; event delegation to tbody
$("#tbody").on("click", "button", addToProfile)


// based upon artist entered does another api call using artist id to display their top tracks
const renderTopTracks = async (id) => {
  try {
    const response = await fetch(`/api/tracks/toptracks`, {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      let data = await response.json();

      renderTracks(data.tracks)

    } else {
      alert('Failed to create project');
    }

  } catch (error) {
    console.log(error);
  }
}

// gets items out of localStorage to eventually be rendered onto page
const getSpotify = async () => {

  let input = localStorage.getItem("search")
  let type = localStorage.getItem("type")
  try {
    const response = await fetch(`/api/tracks`, {
      method: 'POST',
      body: JSON.stringify({ input, type }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      let data = await response.json();

      if (data.artists) {
        let resultArr = data.artists.items
        renderTopTracks(resultArr[0].id)
      }
      if (data.tracks) {
        let resultArr = data.tracks.items
        renderTracks(resultArr)

      }
      if (data.albums) {
        let resultArr = data.albums.items
        console.log(resultArr)
      }

    } else {
      alert('Failed to post tracks');
    }

  } catch (error) {
    console.log(error);
  }
}


// calls getSpotify to initiate server to server 3rd party API call to Spotify's db
getSpotify();