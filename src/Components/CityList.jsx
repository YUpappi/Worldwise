import CityItem from "./CityItem";
// import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import Message from "./Message";
import Loader from "./Loader";
import { useCities } from "../utils/useCities";
function CityList() {
  const { isLoading, cities } = useCities();
  if (isLoading) return <Loader />;

  if (!cities.length)
    return (
      <Message message="Add your first city by adding a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
