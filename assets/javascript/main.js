// docs variable comes from docs.js
// I suspect this project would become a whole lot easier if I knew Node a little better
$("#headerLinks .btn:not(.dropdown-toggle)").click(function(event) {
  event.preventDefault();
  $("#headerLinks").children().removeClass("active");
  let text = $(this).text();
  if (text == "Home"){text = "index"};
  window.location=`./${text.toLowerCase()}.html`
})

$(".dropdown-toggle .dropdown-item").click( e=>e.preventDefault )

// $(document).ready(function() {
//   $(".card-body").html(docs['Home'])
// })
