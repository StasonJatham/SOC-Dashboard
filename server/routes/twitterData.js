const Twitter = require("twitter");
const router = require("express").Router();
const TwitterData = require("../models/twitterData");
const client = new Twitter({
    consumer_key:        process.env.consumer_key,
    consumer_secret:     process.env.consumer_secret,
    access_token_key:    process.env.access_token_key,
    access_token_secret: process.env.access_token_secret,
});


router.get("/twitter", async (req, res) => {
    try {
        var todaysDate = new Date;
        var twoDaysAgo = new Date(todaysDate.setDate(todaysDate.getDate() - 2))
        let data = await TwitterData.find({
            "created_at": {
                $gte: twoDaysAgo
            }
        }).sort({
            created_at: -1
        }).limit(50); //.populate('customer').exec();
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

router.get("/twitter/update", async (req, res) => {
    try {
        //https://twitter.com/CVEnew
        client
            .get("statuses/user_timeline", {
                screen_name: "CVEnew",
                tweet_mode: 'extended',
                exclude_replies: true,
                include_rts: false,
            })
            .then((tweet) => {
                tweet.forEach((item) => {
                    let twitt = new TwitterData();
                    twitt.created_at = item.created_at
                    twitt.username = item.user.screen_name
                    twitt.id = item.id
                    twitt.full_text = item.full_text
                    twitt.source = item.source
                    twitt.save().catch((error) => {
                        console.log("Value already in Collection.")
                    })
                });
                console.log(new Date())
            })
            .catch((error) => {
                console.log(error);
            });

        // https://twitter.com/certbund
        client
            .get("statuses/user_timeline", {
                screen_name: "certbund",
                tweet_mode: 'extended',
                exclude_replies: true,
                include_rts: false,
            })
            .then((tweet) => {
                tweet.forEach((item) => {
                    let twitt = new TwitterData();
                    twitt.created_at = item.created_at
                    twitt.username = item.user.screen_name
                    twitt.id = item.id
                    twitt.full_text = item.full_text
                    twitt.source = item.source
                    twitt.save().catch((error) => {
                        console.log("Value already in Collection.")
                    })
                });
            })
            .catch((error) => {
                console.log(error);
            });

        // https://twitter.com/CERTEU
        client
            .get("statuses/user_timeline", {
                screen_name: "CERTEU",
                tweet_mode: 'extended',
                exclude_replies: true,
                include_rts: false,
            })
            .then((tweet) => {
                tweet.forEach((item) => {
                    let twitt = new TwitterData();
                    twitt.created_at = item.created_at
                    twitt.username = item.user.screen_name
                    twitt.id = item.id
                    twitt.full_text = item.full_text
                    twitt.source = item.source
                    twitt.save().catch((error) => {
                        console.log("Value already in Collection.")
                    })
                });
            })
            .catch((error) => {
                console.log(error);
            });

        // https://twitter.com/abuse_ch
        client
            .get("statuses/user_timeline", {
                screen_name: "abuse_ch",
                tweet_mode: 'extended',
                exclude_replies: true,
                include_rts: false,
            })
            .then((tweet) => {
                tweet.forEach((item) => {
                    let twitt = new TwitterData();
                    twitt.created_at = item.created_at
                    twitt.username = item.user.screen_name
                    twitt.id = item.id
                    twitt.full_text = item.full_text
                    twitt.source = item.source
                    twitt.save().catch((error) => {
                        console.log("Value already in Collection.")
                    })
                });
            })
            .catch((error) => {
                console.log(error);
            });

        // https://twitter.com/abuse_ch
        client
            .get("statuses/user_timeline", {
                screen_name: "abuse_ch",
                tweet_mode: 'extended',
                exclude_replies: true,
                include_rts: false,
            })
            .then((tweet) => {
                tweet.forEach((item) => {
                    let twitt = new TwitterData();
                    twitt.created_at = item.created_at
                    twitt.username = item.user.screen_name
                    twitt.id = item.id
                    twitt.full_text = item.full_text
                    twitt.source = item.source
                    twitt.save().catch((error) => {
                        console.log("Value already in Collection.")
                    })
                });
            })
            .catch((error) => {
                console.log(error);
            });

        /*
        // https://twitter.com/leak_scavenger
        client
            .get("statuses/user_timeline", {
                screen_name: "leak_scavenger",
                tweet_mode: 'extended',
                exclude_replies: true,
                include_rts: false,
            })
            .then((tweet) => {
                tweet.forEach((item) => {
                    let twitt = new TwitterData();
                    twitt.created_at = item.created_at
                    twitt.username = item.user.screen_name
                    twitt.id = item.id
                    twitt.full_text = item.full_text
                    twitt.source = item.source
                    twitt.save().catch((error) => {
                        console.log("Value already in Collection.")
                    })
                });
            })
            .catch((error) => {
                console.log(error);
            });
        */

        client
            .get("statuses/user_timeline", {
                screen_name: "haveibeenpwned",
                tweet_mode: 'extended',
                exclude_replies: true,
                include_rts: false,
            })
            .then((tweet) => {
                tweet.forEach((item) => {
                    let twitt = new TwitterData();
                    twitt.created_at = item.created_at
                    twitt.username = item.user.screen_name
                    twitt.id = item.id
                    twitt.full_text = item.full_text
                    twitt.source = item.source
                    twitt.save().catch((error) => {
                        console.log("Value already in Collection.")
                    })
                });
            })
            .catch((error) => {
                console.log(error);
            });


        client
            .get("statuses/user_timeline", {
                screen_name: "exploitdb",
                tweet_mode: 'extended',
                exclude_replies: true,
                include_rts: false,
            })
            .then((tweet) => {
                tweet.forEach((item) => {
                    let twitt = new TwitterData();
                    twitt.created_at = item.created_at
                    twitt.username = item.user.screen_name
                    twitt.id = item.id
                    twitt.full_text = item.full_text
                    twitt.source = item.source
                    twitt.save().catch((error) => {
                        console.log("Value already in Collection.")
                    })
                });
            })
            .catch((error) => {
                console.log(error);
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


router.get("/twitterchart", async (req, res) => {
    try {
        var todaysDate = new Date;
        var twoDaysAgo = new Date(todaysDate.setDate(todaysDate.getDate() - 7))
        let data = await TwitterData.find({
            "created_at": {
                $gte: twoDaysAgo
            }
        }).sort({
            created_at: 1
        })

        var sortingValue = []
        data.forEach((item) => {
            sortingValue.push(item.created_at.getMonth() + '/' + item.created_at.getDate() + '/' + item.created_at.getFullYear())
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