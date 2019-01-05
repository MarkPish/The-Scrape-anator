//Scrape script

// Must use axios and cheerio for scraping
var axios = require("axios");
var cheerio = require("cheerio");

//Function that scrapes the NYT website
var scrape = function() {
    //Scrape website here
    return axios.get("http://www.nytimes.com").then(function(res) {
        var $ = cheerio.load(res.data);
        //create empty array to save article info
        var articles = [];

        //Find and loop thru each element that has the "theme-summary" class
                $(".theme-summary").each(function(i, element) {
            //in each .theme-summary, we grab the child with the class story-heading
            //then we grab the inner text of this element and store it
            //to the head variable...the article headline...ta da!
            var head = $(this)
                .children(".story-heading")
                .text()
                .trim();
            
            // Grab the URL of the article
            var url = $(this)
            .children(".story-heading")
            .children("a")
            .attr("href");

            // Then we grab any children with the class of summary and then grab it's inner text
            // we store this to the sum variable. This is the article summary
            var sum = $(this)
            .children(".summary")
            .text()
            .trim();

            // As long as our headline, sum and url aren't empty or undefined, do the following:
            if (head && sum && url) {
                //This section uses regular expressions and the trim function to clean up our headlines
                //and summaries. We are removing extra lines, extra spacing, extra tabs, etc...to improve
                //the view
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                //initialize an object we will push to the articles array

                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat,
                    url: url
                };

                articles.push(dataToAdd);
            }
        });
        return articles;
    });
};

//Export the function, so other files in the backend can use it
module.exports = scrape;