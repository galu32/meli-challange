/* global describe, it, before, after */
import {initPromise} from "../index.js";

import axios from "axios";

import assert from "assert";

import {webserver} from "../config";

const API_URL = `http://${webserver.api_url}:${webserver.port}/`;

// let sleep = (ms) => {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

let started = false;

before((done) => {
    initPromise.then(() => {
        started = true; 
        axios.get(API_URL)
            .then(() => done());
        //no estoy seguro si es la mejor alternativa, pero necesito que se compile el home,
        //para cuando llega al test del cache manager ya este compilado y cacheado
    });
});

describe("server test", function(){

    it("Starts server wihtout crashing", () => {
        assert.strictEqual(started, true);
    });

});

describe("/api test \n", function(){

    let response = null;
    let item = null;

    describe("/api/items/?q=: test", () => {

        it("get data from api", (done) => {
            axios.get(`${API_URL}api/items/?q=celulares`)
                .then(res => {
                    response = res;
                    let {ok} = res.data;
                    assert.strictEqual(ok, true);
                    done();
                });
        });

        it("err should be falsy", () => {
            let {err} = response.data;
            assert.strictEqual(!!err, false);
        });

        it("get only 4 items from request", () => {
            let {data} = response.data;
            item = data.items[0];
            assert.strictEqual(data.items.length, 4);
        });

    });

    describe("/api/items/:id test", () => {

        let first_req_time = null;

        let second_req_time = null;

        it("get data from api", (done) => {
            let start_time = new Date().getTime();
            axios.get(`${API_URL}api/items/${item.id}`)
                .then(res => {
                    first_req_time = new Date().getTime() - start_time;
                    response = res;
                    let {ok} = res.data;
                    assert.strictEqual(ok, true);
                    done();
                });
        });

        it("get data from api when item is in cache", (done) => {
            let start_time = new Date().getTime();
            axios.get(`${API_URL}api/items/${item.id}`)
                .then(res => {
                    second_req_time = new Date().getTime() - start_time;
                    response = res;
                    let {ok} = res.data;
                    assert.strictEqual(ok, true);
                    done();
                });
        });

        it("measure req time when item is in cache", () => {
            assert.strictEqual(second_req_time < first_req_time, true);
        });

        it("err should be falsy", () => {
            let {err} = response.data;
            assert.strictEqual(!!err, false);
        });

        it("item should be cached", () => {
            const {hasItem} = require("./cachemanager");
            assert.strictEqual(hasItem(item.id), true);
        });

    });

    describe("/api/items/:id/category test", () => {

        it("get data from api", (done) => {
            axios.get(`${API_URL}api/items/${item.id}/category`)
                .then(res => {
                    response = res;
                    let {ok} = res.data;
                    assert.strictEqual(ok, true);
                    done();
                });
        });

        it("err should be falsy", () => {
            let {err} = response.data;
            assert.strictEqual(!!err, false);
        });

        it("categories should have length", () => {
            let {data} = response.data;
            assert.strictEqual(data.categories.length > 0 , true);
        });

    });

});

describe("cachemanager test", function(){

    let {getKeys, delKey} = require("./cachemanager");

    it("first static page request should be cache enabled", (done) => {
        axios.get(API_URL)
            .then(res => {
                let disabled = res.headers["x-cache"] === "enabled";
                assert.strictEqual(disabled , true);
                done();
            });
    });

    it("after request static page should be in cache", () => {
        let res = getKeys().includes("/");
        assert.strictEqual(res, true);
    });

    it("delete static page from cache", () => {
        let res = delKey("/");
        assert.strictEqual(res, true);
    });

    it("after delete static page from cache header should be disabled", (done) => {
        axios.get(API_URL)
            .then(res => {
                let disabled = res.headers["x-cache"] === "disabled";
                assert.strictEqual(disabled , true);
                done();
            });
    });

});

after(() => process.exit(0));