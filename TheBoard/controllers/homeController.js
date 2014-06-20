(function (homeController) {
    var data = require("../data");
    homeController.init = function(app) {
        app.get("/", function (req, res) {
            // res.send("<html><body><h1>" + req.url + "</h1></body></html>");
            //res.render("jade/index", { title: "Express + Jade" });
            //res.render("ejs/index", { title: "Express + Ejs" }); 

            data.getNotesCategories(function (err, results){
                 res.render("index", { title: "The board", error: err, categories: results }); 
            });
           
        });

        app.post("/newCategory", function (req, res) {
            var categoryName = req.body.categoryName;
            data.createNewCategory(categoryName, function (err) {
                if (err) {
                    // handle error
                    console.log(err);
                    res.redirect("/");
                } else {
                    res.redirect("/notes/" + categoryName);
                }
                
            });
        });
    };
})(module.exports);