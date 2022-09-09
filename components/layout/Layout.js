import { Fragment } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";

function Layout({ children }) {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
}

export default Layout;
