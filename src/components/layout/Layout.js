import { Fragment } from "react";
import MainNavigation from "./MainNavigaiton";


const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation/>
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
