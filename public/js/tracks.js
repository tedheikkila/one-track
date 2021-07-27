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
                    <td id="album-data">${track.album.name}</td>
                    <td><button id="play-one-btn">&#9836;<audio controls id="audio-file">
                    <source src="${track.preview_url}" type="audio/mp3">
                  </audio></button></td>
                    <td><button id="plus-one-btn">+1</button></td>
  `
    tr.append(rowData);
    tableBody.append(tr);
  })
}

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

      //return response.json()
    } else {
      alert('Failed to create project');
    }

  } catch (error) {
    console.log(error);
  }


}


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
        // console.log(resultArr);
      }
      if (data.tracks) {
        let resultArr = data.tracks.items
        renderTracks(resultArr)

      }
      if (data.albums) {
        let resultArr = data.albums.items
        console.log(resultArr)
      };
    } else {
      alert('Failed to create project');
    }

  } catch (error) {
    console.log(error);
  }

}

getSpotify();







// let trackTitle;
// let trackData;
// let saveTrackBtn;
// let playTrackBtn;
// let trackList;

// if (window.location.pathname === '/tracks') {
//   trackTitle = document.querySelector('.track-title');
//   trackData = document.querySelector('.track-data');
//   saveTrackBtn = document.querySelector('#plus-one-btn');
//   playTrackBtn = document.querySelector('#play-one-btn');
//   trackList = document.querySelectorAll('.list-container .list-group');
// }

// // show an element
// const show = (elem) => {
//   elem.style.display = 'inline';
// };

// // hide an element
// const hide = (elem) => {
//   elem.style.display = 'none';
// };

// // activeTrack used to keep track of the track in the textarea
// let activeTrack = {};

// const getTracks = () =>
//   fetch('/api/tracks', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

// const saveTrack = (track) =>
//   fetch('/api/tracks', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(track),
//   });

// const deleteTrack = (id) =>
//   fetch(`/api/tracks/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

// const renderActiveTrack = () => {
//   hide(saveTrackBtn);

//   if (activeTrack.id) {
//     trackTitle.setAttribute('readonly', true);
//     trackData.setAttribute('readonly', true);
//     trackTitle.value = activeTrack.title;
//     trackData.value = activeTrack.text;
//   } else {
//     trackTitle.removeAttribute('readonly');
//     trackData.removeAttribute('readonly');
//     trackTitle.value = '';
//     trackData.value = '';
//   }
// };

// const handleTrackSave = () => {
//   const newTrack = {
//     title: trackTitle.value,
//     text: trackData.value,
//   };
//   saveTrack(newTrack).then(() => {
//     getAndRenderTracks();
//     renderActiveTrack();
//   });
// };

// // delete the clicked track
// const handleTrackDelete = (e) => {
//   // prevents the click listener for the list from being called when the button inside of it is clicked
//   e.stopPropagation();

//   const track = e.target;
//   const trackID = JSON.parse(track.parentElement.getAttribute('data-track')).id;

//   if (activeTrack.id === trackID) {
//     activeTrack = {};
//   }

//   deleteTrack(trackID).then(() => {
//     getAndRenderTracks();
//     renderActiveTrack();
//   });
// };

// // sets the activeTrack and displays it
// const handleTrackView = (e) => {
//   e.preventDefault();
//   activeTrack = JSON.parse(e.target.parentElement.getAttribute('data-track'));
//   renderActiveTrack();
// };

// // sets the activeTrack to an empty object and allows the user to enter a new track
// const handleNewTrackView = (e) => {
//   activeTrack = {};
//   renderActiveTrack();
// };

// const handleRenderSaveBtn = () => {
//   if (!trackTitle.value.trim() || !trackData.value.trim()) {
//     hide(saveTrackBtn);
//   } else {
//     show(saveTrackBtn);
//   }
// };

// // renders the list of track titles
// const renderTrackList = async (tracks) => {
//   let jsonTracks = await tracks.json();
//   if (window.location.pathname === '/tracks') {
//     trackList.forEach((el) => (el.innerHTML = ''));
//   }

//   let trackListItems = [];

//   // returns HTML element with or without a delete button
//   const createLi = (text, delBtn = true) => {
//     const liEl = document.createElement('li');
//     liEl.classList.add('list-group-item');

//     const spanEl = document.createElement('span');
//     spanEl.classList.add('list-item-title');
//     spanEl.innerText = text;
//     spanEl.addEventListener('click', handleTrackView);

//     liEl.append(spanEl);

//     if (delBtn) {
//       const delBtnEl = document.createElement('i');
//       delBtnEl.classList.add(
//         'fas',
//         'fa-trash-alt',
//         'float-right',
//         'text-danger',
//         'delete-track'
//       );
//       delBtnEl.addEventListener('click', handleTrackDelete);

//       liEl.append(delBtnEl);
//     }

//     return liEl;
//   };

//   if (jsonTracks.length === 0) {
//     trackListItems.push(createLi('No saved tracks', false));
//   }

//   jsonTracks.forEach((track) => {
//     const li = createLi(track.title);
//     li.dataset.track = JSON.stringify(track);

//     trackListItems.push(li);
//   });

//   if (window.location.pathname === '/tracks') {
//     trackListItems.forEach((track) => trackList[0].append(track));
//   }
// };

// // gets tracks from the db and renders them to the sidebar
// const getAndRenderTracks = () => getTracks().then(renderTrackList);

// if (window.location.pathname === '/tracks') {
//   saveTrackBtn.addEventListener('click', handleTrackSave);
//   playTrackBtn.addEventListener('click', handleNewTrackView);
//   trackTitle.addEventListener('keyup', handleRenderSaveBtn);
//   trackData.addEventListener('keyup', handleRenderSaveBtn);
// }

// getAndRenderTracks();