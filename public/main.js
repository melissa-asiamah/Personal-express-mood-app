var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){ //appends an event listener to each
        const mood1 = this.parentNode.parentNode.childNodes[1].innerText //this is thumb up
        const mood2 = this.parentNode.parentNode.childNodes[3].innerText
        const mood3 = this.parentNode.parentNode.childNodes[5].innerText
        const mood4 = this.parentNode.parentNode.childNodes[7].innerText
        console.log("mood1")
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        // document.getElementsByClassName("editHide").classList.toggle("edit")//parseFloat because DOM returns a number(parsfloat covers more bases despite being a decimal value as opposed to parseInt)

        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'mood1': mood1,
            'mood2': mood2,
            'mood3': mood3,
            'mood4': mood4
            // 'thumbUp':thumbUp
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
      sort()
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
        const mood1 = this.parentNode.parentNode.childNodes[1].innerText //this is thumb up
        const mood2 = this.parentNode.parentNode.childNodes[3].innerText
        const mood3 = this.parentNode.parentNode.childNodes[5].innerText
        const mood4 = this.parentNode.parentNode.childNodes[7].innerText
        console.log("mood1")
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ //turns data into a sJSON object to be sent back and forth
            'mood1': mood1,
            'mood2': mood2,
            'mood3': mood3,
            'mood4': mood4
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
