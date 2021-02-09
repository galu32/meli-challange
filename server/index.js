const express = require("express");
const next = require("next");
const cfg = require("../config");
const {port, devMode} = cfg.webserver;

const app = next({ dev: devMode, dir: "./src" });
const handle = app.getRequestHandler();
const {renderFromCache} = require("./cachemanager");

const serverPromise = require("bluebird").pending();

app.prepare().then(() => {

    const server = express();
    let apiRouter = express.Router();
    server.use("/api", apiRouter);
    require("./api/")(apiRouter);

    server.get("/_next/*", (req,res) => {
        handle(req,res);
    });

    server.get("/", async (req,res) => {
        return await renderFromCache(app,req,res,req.path,{
            ...req.query,
            ...req.params,
        }, true, true);
    });

    server.get("/items/:id", async (req,res) => {
        return await renderFromCache(app,req,res,req.path,{
            ...req.query,
            ...req.params
        }, false, false);
    });

    server.get("/items", async (req,res) => {
        return await renderFromCache(app,req,res,req.path,{
            ...req.query,
            ...req.params
        }, false, false);
    });

    server.get("/404", async (req,res) => {
        return await renderFromCache(app,req,res,req.path,{
            ...req.query,
            ...req.params
        }, true, true);
    });

    server.all("*", (req,res) => handle(req,res));

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
        serverPromise.resolve(true);
    });

});

module.exports = {
    serverPromise: serverPromise.promise
};