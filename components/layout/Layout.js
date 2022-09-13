import { Fragment } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { useRouter } from "next/router";

function Layout({ children }) {
  const router = useRouter();
  const pathname = router.pathname;

  if (pathname === "/login") {
    return <main>{children}</main>;
  }

  return (
    <Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
}

export default Layout;
