// import { useState } from "react";

import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../utils/useCities";

function CountryList() {
  const { cities, isLoading } = useCities();
  // const [country, setCountry] = useState("");

  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message message="Add your cities young man" />;

  //
  //accumulator, currentValue
  // accumulator is the value returned from the last iteration, currentValue(city) is the current element being processed in the array.
  const countries = cities.reduce((accumulator, city) => {
    //acc, curr [for city]
    if (!accumulator.map((element) => element.country).includes(city.country)) {
      return [
        ...accumulator,
        {
          country: city.country,
          emoji: city.emoji,
        },
      ];
      // check if country already exists in accumulator, if not, add it. Else, return accumulator as it is.
    } else return accumulator;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((countrys) => (
        <CountryItem countrys={countrys} key={countrys.country} />
      ))}
    </ul>
  );
}

export default CountryList;
