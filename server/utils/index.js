const axios = require("axios");
const {API_URL} = require("../constants");

let utils = {

    /**
    * @name getCategories
    * @description retrieves categories from meli API response
    * @param {object} data meli items API response
    * @param {boolean} onlyPath retrieves only string
    * @return {array}
    */

    getCategories: (data, onlyPath) => {
        if (onlyPath) {
            return data.map(r => r.name);
        }
        let categories = data.filters.find(row => {
            return row.id === "category";
        });
        if (categories) {
            return categories.values[0].path_from_root.map(r => r.name);
        }
        else return [];
    },

    /**
    * @name getCategories
    * @description retrieves items JSON from meli API response
    * @param {object} data meli items API response
    * @return {object}
    */

    getSearchJSON: (data) => {
        return {
            categories: utils.getCategories(data),
            items: data.results.map(item => utils.getItemJSON(item))
        };
    },

    /**
    * @name getCategories
    * @description retrieves item JSON from meli API response
    * @param {object} data meli items API response
    * @return {object}
    */

    getItemJSON: (data) => {
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
    },

    /**
    * @name getCategories
    * @description retrieves item JSON with sold_quantity and description from meli API response
    * @param {object} data meli items API response
    * @return {object}
    */

    getFullItemJSON: async (data) => {
        return {
            item: {
                ...utils.getItemJSON(data),
                sold_quantity: data.sold_quantity,
                description: await utils.getItemDescription(data.id),
            }
        };
    },

    /**
    * @name getCategories
    * @description retrieves default JSON header for API responses
    * @return {object}
    */

    getJSONHeader: () => {
        return {
            author: {
                name: "Franco",
                lastname: "Galuzzi",
            }
        };
    },

    /**
    * @name getCategories
    * @description catch error in request
    * @param {string} url url to request
    * @return {object}
    */

    safeGet: async (url) => {
        try {
            let {data} = await axios.get(url);
            return {ok: true, data};
        } catch (err) {
            return {ok: false, err};
        }
    },

    /**
    * @name getCategories
    * @description retrieves item description from meli API
    * @param {string} id meli item id
    * @return {string}
    */

    getItemDescription: async (id) => {
        // eslint-disable-next-line no-unused-vars
        let {ok , data, err} = await utils.safeGet(`${API_URL}/items/${id}/description`);
        if (!ok){
            /*handle error*/
            return "";
        }
        return data.plain_text;
    },

};

module.exports = utils;