//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
var posts =[];
const _=require("lodash");


app.get("/", function(req , res){
 res.render("home",{content:homeStartingContent,title:"Home", posts:posts});
});


app.get("/about", function(req , res){
 res.render("about",{content:aboutContent,title:"About"});
 res.redirect("/");
});

app.get("/contact", function(req , res){
 res.render("contact",{content:contactContent,title:"Contact"});
 res.redirect("/");
});

app.get("/compose", function(req , res){
 res.render("compose",{content:contactContent,title:"Contact" });
 res.redirect("/");
});


app.post("/compose", function(req,res){

 post = {
  title:req.body.composeText,
  content : req.body.composeContent
};

posts.push(post);


res.redirect("/");


//console.log(posts);

});

app.get("/posts/:postName",function(req,res){

  const reqestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle =  _.lowerCase(post.title);
    console.log("value"+storedTitle);

    if(reqestedTitle === storedTitle)
    {
        console.log("match found");
        res.render("post",{content:post.content,title:post.title });

    }else
    {
      console.log("not a match");
    }
  });



});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
