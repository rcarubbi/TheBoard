(function (data) {
    var seedData = require("./seedData");
    var database = require("./database");
    data.getNotesCategories = function (next) {
        database.getDb(function(err, db) {
            if (err) {
                next(err, null);
            } else {
                //   db.notes.find({name: "People"}).toArray(function(err, results) {
                //   db.notes.find({notes: {$size: 2} }).toArray(function(err, results) {
                //   db.notes.find({notes: {$not : {$size: 2} }}).toArray(function(err, results) {
                //   db.notes.find().sort({name: -1}).toArray(function(err, results) {
                db.notes.find().sort({name: 1}).toArray(function(err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
            }
        });
    };

    data.createNewCategory  = function (categoryName, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                var cat = {
                    name: categoryName,
                    notes: []
                };
                db.notes.insert(cat, function (err) {
                    if (err) {
                        next(err);
                    } else {
                        next(null);
                    }
                });
            }
        });
    };

    function seedDatabase() {
        database.getDb(function(err, db){
            if (err) {
                console.log("Failed to seed database: " + err);
            } else {
                
                db.notes.count(function(err, count) {
                    if (err) {
                        console.log("Failed to retrieve database count");
                    } else {
                        if (count == 0) {
                            console.log("Seeding the database...");
                            seedData.initialNotes.forEach(function (item) {
                                db.notes.insert(item, function (err) {
                                    if (err) console.log("Failed to insert note into database");
                                });
                            });
                        } else {
                            console.log("Database already seeded");
                        }    
                    }
                }); 
            }
        });



    }
 
    seedDatabase();
})(module.exports);