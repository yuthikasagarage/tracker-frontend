import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Pages/Home/Home.';
import ProtectedRoute from './components/common/Protected'

import Signin from "./Pages/Signin/Signin";
import Signup from "./Pages/Signup/Signup";

export default function Routes({
  signedIn,
}) {
  return (
    <Router>        
      <Switch>
        <ProtectedRoute  exact
            path="/"            
            signedIn={signedIn}>
          <Home/>
        </ProtectedRoute>
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />

        </Switch>
    </Router>
  );
}
