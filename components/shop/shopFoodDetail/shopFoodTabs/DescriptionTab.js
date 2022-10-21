import classNames from "classnames/bind";
import styles from "./DescriptionTab.module.scss";

const cx = classNames.bind(styles);

function DescriptionTab({ ingredients }) {
  return (
    <div className={cx("tab")}>
      <p className={cx("tab-desc")}>
        We prioritize the health of our users first. Great customer experiences
        are the source of our motivation. Let’s enjoy this wonderful taste with
        us, feel the dedication that we put into it. Thank you for believing us
      </p>
      <div className={cx("tab-table")}>
        {ingredients.map(({ metric, ingredient }, index) => (
          <div key={index} className={cx("tab-col")}>
            <div className={cx("tab-col-metrics")}>
              <div className={cx("tab-col-number")}>
                {index !== 0 && Math.floor(Math.random() * 1000)}
              </div>
              <div className={cx("tab-col-metric")}>{metric}</div>
            </div>
            <div className={cx("tab-col-ingredient")}>{ingredient}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DescriptionTab;
