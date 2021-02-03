import dynamic from "next/dynamic";
import axios from "axios";
import PropTypes from "prop-types";

let NavBar = dynamic(() => import("../../components/NavBar/NavBar"));
let BaseCard = dynamic(() => import("../../components/BaseCard/BaseCard"));
let ItemPreview = dynamic(() => import("../../components/ItemPreview/ItemPreview"));
let BaseContainer = dynamic(() => import("../../components/BaseContainer/BaseContainer"));

const ItemOverview = ({data}) => {
    return (
        <BaseContainer>
            <NavBar/>
            <BaseCard>
                <ItemPreview data={data}/>
            </BaseCard>
        </BaseContainer>
    );

};

export const getServerSideProps = async ({query}) => {
    let {id} = query;
    let res = await axios.get(`http://localhost:3000/api/items/${id}`);
    // eslint-disable-next-line no-unused-vars
    let {ok, data, err} = res.data;
    if (!ok){
        /*handle error*/
    }
    return {
        props: {
            data
        }
    };
};

ItemOverview.propTypes = {
    data: PropTypes.object,
};

export default ItemOverview;