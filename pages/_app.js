import React from "react";
import Layout from "../components/layout/Layout";
import "../styles/globals.scss";
import { Provider } from "react-redux";
import { wrapper } from "../src/store";

function MyApp({ Component, ...pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
