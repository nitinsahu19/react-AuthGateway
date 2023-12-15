import { Switch, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/Homepage";
import Layout from "./components/layout/Layout";
import UserProfile from "./components/profile/UserProfile";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Route path="/profile">
          <UserProfile />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
