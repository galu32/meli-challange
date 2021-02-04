import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {useState} from "react";
import PropTypes from "prop-types";
import styles from "./NavBar.module.css";

const NavBar = ({lastSearch}) => {

    let [query, setQuery] = useState(lastSearch || "");

    let handleClick = () => {
        if (query.startsWith("MLA"))
            window.location = `/items/${query}`;
        else
            window.location = `/items?search=${query}`;
    };

    let handleKeyDown = (e) => {
        if (e.key === "Enter"){
            e.preventDefault();
            handleClick();
        }
    };

    let handleOnChange = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
    };

    return (
        <div className={styles.navbar} >
            <img className={styles.logo} src='/meli.png' onClick={()=>{window.location = "/";}}/>
            <input placeholder='Nunca dejes de buscar' className={styles["search-box"]} value={query} onChange={handleOnChange} onKeyDown={handleKeyDown}/>
            <button className={styles["search-button"]} size="sm" onClick={() => handleClick()}>
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    );
};

NavBar.propTypes = {
    lastSearch: PropTypes.string
};

export default NavBar;