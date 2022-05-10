exports.main = function(req,res){
    res.render('menus',{
        "title":"Menus",
        "activelink": 2
    });
};