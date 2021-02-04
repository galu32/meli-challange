import dynamic from "next/dynamic";
import axios from "axios";
import PropTypes from "prop-types";

let NavBar = dynamic(() => import("../../components/NavBar/NavBar"));
let BaseCard = dynamic(() => import("../../components/BaseCard/BaseCard"));
let ItemPreview = dynamic(() => import("../../components/ItemPreview/ItemPreview"));
let BaseContainer = dynamic(() => import("../../components/BaseContainer/BaseContainer"));
let Breadcrumb = dynamic(() => import("../../components/Breadcrumb/Breadcrumb"));

const ItemOverview = ({data, categories}) => {
    return (
        <BaseContainer>
            <NavBar/>
            {categories && categories.length > 0 && <Breadcrumb categories={categories}/>}
            <BaseCard>
                <ItemPreview data={data}/>
            </BaseCard>
        </BaseContainer>
    );

};

const getItem = async (res, query) => {
    let {id} = query;
    try{
        let res = await axios.get(`http://localhost:3000/api/items/${id}`);
        // eslint-disable-next-line no-unused-vars
        let {ok, data, err} = res.data;
        if (!ok){
        /*handle error*/
            throw err;
        }
        return data;
    } catch (e) {
        res.redirect("/404");
    }
    return {};
};

const getCategories = async (res, query) => {
    let {id} = query;
    try{
        res = await axios.get(`http://localhost:3000/api/items/${id}/category`);
        let {ok, data, err} = res.data;
        if (!ok){
        /*handle error*/
            throw err;
        }
        return data.categories;
    } catch (e) {
        res.redirect("/404");
    }
    return [];
};

export const getServerSideProps = async ({res, query}) => {
    let data = await getItem(res,query);
    let categories = await getCategories(res,query);
    return {
        props: {
            data,
            categories
        }
    };
};

ItemOverview.propTypes = {
    data: PropTypes.object,
    categories: PropTypes.array
};

export default ItemOverview;