//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
};

const Article = new mongoose.model("Article", articleSchema);

const doc = {
    title: "wikipedia",
    content: "WikiContent WikiContent WikiContent WikiContent "
}
// Article.create(doc);


app.route("/articles").get(function (req, res) {
    try {
     Article.find().then(function(result){
        if (result.length === 0) {
            res.send("Nothing to Show! Please insert first..");
        } else {
            res.send(result)
        }
     })
    } catch (error) {
     res.send(error.message);
    }
 }).post(function(req, res){
    try {
        const postman = {
            title: req.body.title,
            content: req.body.content
        }
        Article.create(postman);

        res.send("Your data has been saved successfully!")

    } catch (error) {
       res.send(error.message)
    }
}).delete(function(req, res){
    try {
        Article.deleteMany({title: "ethan"}).then(function(result){
            if (result.deletedCount === 0) {
                res.send("No item deleted yet!");
            } else {
                res.send("You have deleted : " + result.deletedCount + " item")
            }
        })
    
    } catch (error) {
        console.log(error.message);
    }
});

app.route("/articles/:titleArticle")

.get (function(req, res){
    try {
        Article.findOne({title: req.params.titleArticle}).then(foundTitles => {
            if (foundTitles) {
                res.send(foundTitles)
            } else {
                res.send("No title found")
            }
        })
    } catch (error) {
        res.send(error.message)
    }
})

.patch(function(req, res){
    try {
        Article.updateOne({title: req.params.titleArticle}, {$set: req.body})
        .then(function(result){
            if (result.matchedCount === 0) {
                res.send("Nothing found to be updated")
            } else {
                res.send("Undated Successfully")
            }
        })      
    } catch (error) {
        res.send(error.message)
    }
})

.delete(function(req, res){
    try {
        Article.deleteOne({title: req.params.titleArticle})
        .then(function(result){
            console.log(result);
            res.send(result)
        })
        
    } catch (error) {
        res.send(error.message)
    }
});



app.listen(3000, function(){
    console.log('Server started on port : 3000');
});