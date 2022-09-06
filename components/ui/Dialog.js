import React from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import styles from "./Dialog.module.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogComponent({ isShow, onSetDialog }) {
  const router = useRouter();

  const closeHandler = () => {
    onSetDialog(false);
  };

  const loginHandler = () => {
    router.push("/login");
  };

  return (
    <div>
      <Dialog
        open={isShow}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeHandler}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className={styles.title}>JOIN WITH US 🚀</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            className={styles.content}
          >
            You are not signed in. Please sign in to use this feature!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={styles.cancel} onClick={closeHandler}>
            Cancel
          </Button>
          <Button className={styles.login} onClick={loginHandler}>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogComponent;
