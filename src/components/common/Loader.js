import classNames from "../../assets/styles/common/Loader.module.scss";
import workout from "../../assets/workout.png";

function Loader() {
  return (
    <div className={classNames.wrapper}>
      <img src={workout} alt="logo" />
    </div>
  );
}

export default Loader;
