const cfg = require("./config");
const {devMode} = cfg.webserver;

const initPromise = require("bluebird").pending();

if (!devMode){
    const fs = require("fs-extra");
    const exec = require("child_process").spawn;

    if(fs.existsSync(".next")){
        fs.rmdirSync(".next", { recursive: true });
    }

    if(fs.existsSync("./src/.next")){
        fs.rmdirSync("./src/.next", { recursive: true });
    }

    let script = exec("node", [__dirname + "/node_modules/next/dist/bin/next", "build"]);
    console.log("building production app.. please wait..");

    script.on("error", () => {
        console.log("error building app");
        process.exit(0);
    });

    script.stdout.on("data", (data) => {
        console.log(data.toString());
    });

    script.on("exit", () => {
        fs.move("./.next/", "./src/.next/", err => {
            if(err) return console.error(err);
            console.log("starting app..");
            let {serverPromise} = require("./server");
            serverPromise.then(() => {
                initPromise.resolve();
            });
        });
    });

} else {
    console.log("building dev app.. please wait..");
    let {serverPromise} = require("./server");
    serverPromise.then(() => {
        initPromise.resolve();
    });
}

module.exports = {
    initPromise: initPromise.promise
};