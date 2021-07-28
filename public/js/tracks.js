function storeInput(e) {
  e.preventDefault()
  searchInput = $("#userInput").val()
  typeInput = $("#type").val()

  localStorage.setItem("search", searchInput)
  localStorage.setItem("type", typeInput)
  document.location.replace("/tracks")
}
$("#searchBtn").on("click", storeInput)


const renderTracks = (trackArr) => {

  let tableHead = $('#thead')
  tableHead.append(`
  <tr>
  <th>Name</th>
  <th>Artist</th>
  <th>Album</th>
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
                    <td>${track.album.name}<img src=${track.album.images[1].url} alt="${track.album.name} cover image" style="display: none" width="1" height="1" /> </td>
                    <td><button id="play-one-btn">&#9836;<audio controls>
                    <source src="${track.preview_url}" type="audio/mp3">
                  </audio></button></td>
                    <td><button id="plus-one-btn">+1</button></td>
  `
    tr.append(rowData);
    tableBody.append(tr);
  })
}

const addToProfile = async (e) => {
  e.preventDefault()

  let rowData = e.target.parentElement.parentElement.children
  console.log(rowData);
  
  let title = rowData[0].innerText
  let artist = rowData[1].innerText
  let album = rowData[2].innerText
  let url = rowData[3].children[0].childNodes[1].childNodes[1].attributes[0].textContent;
  let album_image = rowData[2].childNodes[1].currentSrc

  console.log(title, artist, album, url, album_image);

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




      //return response.json()
    } else {
      alert('Failed to create project');
    }

  } catch (error) {
    console.log(error);
  }



}


$("#tbody").on("click", "button", addToProfile)



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


      renderTracks(data.tracks)

      //return response.json()
    } else {
      alert('Failed to create project');
    }

  } catch (error) {
    console.log(error);
  }


}

//for each row item we need a button that will do an API call
// API call needs artists ID
//

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
        //console.log(resultArr);
      }
      if (data.tracks) {
        let resultArr = data.tracks.items
        renderTracks(resultArr)

      }
      if (data.albums) {
        let resultArr = data.albums.items
        console.log(resultArr)
      }
      ;



      //return response.json()
    } else {
      alert('Failed to create project');
    }

  } catch (error) {
    console.log(error);
  }

}

getSpotify();

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};



  $('#cardContainer').on('click','button', delButtonHandler)
  


