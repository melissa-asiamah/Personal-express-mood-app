var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");
var colorButton = document.getElementsByClassName("moodColor");

Array.from(colorButton).forEach(function(element) {
      element.addEventListener('click', function(){ //appends an event listener to each
        const mood = this.parentNode.parentNode.childNodes[1].innerText 
        const colorThing = this.parentNode.parentNode.childNodes[7].innerText
        console.log(mood, colorThing, thumbUp)
        // document.getElementsByClassName("editHide").classList.toggle("edit")//parseFloat because DOM returns a number(parsfloat covers more bases despite being a decimal value as opposed to parseInt)

        fetch('moodc', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': mood,
            "color": colorThing
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
  
});



// function sort(){
//   let sortify = document.querySelector("happies")
//   let addsortify = document.querySelector("happyToday")
//   if (sortify === addsortify) {
//     sortify.innerText
//   }
// }

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const mood = this.parentNode.parentNode.childNodes[1].innerText //this is thumb up
        console.log("mood1")
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ //turns data into a sJSON object to be sent back and forth
            'mood': mood
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
