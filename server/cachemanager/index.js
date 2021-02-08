/*
    Para que esta integración tenga mas sentido lo ideal seria usar redis / memc pero no estoy seguro si quien va
    a realizar las pruebas tiene/puede instalado/instalar.
    Adicional lo ideal seria un webhook/evento de actualización de artículos para siempre tener la información actualizada
    Ej:
    ('/item/:id/updated', (req,res) => {
        //item updated
        setItem(req.params.id, req.body.newJSON)
    })
    La intención de la integración es cubrir los puntos de performance tanto en paginas estaticas como a la hora de servir
    el mismo artículo repetidas veces.
*/
const LRUCache = require("lru-cache");

const cacheManager = new LRUCache({
    max: 100,
    maxAge: 1000 * 60 * 60 // 1hour
});

const renderFromCache = async (app, req, res, path, qs, shouldSend, shouldCache) => {
    if (!cacheManager.has(req.url) || !shouldCache){
        try {
            res.setHeader("x-cache", "disabled");
            let html = await app.renderToHTML(req, res, path, qs);
            cacheManager.set(req.url,html);
            if (shouldSend) res.send(html);
        } catch (e) {
            app.renderError(e, req, res, path, qs);
        }
    } else {
        res.setHeader("x-cache", "enabled");
        res.send(cacheManager.get(req.url));
    }
};

const hasItem = (id) => {
    return cacheManager.has(`ITEM::${id}`);
};

const setItem = (id, v) => {
    cacheManager.set(`ITEM::${id}`, v);
};

const getItem = (id) => {
    if (!hasItem(id)) return null;
    return cacheManager.get(`ITEM::${id}`);
};

const serveItemFromCache = (res, item) => {
    res.setHeader("x-cache", "enabled");
    res.status(200).send({
        ok: true,
        data: {
            ...item
        },
        err: null
    });
};

const setCategory = (id, v) => {
    cacheManager.set(`CATEGORY::${id}`, v);
};

const getCategory = (id) => {
    return cacheManager.get(`CATEGORY::${id}`);
};

const getKeys = () => {
    return cacheManager.keys();
};

const delKey = (key) => {
    try{
        cacheManager.del(key);
        return true;
    } catch (e) {
        return false;
    }
};

module.exports = {
    renderFromCache,
    hasItem,
    setItem,
    getItem,
    serveItemFromCache,
    setCategory,
    getCategory,
    getKeys,
    delKey
};