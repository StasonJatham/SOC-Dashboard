const express    = require('express');
const morgan     = require('morgan');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const dotenv     = require('dotenv');
const cors       = require('cors');  


dotenv.config();
const app = express();

mongoose.connect(process.env.DATABASE,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true 
},
(err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connected to MongoDB')
    }
});

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const rssRoutes = require('./routes/rssData');
const twitterRoutes = require('./routes/twitterData');
const shodanSearch = require('./routes/shodanio');
app.use("/api", rssRoutes);
app.use("/api", twitterRoutes);
app.use("/api", shodanSearch);


app.listen(4004, (err) => {
    if (err){
        console.log(err);
    } else {
        console.log("listening on port 4004");
    }
});