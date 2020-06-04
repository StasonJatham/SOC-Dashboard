let Parser = require("rss-parser");
let parser = new Parser();
const router = require("express").Router();
const RSSdata = require("../models/rssdata");



router.get("/feed", async (req, res) => {
    try {
        var todaysDate = new Date;
        var twoDaysAgo = new Date(todaysDate.setDate(todaysDate.getDate() - 2)).toISOString();
        let data = await RSSdata.find({"isoDate" : { $gte : twoDaysAgo}}).sort( { isoDate: -1 } ).limit(150);
        res.json({
            success: true,
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

router.get("/feed/update", async (req, res) => {

    // https://github.com/MISP/threat-actor-intelligence-server
    try {
        rssUrls = [
            "https://www.zdnet.com/blog/security/rss.xml",
            "https://media.cert.europa.eu/rss?type=category&id=CERT-LatestNews&language=all&duplicates=false",
            "https://www.us-cert.gov/ncas/alerts.xml",
            "https://www.zerodayinitiative.com/rss/upcoming/",
            "https://www.zerodayinitiative.com/rss/published/",
            "https://www.cert-bund.de/feed/advisoryshort.rdf",
            "https://www.cert-bund.de/feed/freetextmessage.rdf",
            "https://www.bsi-fuer-buerger.de/SiteGlobals/Functions/RSSFeed/RSSNewsfessBSIFB/RSSNewsfeed_BuergerCERT.xml",
            "https://www.bsi.bund.de/SiteGlobals/Functions/RSSFeed/RSSNewsfeed/RSSNewsfeed_WID.xml",
            "https://www.bsi.bund.de/SiteGlobals/Functions/RSSFeed/RSSNewsfessBSIFB/RSSNewsfeed_BuergerCERT.xml",
            "https://www.heise.de/security/rss/alert-news-atom.xml",
        ]

        rssUrls.forEach(url => {
            parser.parseURL(url)
            .then((feed) => {
                feed.items.forEach(item => {
                    let rssdata = new RSSdata();
                    rssdata.title = item.title
                    rssdata.link = item.link
                    rssdata.pubDate = item.pubDate
                    rssdata.creator = item.creator
                    rssdata.content = item.content
                    rssdata.contentSnippet = item.contentSnippet
                    rssdata.guid = item.guid
                    rssdata.categories = item.categories
                    rssdata.isoDate = item.isoDate
                    rssdata.id = item.id
                    rssdata.save().catch((error) => {
                        console.log("Value already in Collection.")
                    });
                });
                console.log(new Date())
            })
            .catch((error) => {
                console.log(error);
            });
        });

        res.json({
            success: true,
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

router.get("/feedchart", async (req, res) => {
    try {
        var todaysDate = new Date;
        var twoDaysAgo = new Date(todaysDate.setDate(todaysDate.getDate() - 7)).toISOString();
        let data = await RSSdata.find({
            "isoDate": {
                $gte: twoDaysAgo
            }
        }).sort({
            isoDate: 1
        })

        var sortingValue = []
        data.forEach((item) => {
            var theDate = new Date(item.isoDate)
            sortingValue.push(theDate.getMonth() + '/' + theDate.getDate() + '/' + theDate.getFullYear())
        })

        var counts = {};
        sortingValue.forEach(function (x) {
            counts[x] = (counts[x] || 0) + 1;
        });

        res.json({
            success: true,
            data: counts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;
