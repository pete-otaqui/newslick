var http = require('http');
var Q = require('q');


var stories = [];



module.exports = {
    load: function() {
        var deferred = Q.defer();
        http.get('http://api.bbcnews.appengine.co.uk/stories/headlines', function(res) {
            var body = '';

            res.on('data', function(chunk) {
                // console.log('chunk', chunk);
                body += chunk;
            });

            res.on('end', function() {
                var data = JSON.parse(body);
                var response = {
                    "stories": data.stories.map(function(story) {
                        var obj = {
                            title: story.title,
                            body: story.description,
                            href: story.link,
                            image: story.thumbnail
                        };
                        // console.log(obj);
                        return obj;
                    })
                };
                deferred.resolve(response);
            });
            
        });
        return deferred.promise;
    }
};
