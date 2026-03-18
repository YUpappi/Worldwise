//
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../utils/useCities";
import ButtonBack from "./ButtonBack";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useUrlPosition();
  const { createNewCity, isLoading: isLoadingCity, error } = useCities();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryDivision, setCountryDivision] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState("");
  const [emoji, setEmoji] = useState("");
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!lat || !lng) return;
      async function fetchCityData() {
        try {
          setIsGeoLoading(true);
          setGeoError("");
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          const {
            city,
            locality,
            countryName,
            countryCode,
            principalSubdivision,
          } = data;

          if (!countryCode)
            throw new Error(
              "the place you clicked is not a city, kindly click on a city/ country"
            );
          console.log(data);
          setCityName(city || locality || "");
          setCountry(countryName);
          setCountryDivision(principalSubdivision || "");
          setEmoji(countryCode.toLowerCase());
        } catch (err) {
          setGeoError(err.message);
        } finally {
          setIsGeoLoading(false);
        }
      }

      fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    if (!cityName || !notes || !date) {
      setSubmitError("Please fill in city name, date, and notes before adding.");
      return;
    }
    const newCity = {
      cityName,
      country,
      emoji,
      notes,
      date,
      position: { lat, lng },
    };
    console.log(newCity);
    try {
      await createNewCity(newCity);
      navigate("/App/cities");
    } catch (err) {
      console.error("Error creating city:", err);
      setSubmitError(
        err.message || "Could not add city. Make sure the server is running."
      );
    }
  }
  if (!lat && !lng)
    return <Message message="you have to click on the map to get a city" />;
  if (isGeoLoading) return <Spinner />;
  if (geoError) return <Message message={geoError} />;

  //
  //

  return (
    <form
      className={`${styles.form} ${isLoadingCity ? styles.loading : ""}`}
      onSubmit={handleSubmit}
      id="form"
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {emoji && (
          <img
            src={`https://flagcdn.com/w40/${emoji}.png`}
            alt={`${country} Flag`}
            className={styles.flag}
            onError={(e) => {
              console.log("Error loading image:", `${emoji}`);
              e.target.style.display = "none";
            }}
          />
        )}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">
          When did you go to {countryDivision} state?
        </label>

        <DatePicker
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      {(submitError || error) && (
        <Message message={submitError || error} />
      )}

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;

//getting the country code and convert to Emoji
// export function convertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

// const convertToEmoji = (countryCode) =>
//   `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;



