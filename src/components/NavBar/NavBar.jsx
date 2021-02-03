import '@fortawesome/fontawesome-free/css/all.min.css'; import
'bootstrap-css-only/css/bootstrap.min.css'; import
'mdbreact/dist/css/mdb.css';

import {useState} from 'react'

import { MDBBtn, MDBIcon } from "mdbreact";
import styles from './NavBar.module.css'

const NavBar = (props) => {

  let [query, setQuery] = useState("")

  let handleClick = () => {
    window.location = `/items?search=${query}`
  }

  let handleKeyDown = (e) => {
    if (e.key === 'Enter'){
      e.preventDefault();
      handleClick()
    }
  }

  let handleOnChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value)
  }

  return (
    <div className={styles.navbar} >
        <img className={styles.logo} src='/meli.png' href='/'/>
        <input placeholder='Nunca dejes de buscar' className={styles["search-box"]} value={query} onChange={handleOnChange} onKeyDown={handleKeyDown}/>
        <MDBBtn className={styles["search-button"]} size="sm" onClick={() => handleClick()}>
            <MDBIcon icon="search" />
        </MDBBtn>
    </div>
  )
}

export default NavBar;