import { Container, Grid } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

import LinearScaleIcon from "@mui/icons-material/LinearScale";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import BusinessIcon from "@mui/icons-material/Business";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const cx = classNames.bind(styles);

function Footer() {
  return (
    <footer className={cx("root")}>
      <Container>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6} md={4}>
            <div className={cx("time")}>
              <div className={cx("col")}>
                <span className={cx("time-day")}>Sunday</span>
                <span className={cx("time-day")}>Monday</span>
                <span className={cx("time-day")}>Tuesday</span>
                <span className={cx("time-day")}>Wednesday</span>
                <span className={cx("time-day")}>Friday</span>
                <span className={cx("time-day")}>Saturday</span>
              </div>

              <div className={cx("col")}>
                <LinearScaleIcon className={cx("time-dots")} />
                <LinearScaleIcon className={cx("time-dots")} />
                <LinearScaleIcon className={cx("time-dots")} />
                <LinearScaleIcon className={cx("time-dots")} />
                <LinearScaleIcon className={cx("time-dots")} />
                <LinearScaleIcon className={cx("time-dots")} />
              </div>

              <div className={cx("col")}>
                <span className={cx("time-hours")}>Closed</span>
                <span className={cx("time-hours")}>8.00-20.00</span>
                <span className={cx("time-hours")}>10.00-5.00</span>
                <span className={cx("time-hours")}>12.00-9.00</span>
                <span className={cx("time-hours")}>7.00-1.00</span>
                <span className={cx("time-hours")}>9.00-12.00</span>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <div className={cx("contacts")}>
              <h4 className={cx("contact-title")}>Address</h4>

              <div className={cx("contact")}>
                <PhoneInTalkIcon className={cx("contact-icon")} />
                <span className={cx("contact-txt")}>+1900 1900</span>
              </div>

              <div className={cx("contact")}>
                <SpeakerNotesIcon className={cx("contact-icon")} />
                <span className={cx("contact-txt")}>
                  trandinhkhoi102@gmail.com
                </span>
              </div>

              <div className={cx("contact")}>
                <BusinessIcon className={cx("contact-icon")} />
                <span className={cx("contact-txt")}>Ba Tri, Ben Tre, VN</span>
              </div>

              <div className={cx("contact", "contact-social")}>
                <FacebookIcon style={{ fill: "#2D88FF" }} />
                <TwitterIcon style={{ fill: "#5DA9DD" }} />
                <InstagramIcon style={{ fill: "#F56040" }} />
                <YouTubeIcon style={{ fill: "#FF0000" }} />
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={4}>
            <div className={cx("map")}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125708.2751518273!2d106.5194698454362!3d10.067621181553955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x319ff917a9e97417%3A0x1abe8f91a0dc8c5a!2zQmEgVHJpLCBC4bq_biBUcmUsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1662560358003!5m2!1svi!2s"
                width="600"
                height="450"
                style={{ width: "100%", height: "100%", border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
