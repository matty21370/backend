const express = require('express');
const app = express();
const mongoose = require('mongoose');
const axios = require('axios').default;

const Article = require('./model/article');

require('dotenv').config();

var options = {
    method: 'GET',
    url: 'https://api.newscatcherapi.com/v2/search',
    params: {lang: 'en', sort_by: 'relevancy', topic: 'news', q: 'e', page_size: '100', page: '1'},
    headers: {
        'x-api-key': process.env.NEWSCATCHER_KEY
    }
}

mongoose.connect(process.env.DB_CONNECT, () => {
    console.log("Connected to database");
});

function updateArticles() {
    Article.remove({}, (err) => {
        console.log(err);
    })

    fetchFromAPI();
}

var i = 1;

function fetchFromAPI() {
    setTimeout(function() {
        console.log("Running");
        options.params.page = i.toString();

        axios.request(options).then(function(res) {
            res.data.articles.forEach(element => {
                const a = new Article({
                    country: element.country,
                    title: element.title,
                    author: element.author,
                    image: element.media,
                    topic: element.topic,
                    summary: element.summary,
                    excerpt: element.excerpt
                });
                a.save();
            });
        }).catch(function(err) {
            console.error(err);
        });
        i++;
        if(i < 5) {
            fetchFromAPI();
        }
    }, 1000);
}

//updateArticles();

const authRoute = require('./router/auth');
const mainRoute = require('./router/main');

app.use(express.json());

app.use('/main', mainRoute);
app.use('/api', authRoute);


app.listen(3000, () => {
    console.log("Server running");
})