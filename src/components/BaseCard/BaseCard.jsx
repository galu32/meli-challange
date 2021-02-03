import {card} from "./BaseCard.module.css";
import PropTypes from "prop-types";

const BaseCard = ({children}) => {
    return (
        <div className={card}>
            <>
                {children}
            </>
        </div>
    );
};

BaseCard.propTypes = {
    children: PropTypes.any
};

export default BaseCard;