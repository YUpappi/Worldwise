import { NavLink } from "react-router-dom";
import styles from "./pageNav.module.css";
import Logo from "./Logo";
import Button from "./Button";
function NavPage() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <Button type="primary" to="/Login">
            Login
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default NavPage;
