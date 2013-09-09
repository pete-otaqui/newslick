var express = require('express');
var app = express();
var Q = require('q');

var stories = [
    {
        "title": "Loading",
        "body": "Loading Data",
        "href": "#"
    }
];
var feeds = ['bbc'];


function loadFeed(feed) {
    var feed_lib = require('./feeds/' + feed + '.js');
    return feed_lib.load(feed);
}

function loadFeeds() {
    var feed_map = feeds.map(loadFeed);
    return Q.all(feed_map);
}


app.use(express.static('public'));


app.get('/', function(req, res) {
    res.render('index.ejs', {"stories": stories});
});

loadFeeds()
    .then(function(data) {
        var s = [];
        data.forEach(function(feed, index) {
            if ( index > 3 ) return;
            s = s.concat(feed.stories);
        });
        console.log('s', s.length);
        stories = s;
    });

app.listen(3000, '0.0.0.0');