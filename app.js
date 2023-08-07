//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const { isDate } = require('util/types');
const { Schema } = mongoose;

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", {
    useNewUrlParser: true
});

const items = new Schema ({
    title: String,
    content: String,
    created: Date
});

const Article = mongoose.model('Article', items);

const item = {
    title: "Wiki Database",
    content: "Wiki Database content is here for you",
    created: new Date()
}


Article.create(item);

app.listen(3000, function(){
    console.log('Server started on port : 3000');
});