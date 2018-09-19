var db = require('../models');

module.exports = function(app){

  app.get("/api/users", function(req,res){
    //find all the users ;
    db.User.findAll({
      include : [{
        model : db.Shout
      }]

    }).then(function(dbUser){
      // console.log("dbUser   ", dbUser);
      res.json(dbUser);
    });
  });

  // each user has a location , which is varient and needs to be updated 

  // Get single user information with all user shouts
  app.get("/users/:id", function(req,res){
    // a join to include all of the users shouts 
    db.User.findOne({
      where : {
        id : req.params.id
      },
      include: [db.Shout]
    }).then(function(dbUser){
      // res.json(dbUser);
      res.render("myprofile", {all:dbUser});
    });
  });
  
  // //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ changed to email by andrew
  // app.get("/api/users/:email", function(req,res){
  //   // a join to include all of the users shouts 
  //   db.User.findOne({
  //     where : {
  //       email : req.params.email
  //     },
  //     include: [db.Shout]
  //       }).then(function(user){
  //     // res.json(dbUser);
  //     res.json(user);
  //   });
  // });

  app.get("/api/users/:id", function(req,res){
    // a join to include all of the users shouts 
    db.User.findOne({
      where : {
        id : req.params.id
      },
      include: [db.Shout]
    }).then(function(dbUser){
      // res.json(dbUser);
      res.json(dbUser);
    });
  });
  
  // ~~~~~~~~~~~ Upated by Andrew
  // Create new user
  app.post("/api/users/",function(req,res){
    console.log(req.body);
    //add a new user : happens in login
    console.log("A new user being added!");
    db.User.create(req.body).then(function(dbUser){
      console.log("added user");
      // sends back the id of new inserted object into data base
      console.log("dbUser   inside server  " , dbUser);
      console.log(dbUser);
      res.json(dbUser);
});
  });

  app.delete("/users/:userid", function(req,res){
    db.User.destroy({
      where : {
        id : req.params.id
      }
    }).then(function(dbUser){
      res.json(dbUser);
    });
  });
};