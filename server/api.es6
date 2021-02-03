module.exports = (server) => {

    const axios = require("axios");

    let getCategories = (data) => {
        let categories = data.filters.find(row => {
            return row.id === "category";
        });
        if (categories) return categories.values;
        else return [];
    };

    let getSearchJSON = (data) => {
        return {
            categories: getCategories(data),
            items: data.results.map(item => getItemJSON(item))
        };
    };

    let getItemJSON = (data) => {
        return {
            id: data.id,
            title: data.title,
            price: {
                currency: data.currency_id,
                amount: data.price,
                // decimals
            },
            picture: data.pictures ? data.pictures[0].secure_url : data.thumbnail,
            condition: data.condition,
            free_shipping: data.shipping.free_shipping,
        };
    };

    let getFullItemJSON = async (data) => {
        return {
            item: {
                ...getItemJSON(data),
                sold_quantity: data.sold_quantity,
                description: await getItemDescription(data.id),
            }
        };
    };

    let getJSONHeader = () => {
        return {
            author: {
                name: "Franco",
                lastname: "Galuzzi",
            }
        };
    };

    let safeGet = async (url) => {
        try {
            let {data} = await axios.get(url);
            return {ok: true, data};
        } catch (err) {
            return {ok: false, err};
        }
    };

    let getItemDescription = async (id) => {
        // eslint-disable-next-line no-unused-vars
        let {ok , data, err} = await safeGet(`https://api.mercadolibre.com/items/${id}/description`);
        if (!ok){
            /*handle error*/
            return "";
        }
        return data.plain_text;
    };

    server.get("/api/items", async (req,res) => {
        let {ok, data, err} = await safeGet(`https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}&limit=4`);
        if (!ok) {
            return res.status(500).send({
                ok,
                data,
                err: "Internal Error"
                /*JSON.stringify(err)*/
            });
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
        let {ok, data, err} = await safeGet(`https://api.mercadolibre.com/items/${req.params.id}`);
        if (!ok) {
            return res.status(500).send({
                ok,
                data,
                err: "Internal Error"
                /*JSON.stringify(err)*/
            });
        }
        res.status(200).send({
            ok,
            data:{
                ...getJSONHeader(),
                ...(await getFullItemJSON(data))
            },
            err
        });
    });

};