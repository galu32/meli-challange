import styles from "./ItemPreview.module.css";
import PropTypes from "prop-types";

import {formatNumber} from "../../utils/";

const ItemPreview = ({data}) => {
    let {picture, title, description, price, condition, sold_quantity} = data.item;
    return (
        <>
            <img className={styles["item-img"]} src={picture}/>
            <div className={styles["item-box"]}>
                <h3>{condition === "new" ? "Nuevo" : "Usado"} - {sold_quantity} vendidos</h3>
                <h1 className={styles["item-box-title"]}> {title} </h1>
                <div className={styles["item-box-pricing"]}>
                    <h1 className={styles["item-box-price"]}>{price.currency === "ARS" ? "$" : "U$D"}  {formatNumber(price.amount)}</h1>
                    <button className={styles["item-box-btn"]}> Comprar </button>
                </div>
            </div>
            <div className={styles["item-description"]}>
                <h3>Descripción del producto:</h3>
                {/* <br/> */}
                <pre className={styles["item-description-text"]}>{description}</pre>
            </div>
        </>
    );
};

ItemPreview.propTypes = {
    data: PropTypes.object,
};

export default ItemPreview;