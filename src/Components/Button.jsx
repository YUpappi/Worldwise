import PropTypes from "prop-types";
import styles from "./Button.module.css";
import { Link } from "react-router-dom";

function Button({ children, onClick, type, to }) {
  if (to) {
    return (
      <Link to={to} className={`${styles.btn} ${styles[type]}`}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  to: PropTypes.string,
};
