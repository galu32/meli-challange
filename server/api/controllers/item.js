const {getJSONHeader, getCategories, safeGet, getSearchJSON, getFullItemJSON} = require("../../utils");
const {getItem, getCategory, setCategory, serveItemFromCache, setItem} = require("../../cachemanager");
const {API_URL} = require("../../constants");

let itemController = async (req,res) => {
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
};

let itemsController = async (req,res) => {
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
};

let itemCategoryController = async (req, res) => {
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
        return res.status(200).send(r);
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
};

module.exports = {
    itemCategoryController,
    itemsController,
    itemController
};