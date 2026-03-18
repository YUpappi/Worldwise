import PropTypes from "prop-types";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/dateFormatters";
import { useCities } from "../utils/useCities";

function CityItem({ city }) {
  const { deleteCity } = useCities();

  function handleDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }

  //

  const getFlagUrl = (countryCode) =>
    `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
  //distructuring the objects keys out of city
  const { cityName, date, emoji, id, position, country } = city;
  //

  return (
    <li>
      <Link
        className={styles.cityItem}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        {/* Display flag image instead of emoji */}
        <img
          src={getFlagUrl(emoji)}
          alt={`${country} Flag`}
          className={styles.emoji}
        />

        <h3 className={styles.name}>{cityName}</h3>
        {date && <time className={styles.date}>{formatDate(date)}</time>}
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}

// Define PropTypes for CityItem
CityItem.propTypes = {
  city: PropTypes.shape({
    id: PropTypes.number.isRequired,
    position: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
    cityName: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    date: PropTypes.string, // JSON date is a string, not a Date object
    emoji: PropTypes.string.isRequired, // Using emoji field as country code for flags
  }).isRequired,
};

export default CityItem;
