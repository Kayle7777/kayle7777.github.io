const gitHubRepos = [
  { name: 'Word Guess Game',
    gitHubName: 'Word-Guess-Game',
    repo: "https://github.com/Kayle7777/Word-Guess-Game",
    pages: "https://kayle7777.github.io/Word-Guess-Game",
    readme: "https://raw.githubusercontent.com/Kayle7777/Word-Guess-Game/master/README.md",
    date: "06/21/2018",
    description: `This one was fun. Just a standard hangman game in Javascript. I would re-do it now in a slightly different way, but all together I liked how it was hard-ish to break. And it works ok!`
  },
  { name: 'Unit 4 Crystal Game',
    gitHubName: 'unit-4-game',
    repo: "https://github.com/Kayle7777/unit-4-game",
    pages: "https://kayle7777.github.io/unit-4-game",
    readme: "https://raw.githubusercontent.com/Kayle7777/unit-4-game/master/README.md",
    date: "06/26/2018",
    description: `I quite enjoyed this one.  This was a jQuery heavy assignment, and I was able to finish it in just a few hours, in so few lines of code. It's really simple obviously, but I liked how sleek / organized I was able to make game.js.`
  },
  { name: 'Lord of the Rings Trivia Game',
    gitHubName: 'TriviaGame',
    repo: "https://github.com/Kayle7777/TriviaGame",
    pages: "https://kayle7777.github.io/TriviaGame",
    readme: "https://raw.githubusercontent.com/Kayle7777/TriviaGame/master/README.md",
    date: "07/04/2018",
    description: `This one was alright. I wish I would have had more time to work on the looks. Though it functions good.`
  },
  { name: 'Giphy API page',
    gitHubName: 'Giphy-API-Homework',
    repo: "https://github.com/Kayle7777/Giphy-API-Homework",
    pages: "https://kayle7777.github.io/Giphy-API-Homework",
    readme: "https://raw.githubusercontent.com/Kayle7777/Giphy-API-Homework/master/README.md",
    date: "07/14/2018",
    description: `This was one of my first dips into ajax type stuff, it worked out alright! The code seemed efficient to me.`
  },
  { name: 'Train Schedules',
    gitHubName: 'trainSchedulesHomework',
    repo: "https://github.com/Kayle7777/trainSchedulesHomework",
    pages: "https://kayle7777.github.io/trainSchedulesHomework",
    readme: "https://raw.githubusercontent.com/Kayle7777/trainSchedulesHomework/master/README.md",
    date: "07/17/2018",
    description: `I quite liked my use of a while loop with modulars in this one. This one was more bootstrap heavy.`
  },
  { name: 'Spotify Soundtrack Builder',
    gitHubName: 'Project-1-BootCamp',
    repo: "https://github.com/PROJECT-1-HACKERS/Project-1-BootCamp",
    pages: "https://project-1-hackers.github.io/Project-1-BootCamp",
    readme: "https://raw.githubusercontent.com/PROJECT-1-HACKERS/Project-1-BootCamp/master/README.md",
    date: "07/28/2018",
    description: `Now this one was pretty sweet. This is an app which will build you a playlist of a movie's soundtrack on your spotify account. This was especially difficult, because no movie database API has any information on soundtracks -- so I had to scrape IMDb/soundtrack pages for the info. This was neat, I had to learn a bit of RegEx and async / await stuff to get it to work. Very proud of all of this code. While this is technically a group project, let me offer an <a href="https://github.com/PROJECT-1-HACKERS/Project-1-BootCamp/graphs/contributors">insight</a> into who coded the mass majority of this app.`
  }
]


async function getReadmes() {
  let promises = [];
  for (var i = 0; i < gitHubRepos.length; i++) {
    promises.push($.get({
      url: gitHubRepos[i].readme,
      dataType: "html"
    }))
  }
  let result = await Promise.all(promises);
  return result;
}

// async function pageBuild() {
//   let readMes = await getReadmes();
//   for (var i = 0, r = 0, row = $("<div class='row justify-content-between'>"); i < gitHubRepos.length; i++, r++) {
//     console.log(gitHubRepos[i].pages);
//     if (r == 3) {
//       $("#mainBody").append(row);
//       row = $("<div class='row justify-content-between'>");
//       r = 0;
//     }
//     row.prepend(`
//       <div class="col-4">
//         <div class="card border-0">
//           <div class="card-header bg-white h5">${gitHubRepos[i].name}</div>
//           <div class="card-body">
//             <ul class="list-group list-group-flush">
//               <li class="list-group-item"><a target="_blank" href=${gitHubRepos[i].repo}>Github Repo</a></li>
//               <li class="list-group-item"><a target="_blank" href=${gitHubRepos[i].pages}>Live Page</a></li>
//               <li class="list-group-item">${gitHubRepos[i].date}</li>
//               <li class="list-group-item">${gitHubRepos[i].description}</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     `);
//     if (i == gitHubRepos.length - 1) {
//       $("#mainBody").prepend(row);
//     }
//   }
// }

// pageBuild();
