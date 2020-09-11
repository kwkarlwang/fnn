# FNN News
## Overview
FNN is a News site that collects and compares the top headlines from Fox News and CNN. It fetches the current headlines of Fox News and CNN every single hour.<br/>
<br/>
Check out a deploy version <a href="https://fnn-news.herokuapp.com">here</a>

## Technology
- **M**ongoDB
- **E**xpress
- **R**eact
- **N**ode.js
- MaterializeCSS
- NewsAPI

## Commands
To run the development project, change `.env_sample` to `.env` and populates your own MongoDB URI (I used MongoDB Atlas) and your own <a href="https://newsapi.org">NewsAPI</a> key in `.env`.

`npm run dev` to start the both the server and the client project. <br/>
`npm run start` to start the server only. <br/>
`npm run client` to start the client only. 
