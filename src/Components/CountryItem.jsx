import styles from "./CountryItem.module.css";
import PropTypes from "prop-types";

function CountryItem({ countrys }) {
  // Generate a flag URL for the given country code (e.g., "US" for United States)
  const getFlagUrl = (countryCode) =>
    `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
  const { country, emoji } = countrys;
  return (
    <li className={styles.countryItem}>
      <img
        src={getFlagUrl(emoji)}
        alt={`${country} Flag`}
        className={styles.emoji}
      />
      <span>{country}</span>
    </li>
  );
}

CountryItem.propTypes = {
  countrys: PropTypes.shape({
    emoji: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }).isRequired,
};
export default CountryItem;
