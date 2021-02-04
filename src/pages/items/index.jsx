import dynamic from "next/dynamic";
import axios from "axios";
import PropTypes from "prop-types";
import {useRouter} from "next/router";

let NavBar = dynamic(() => import("../../components/NavBar/NavBar"));
let BaseCard = dynamic(() => import("../../components/BaseCard/BaseCard"));
let ItemRow = dynamic(() => import("../../components/ItemRow/ItemRow"));
let BaseContainer = dynamic(() => import("../../components/BaseContainer/BaseContainer"));
let Breadcrumb = dynamic(() => import("../../components/Breadcrumb/Breadcrumb"));

const ItemList = ({data}) => {

    let rows = data && data.items.map(r => {
        return <ItemRow key={r.id} data={r} />;
    });

    let router = useRouter();
    let query = router.query.search || "";

    return (
        <BaseContainer>
            <NavBar lastSearch={query || ""}/>
            {data && data.categories.length > 0 && <Breadcrumb categories={data.categories}/>}
            <BaseCard>
                {rows}
            </BaseCard>
        </BaseContainer>
    );

};

const getItems = async (res,query) => {
    try{
        let {search} = query;
        if (!search) throw "missing search param";
        search = search.replace(/ñ/g, "n");
        let res = await axios.get(`http://localhost:3000/api/items?q=${search}`);
        let {ok, data, err} = res.data;
        if (!ok){
            throw err;
        }
        return data;
    } catch (e) {
        res.redirect("/404");
    }
    return {};
};

export const getServerSideProps = async ({res, query}) => {
    let data = await getItems(res,query);
    return {
        props:{
            data
        }
    };
};

ItemList.propTypes = {
    data: PropTypes.object
};

export default ItemList;