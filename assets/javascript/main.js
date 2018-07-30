let docs = {
  "Home": `HomeText`,
  "Middle": `MiddleText`,
  "Right": `RightText`,
  "Other Stuff": `TestText`
}

$("#headerLinks .btn, .dropdown-menu .dropdown-item").click(function(event) {
  event.preventDefault();
  $("#headerLinks").children().removeClass("active");
  let text = $(this).text();
  $(".card-body").html(`
    <p>${docs[text]}</p>
    `)
})
