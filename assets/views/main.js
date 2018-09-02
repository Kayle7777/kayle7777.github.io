$("#headerLinks .btn:not(.dropdown-toggle)").click(function() {
    event.preventDefault();
    $("#headerLinks").children().removeClass("active");
    switch ($(this).text()) {
        case 'Projects':
        {
            $.get("/projects");
        }
        case 'Contact':
        {
            $.get("/contact");
        }
        case 'Home':
        {
            $.get("/");
        }
    };
    const redir = $(this).text()=='Home'?'/':'/' + $(this).text().toLowerCase();
    window.location.href = window.location.origin + redir;
});
