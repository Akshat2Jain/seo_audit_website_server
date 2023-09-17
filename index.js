const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

// config
require("dotenv").config();
const app = express();
const port = 5000;

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// post request for audit

app.post("/api/audit_url", async (req, res) => {
    try {
        const { url } = req.body;
        const response = await axios.post(
            "https://api.dataforseo.com/v3/on_page/task_post",
            [
                {
                    target: url,
                    max_crawl_pages: 10,
                    load_resources: true,
                    enable_javascript: true,
                    enable_browser_rendering: true,
                    custom_js: "meta = {}; meta.url = document.URL; meta;",
                    tag: "some_string_123",
                },
            ],
            {
                auth: {
                    username: "jainakshat423@gmail.com",
                    password: "f507ef0e4a3d29ef",
                },
            }
        );
        const id = response.data.tasks[0].id;
        res.send({
            success: true,
            message: "Audit Successfull",
            data: response.data,
            id: id,
        });
    } catch (error) {
        console.log(error);
    }
});

// Listening on port number 5000
app.listen(port, () => {
    console.log(`server is running on the port number ${port}`);
});
