
// delete buttons remove card from profile 
const delButtonHandler = async (event) => {
  try {
    const id = event.target.attributes[2].value;;

    const response = await fetch(`/api/tracks/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete track');
    }

  } catch (error) {
    console.log(error)
  }
}


// event delegation to cardContainer; listen for btn click (del btn is the only btn on card)
$('#cardContainer').on('click', 'button', delButtonHandler)