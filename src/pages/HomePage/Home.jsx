import styles from "./Home.module.css";
import backgroundImage from "../../images/carsaleBanner.jpg";

const Home = () => {
  const homeStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <div className={styles.home} style={homeStyle}>
      <div className={styles.textcontainer}>Welcome to Home Page</div>
    </div>
  );
};

export default Home;
