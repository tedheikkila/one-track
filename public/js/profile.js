
const delButtonHandler = async (event) => {
  
  try {

    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      console.log(event.target)
  
      const response = await fetch(`/api/tracks/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete track');
      }
    }
    
  } catch (error) {
    console.log(error)
  }
  
};

$('#card-container').on('click', "button", delButtonHandler);
