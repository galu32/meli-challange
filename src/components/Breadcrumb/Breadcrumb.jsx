import styles from "./Breadcrumb.module.css";
import PropTypes from "prop-types";

const Breadcrumb = ({categories}) => {

    let rows = categories.map((r,inx) => {
        let isLast = inx === categories.length - 1;
        return (<p style={isLast ? {"color": "rgb(44,193,203)"} : {}} className={styles["breadcrumb-text"]}
            key={r}>{r} { isLast ? "" : "  >  "}
        </p>);
    });

    return (
        <div className={styles.breadcrumb}>
            <>
                {rows}
            </>
        </div>
    );
};

Breadcrumb.propTypes = {
    categories: PropTypes.array
};

export default Breadcrumb;