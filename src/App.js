import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/Homepage";
import Layout from "./components/layout/Layout";
import UserProfile from "./components/profile/UserProfile";
import { useContext, useEffect } from "react";
import AuthContext from "./store/auth-context";

const App = () => {
  // Access the authentication context
  const authCtx = useContext(AuthContext);

  // Get the current location using the react-router hook
  // For example, if you're on a shopping website, and the address is "https://example.com/products", location.pathname would be "/products"
  const location = useLocation();

  // Set up an effect to automatically log out after 5 minutes of inactivity
  useEffect(() => {
    
    // Set a timeout to call the logout function after 5 minutes
    const logoutTimeout = setTimeout(() => authCtx.logout(), 1000 * 60 * 5);

    // Clean up the timeout if the location changes
    return () => clearTimeout(logoutTimeout);
  }, [location.pathname]);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        {/* Route for the authentication page, displayed only when not logged in */}
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}

        {/* Route for the user profile, protected and redirects to auth if not logged in */}
        <Route path="/profile">
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>

        {/* Redirect to the homepage if the entered route is not found */}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
