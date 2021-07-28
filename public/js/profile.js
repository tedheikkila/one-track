
const delButtonHandler = async (event) => {
  
  try {
  console.log(event);
  if (event.target.attributes[2].value) {
    const id = event.target.attributes[2].value;;

    const response = await fetch(`/api/tracks/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
    
  } catch (error) {
    console.log(error)
  }
  
};


  $('#cardContainer').on('click','button', delButtonHandler)
