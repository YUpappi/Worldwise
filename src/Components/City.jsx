import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "./City.module.css";
import Button from "./Button";
import { formatDate } from "../utils/dateFormatters";
import Spinner from "./Spinner";
import { useCities } from "../utils/useCities";

function City() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentCity, getCity, isLoading } = useCities();
  const { cityName, date, notes, emoji, country } = currentCity || {};
  // const isMountedRef = useRef(false);

  // Function to get local flag image URL
  const getFlagUrl = (country) => {
    return `https://flagcdn.com/w40/${country}.png`;
  };

  useEffect(
    function () {
      // if (!isMountedRef.current || isMountedRef === id) {

      //   isMountedRef.current = id;
      // }
      getCity(id);
    },
    [id, getCity]
  );
  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h3>
          <img
            src={getFlagUrl(emoji)}
            alt={`${country} Flag`}
            className={styles.emoji}
          />
          {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
        <Button type="back" onClick={() => navigate(-1)}>
          &larr; Back
        </Button>
      </div>
    </div>
  );
}

export default City;
