//home page - needs contact details partial, google map(done), logo, neon sign graphic(potentially gif or animated), nav bar, header,background image(possibley set in css)
exports.home = function(req,res){
    res.render('home',{
        "title":"Home",
        "activelink": 1
    });
};