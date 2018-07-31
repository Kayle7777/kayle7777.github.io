// docs variable comes from docs.js
// I suspect this project would become a whole lot easier if I knew Node a little better
$("#headerLinks .btn, .dropdown-menu .dropdown-item").click(function(event) {
  event.preventDefault();
  $("#headerLinks").children().removeClass("active");
  let text = $(this).text();
  $(".card-body").html(`
    ${docs[text]}
    `)
})

// $(document).ready(function() {
//   $(".card-body").html(`
//     ${docs['Home']}
//     `)
// })
