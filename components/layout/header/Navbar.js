import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
import LogoutButton from "../../auth/logout/LogoutButton";
import Dialog from "../../ui/dialog/Dialog";
import { cartActions, selectFoodsFromCart } from "../../../src/store/cart";

import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ReviewsIcon from "@mui/icons-material/Reviews";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SellIcon from "@mui/icons-material/Sell";

const cx = classNames.bind(styles);

function Navbar() {
  const [isShowNav, setIsShowNav] = useState(false);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
    const navbar = ref.current;
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        navbar.style.backgroundColor = "rgba(0, 0, 0, 0.84)";
        navbar.style.marginTop = "0";
      } else {
        navbar.style.backgroundColor = "transparent";
        navbar.style.boxShadow = "unset";
        navbar.style.marginTop = "5px";
      }
    });
  }, []);

  const router = useRouter();

  const ref = useRef(null);

  let nameGg, imageGg, nameFb, imageFb, username;
  if (typeof window !== "undefined") {
    nameGg = localStorage.getItem("nameGg");
    imageGg = localStorage.getItem("imageGg");
    nameFb = localStorage.getItem("nameFb");
    imageFb = localStorage.getItem("imageFb");
    username = localStorage.getItem("username");
  }

  const dispatch = useDispatch();
  const cartFoods = useSelector(selectFoodsFromCart);

  const toggleNavBarHandler = () => {
    setIsShowNav((prevState) => !prevState);
  };

  const loginHandler = () => {
    router.push("/login");
  };

  const showCartHandler = () => {
    dispatch(cartActions.showCart(true));
  };

  return (
    <>
      <AppBar
        ref={ref}
        position="static"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "transparent",
          zIndex: 100,
          marginTop: "5 !important",
          transition: "0.2s ease",
          padding: "0 !important",
          boxShadow: "unset !important",
        }}
      >
        {domLoaded && (
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                <Link href="/">
                  <div className={cx("logo")}>
                    <Image
                      src="/images/logo.png"
                      alt="logo"
                      width={100}
                      height={100}
                    />
                  </div>
                </Link>
              </Typography>

              <Box>
                <MenuIcon
                  sx={{
                    fontSize: 28,
                    display: { xs: "block", md: "none" },
                    cursor: "pointer",
                  }}
                  onClick={toggleNavBarHandler}
                />
              </Box>

              {/* Navbar mobile */}
              <div className={cx("nav")}>
                <div
                  className={cx("nav__content", `${isShowNav ? "active" : ""}`)}
                >
                  <div className={cx("nav__top")}>
                    <div className={cx("nav__account")}>
                      {nameGg || nameFb || username ? (
                        <div className={cx("d-flex")}>
                          <Avatar
                            src={imageGg || imageFb}
                            className={cx("nav__icon")}
                          />
                          <p className={cx("nav__username")}>
                            {nameGg || nameFb || username}
                          </p>
                        </div>
                      ) : (
                        <div onClick={loginHandler}>
                          <Avatar src="" className={cx("nav__icon")} />
                        </div>
                      )}
                    </div>
                    <div>
                      <CloseIcon
                        sx={{
                          fontSize: 28,
                          paddingRight: "10px !important",
                          cursor: "pointer",
                        }}
                        onClick={toggleNavBarHandler}
                      />
                    </div>
                  </div>

                  <ul className={cx("nav__list")}>
                    <Link href="/">
                      <li className={cx("nav__item")}>
                        <HomeIcon sx={{ fontSize: 28 }} />
                        Home
                      </li>
                    </Link>

                    <Link href="/popular-food">
                      <li className={cx("nav__item")}>
                        <RestaurantMenuIcon sx={{ fontSize: 28 }} />
                        Order online
                      </li>
                    </Link>

                    <Link href="/review">
                      <li className={cx("nav__item")}>
                        <ReviewsIcon sx={{ fontSize: 28 }} />
                        Review
                      </li>
                    </Link>

                    {(nameGg || nameFb || username) && (
                      <div
                        className={cx("nav__item")}
                        onClick={() => setIsLogout(true)}
                      >
                        <LogoutButton
                          type={nameGg ? "gg" : nameFb ? "fb" : "email"}
                        />
                      </div>
                    )}
                  </ul>
                </div>
              </div>

              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", md: "none" },
                  justifyContent: { xs: "center" },
                }}
              >
                <Link href="/">
                  <div className={cx("logo")}>
                    <Image
                      src="/images/logo.png"
                      alt="logo"
                      width={100}
                      height={100}
                    />
                  </div>
                </Link>
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Link href="/">
                  <Button className={cx("button-nav")}>
                    <HomeIcon sx={{ fontSize: 28 }} />
                    <Typography
                      variant="h6"
                      sx={{ paddingLeft: 1, lineHeight: "1.8rem" }}
                    >
                      Home
                    </Typography>
                  </Button>
                </Link>

                <Link href="/popular-food">
                  <Button className={cx("button-nav")}>
                    <RestaurantMenuIcon sx={{ fontSize: 28 }} />
                    <Typography
                      variant="h6"
                      sx={{ paddingLeft: 1, lineHeight: "1.8rem" }}
                    >
                      Order Online
                    </Typography>
                  </Button>
                </Link>

                <Link href="/review">
                  <Button className={cx("button-nav")}>
                    <ReviewsIcon sx={{ fontSize: 28 }} />
                    <Typography
                      variant="h6"
                      sx={{ paddingLeft: 1, lineHeight: "1.8rem" }}
                    >
                      Reviews
                    </Typography>
                  </Button>
                </Link>
              </Box>

              <Box
                className={cx("shopping-cart", "navbar__cart")}
                onClick={showCartHandler}
              >
                <ShoppingCartIcon />
                <Box className={cx("navbar__cart-amount")}>
                  {cartFoods.length}
                </Box>
              </Box>

              <Box
                className={cx("navbar__account")}
                sx={{ flexGrow: 0, position: "relative" }}
              >
                {nameGg || nameFb || username ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Tooltip title="Settings">
                      <IconButton sx={{ p: 0 }}>
                        <Avatar src={imageGg || imageFb} alt="Avatar" />
                      </IconButton>
                    </Tooltip>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        paddingLeft: 1,
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {nameGg || nameFb || username}
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    onClick={loginHandler}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Tooltip title="Login">
                      <IconButton sx={{ p: 0 }}>
                        <Avatar alt="Avatar" />
                      </IconButton>
                    </Tooltip>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        paddingLeft: 1,
                      }}
                    >
                      Sign In
                    </Typography>
                  </Box>
                )}

                {(nameGg || nameFb || username) && (
                  <ul className={cx("navbar__account-options")}>
                    <li className={cx("navbar__account-option")}>
                      <AccountBoxIcon />
                      <span>My account</span>
                    </li>

                    <li className={cx("navbar__account-option")}>
                      <SellIcon />
                      <span>My cart</span>
                    </li>

                    <li
                      className={cx("navbar__account-option")}
                      onClick={() => setIsLogout(true)}
                    >
                      <LogoutButton
                        type={nameGg ? "gg" : nameFb ? "fb" : "email"}
                      />
                    </li>
                  </ul>
                )}
              </Box>
            </Toolbar>
          </Container>
        )}
      </AppBar>
      <Dialog isShow={isShowDialog} onSetDialog={setIsShowDialog} />
      {isShowNav && <Box className="overlay" onClick={toggleNavBarHandler} />}
    </>
  );
}

export default Navbar;
