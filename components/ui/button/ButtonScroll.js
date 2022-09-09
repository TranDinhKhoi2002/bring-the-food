import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import classes from "./ButtonScroll.module.scss";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

function ButtonScroll() {
  const [isShowBtn, setIsShowBtn] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 800) {
        setIsShowBtn(true);
      } else {
        setIsShowBtn(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleClickScrollToTop);
    };
  }, []);

  const handleClickScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isShowBtn && (
        <Button
          ref={ref}
          onClick={handleClickScrollToTop}
          className={classes.btnScroll}
        >
          <ExpandLessIcon sx={{ fontSize: 36 }} />
        </Button>
      )}
    </>
  );
}

export default ButtonScroll;
