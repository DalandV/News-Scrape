var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index");
  });
  app.get("/scrape", function(req, res) {
    axios.get("https://www.npr.org/sections/news/").then(function(response) {
      db.Article.remove({}, function(err) {
        console.log("collection removed");
      })
        .then(function() {
          var $ = cheerio.load(response.data);
          $("h2.title").each(function(i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
              .children("a")
              .text();
            result.link = $(this)
              .children("a")
              .attr("href");
            console.log(result);
            db.Article.create(result)
              .then(function(dbArticle) {
                // View the added result in the console
                console.log(dbArticle);
              })
              .catch(function(err) {
                // If an error occurred, send it to the client
                return res.json(err);
              });
          });
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
      res.send("Scrape Complete");
    });
  });
};
