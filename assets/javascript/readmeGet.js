const gitHubRepos = [
    {
        name: 'Word Guess Game',
        gitHubName: 'Word-Guess-Game',
        repo: "https://github.com/Kayle7777/Word-Guess-Game",
        pages: "https://kayle7777.github.io/Word-Guess-Game",
        readme: "https://raw.githubusercontent.com/Kayle7777/Word-Guess-Game/master/README.md",
        date: "06/21/2018",
        description: `This one was fun. Just a standard hangman game in Javascript. I would re-do it now in a slightly different way, but all together I liked how it was hard-ish to break. And it works ok!`
    },
    {
        name: 'Unit 4 Crystal Game',
        gitHubName: 'unit-4-game',
        repo: "https://github.com/Kayle7777/unit-4-game",
        pages: "https://kayle7777.github.io/unit-4-game",
        readme: "https://raw.githubusercontent.com/Kayle7777/unit-4-game/master/README.md",
        date: "06/26/2018",
        description: `I quite enjoyed this one.  This was a jQuery heavy assignment, and I was able to finish it in just a few hours, in so few lines of code. It's really simple obviously, but I liked how sleek / organized I was able to make game.js.`
    },
    {
        name: 'Lord of the Rings Trivia Game',
        gitHubName: 'TriviaGame',
        repo: "https://github.com/Kayle7777/TriviaGame",
        pages: "https://kayle7777.github.io/TriviaGame",
        readme: "https://raw.githubusercontent.com/Kayle7777/TriviaGame/master/README.md",
        date: "07/04/2018",
        description: `This one was alright. I wish I would have had more time to work on the looks. Though it functions good.`
    },
    {
        name: 'Giphy API page',
        gitHubName: 'Giphy-API-Homework',
        repo: "https://github.com/Kayle7777/Giphy-API-Homework",
        pages: "https://kayle7777.github.io/Giphy-API-Homework",
        readme: "https://raw.githubusercontent.com/Kayle7777/Giphy-API-Homework/master/README.md",
        date: "07/14/2018",
        description: `This was one of my first dips into ajax type stuff, it worked out alright! The code seemed efficient to me.`
    },
    {
        name: 'Train Schedules',
        gitHubName: 'trainSchedulesHomework',
        repo: "https://github.com/Kayle7777/trainSchedulesHomework",
        pages: "https://kayle7777.github.io/trainSchedulesHomework",
        readme: "https://raw.githubusercontent.com/Kayle7777/trainSchedulesHomework/master/README.md",
        date: "07/17/2018",
        description: `I quite liked my use of a while loop with modulars in this one. This one was more bootstrap heavy.`
    },
    {
        name: 'Spotify Soundtrack Builder',
        gitHubName: 'Project-1-BootCamp',
        repo: "https://github.com/Kayle7777/Project-1-BootCamp-1",
        pages: "https://kayle7777.github.io/Project-1-BootCamp-1",
        readme: "https://raw.githubusercontent.com/Kayle7777/Project-1-BootCamp-1/master/README.md",
        date: "07/28/2018",
        description: `Now this one was pretty sweet. This is an app which will build you a playlist of a movie's soundtrack on your spotify account. This was especially difficult, because no movie database API has any information on soundtracks -- so I had to scrape IMDb/soundtrack pages for the info. This was neat, I had to learn a bit of RegEx and async / await stuff to get it to work. Very proud of all of this code. While this is technically a group project, let me offer an <a href="https://github.com/Kayle7777/Project-1-BootCamp-1/graphs/contributors">insight</a> into who coded the mass majority of this app.`
    },
    {
        name: 'LIRI Node app',
        gitHubName: 'liri-node-app',
        repo: "https://github.com/Kayle7777/liri-node-app",
        pages: null,
        readme: "https://raw.githubusercontent.com/Kayle7777/liri-node-app/master/README.md",
        date: "08/05/2018",
        description: ``
    },
    {
        name: 'Node CLI Word Guess',
        gitHubName: 'Word-Guess-Cli',
        repo: "https://github.com/Kayle7777/Word-Guess-Cli",
        pages: null,
        readme: "https://raw.githubusercontent.com/Kayle7777/Word-Guess-Cli/master/README.md",
        date: "08/14/2018",
        description: ``
    },
    {
        name: 'Node / MySQL Database Manipulator',
        gitHubName: 'Node-and-MySQL',
        repo: "https://github.com/Kayle7777/Node-and-MySQL",
        pages: null,
        readme: "https://raw.githubusercontent.com/Kayle7777/Node-and-MySQL/master/README.md",
        date: "08/26/2018",
        description: ``
    },
    {
        name: 'Express Server Demo',
        gitHubName: 'express-friendFinder',
        repo: "https://github.com/Kayle7777/express-friendFinder",
        pages: null,
        readme: "https://raw.githubusercontent.com/Kayle7777/express-friendFinder/master/README.md",
        date: "08/31/2018",
        description: ``
    }
]

$(document).ready(function() {
    gitHubRepos.forEach(e=>{
        let newTabContent = $(`<div class="tab-pane" id="list-${e.gitHubName}" role="tabpanel" aria-labelledby="list-${e.gitHubName}-list"></div>`);
        $("#nav-tabContent").prepend(newTabContent);
    });
});

async function getReadmes(arg) {
    const promises = arg.map(e=>{
        return $.get({
            url: e,
            dataType: "html"
        });
    });
    return await Promise.all(promises);
};

$(document).ready(async function() {
    const converter = new showdown.Converter();
    const gitHubRepoNames = gitHubRepos.map(e=>e.gitHubName)
    const readmes = gitHubRepos.map(e=>e.readme);
    let readmeMD;
    if (sessionStorage.getItem("JWreadmeMDs") === null) {
        readmeMD = await getReadmes(readmes);
        sessionStorage.setItem("JWreadmeMDs", JSON.stringify(readmeMD));
    } else {
        readmeMD = JSON.parse(sessionStorage.getItem("JWreadmeMDs"));
    };

    const readmeHTML = readmeMD.map(mrkdwnValue=>converter.makeHtml(mrkdwnValue));
    gitHubRepoNames.forEach((e,i)=>{
        $(`#list-${e}`).append(
            `<div class="card border border-rounded border-secondary">
            <div class="card-body bg-secondary text-light">
            ${readmeHTML[i]}
            </div>
            </div>`
        )
    });
});

$(".list-group-item").click(function() {
    buttons = $(this).parent().children().removeClass('list-group-item-animate');
    $(this).addClass('list-group-item-animate');
});
