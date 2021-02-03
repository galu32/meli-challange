const express = require("express");
const next = require("next");

const cfg = require("../config");

const {port, production} = cfg.webserver;

const app = next({ dev: production, dir: "./src" });
const handle = app.getRequestHandler();

app.prepare().then(() => {

    const server = express();

    require("./api.es6")(server);

    server.all("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });

});