import styles from "./ItemRow.module.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShippingFast } from "@fortawesome/free-solid-svg-icons";
import {formatNumber} from "../../utils/";

const ItemRow = ({data}) => {
    let {id, picture, price, title, free_shipping} = data;
    let handleClick = () => {
        window.location = `/items/${id}`;
    };
    return (
        <div className={styles["item-row"]} onClick={() => handleClick()}>
            <img className={styles["item-row-img"]} src={picture}/>
            <div className={styles["item-row-container"]}>
                <h3 className={styles["item-row-price"]}>{price.currency === "ARS" ? "$" : "U$D"}  {formatNumber(price.amount)}
                    {free_shipping && <FontAwesomeIcon className={styles["item-row-free-shipping"]} size="xs" icon={faShippingFast} />}
                </h3>
                <h3 className={styles["item-row-name"]}>{title}</h3>
            </div>
        </div>
    );
};

ItemRow.propTypes = {
    data: PropTypes.object,
  
};

export default ItemRow;