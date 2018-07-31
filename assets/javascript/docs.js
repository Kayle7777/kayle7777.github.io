let homeStuff = ["test1", "test2", "test3"]

let docs = {
  "Home": '',
  "Contact": `
  MiddleText
  `,
  "Async App": `
  RightText
  `,
  "Other Stuff": `
  TestText
  `
}

homeStuff.map(function(e, i) {
  docs["Home"] += `<div>${e}</div>`
})
