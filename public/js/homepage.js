// grabs artist/song input and searches in Spotify
function storeInput(e) {
  e.preventDefault()
  searchInput = $("#userInput").val()
  typeInput = $("#type").val()
  
  localStorage.setItem("search", searchInput)
  localStorage.setItem("type", typeInput)
  document.location.replace("/tracks")
}
$("#searchBtn").on("click", storeInput)


// slideshow gallery on homepage
var slideIndex = [1,];
var slideId = ["mySlides1",] 
showSlides(1, 0); showSlides(1, 1); showSlides(1, 2)
function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}

function showSlides(n, no) {
  var i;
  var x = document.getElementsByClassName(slideId[no]);
  if (n > x.length) {slideIndex[no] = 1} 
  if (n < 1) {slideIndex[no] = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none"; 
  }
  x[slideIndex[no]-1].style.display = "block"; 
}

