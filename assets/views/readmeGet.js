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
    const gitHubRepos = await $.get('/api/readmes');
    gitHubRepos.forEach(e=>{
        let newTabContent = $(`<div class="tab-pane" id="list-${e.gitHubName}" role="tabpanel" aria-labelledby="list-${e.gitHubName}-list"></div>`);
        $("#nav-tabContent").prepend(newTabContent);
    });
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
    $(this).parent().children().removeClass('list-group-item-animate');
    $(this).addClass('list-group-item-animate');
});
