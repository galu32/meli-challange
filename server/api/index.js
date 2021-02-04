module.exports = (server) => {

    const {API_URL} = require("../constants");

    const {getJSONHeader, getCategories, safeGet, getSearchJSON, getFullItemJSON} = require("../utils");

    server.get("/api/items/:id/category", async (req, res) => {
        const {getItem, getCategory, setCategory} = require("../cachemanager");
        let r = {
            ok: true,
            data: {
                ...getJSONHeader(),
                categories: []
            },
            err: null,
        };
        let item = getItem(req.params.id);
        if (!item) {
            /*lo ideal seria aprovechar el request para cachear el item*/
            res.status(200).send(r);
        }
        let category = getCategory(item.id);
        if (!category){
            /*significa que no paso por el search, la busco en el api*/
            let {ok, data, err} = await safeGet(`${API_URL}/categories/${item.category_id}`);
            if (ok) setCategory(data.id, data.path_from_root);
            else
                throw err;

            category = data.path_from_root;

        }
        r.data.categories = getCategories(category, true);
        res.status(200).send(r);
    });

    server.get("/api/items", async (req,res) => {
        let {ok, data, err} = await safeGet(`${API_URL}/sites/MLA/search?q=${req.query.q}&limit=4`);
        if (!ok) {
            return res.status(500).send({
                ok,
                data,
                err: "Internal Error"
                /*JSON.stringify(err)*/
            });
        }

        let categories = data.filters.find(c => c.id === "category");
        if (categories && categories.values.length){
            let {setCategory} = require("../cachemanager");
            for (let c of categories.values){
                setCategory(c.id, c.path_from_root);
            }
        }

        res.status(200).send({
            ok,
            data: {
                ...getJSONHeader(),
                ...getSearchJSON(data)
            },
            err
        });
    });

    server.get("/api/items/:id", async (req,res) => {
        const {setItem, getItem, serveItemFromCache} = require("../cachemanager");
        let item = getItem(req.params.id);
        if (!item){
            let {ok, data, err} = await safeGet(`${API_URL}/items/${req.params.id}`);
            setItem(req.params.id, data);
            if (!ok) {
                return res.status(500).send({
                    ok,
                    data,
                    err: "Internal Error"
                    /*JSON.stringify(err)*/
                });
            }
            item = {
                ...getJSONHeader(),
                ...(await getFullItemJSON(data))
            };
            res.status(200).send({
                ok,
                data:{
                    ...item
                },
                err
            });
        } else {
            serveItemFromCache(res,{
                ...getJSONHeader(),
                ...(await getFullItemJSON(item))
            });
        }

    });

};