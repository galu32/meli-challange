import styles from "./ItemRow.module.css";
import PropTypes from "prop-types";

import {formatNumber} from "../../utils/";

const ItemRow = ({data}) => {
    let {id, picture, price, title} = data;
    let handleClick = () => {
        window.location = `/items/${id}`;
    };
    return (
        <div className={styles["item-row"]} onClick={() => handleClick()}>
            <img className={styles["item-row-img"]} src={picture}/>
            <div className={styles["item-row-container"]}>
                <h3 className={styles["item-row-price"]}>{price.currency === "ARS" ? "$" : "U$D"}  {formatNumber(price.amount)}</h3>
                <h3 className={styles["item-row-name"]}>{title}</h3>
            </div>
        </div>
    );
};

ItemRow.propTypes = {
    data: PropTypes.object,
  
};

export default ItemRow;