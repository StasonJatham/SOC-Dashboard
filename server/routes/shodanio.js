const client = require("shodan-client");
const router = require("express").Router();

router.get("/shodan", async (req, res) => {

  var shodanKey = await process.env.SHODAN
  try {
    client.search(req.query.target, shodanKey).then((resp) => {
      res.json({
        success: true,
        data: resp,
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
