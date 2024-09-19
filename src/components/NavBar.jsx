import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../images/icons.svg";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navleft}>
        <NavLink to="/" className={styles.navlink}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </NavLink>
        <NavLink to="/" className={styles.navlink}>
          Home
        </NavLink>
      </div>

      <div className={styles.navright}>
        <NavLink to="/catalog" className={styles.navlink}>
          Catalog
        </NavLink>
        <NavLink to="/favorites" className={styles.navlink}>
          Favorites
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
