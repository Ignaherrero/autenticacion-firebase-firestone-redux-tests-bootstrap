import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { AuthRouter } from "./AuthRouter";
import { JournalScreen } from "../components/journal/JournalScreen";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { useState } from "react";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { firebase } from "../firebase/firebase-config";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {
  const [waiting, setWaiting] = useState(true);
  const [isLog, setIsLog] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLog(true);
        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLog(false);
      }
      setWaiting(false);
    });
  }, [dispatch]);

  if (waiting) {
    return <h1>Cargando...</h1>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/auth"
            isAuthenticated={isLog}
            component={AuthRouter}
          />
          <PrivateRoute
            exact
            isAuthenticated={isLog}
            path="/"
            component={JournalScreen}
          />
        </Switch>
      </div>
    </Router>
  );
};
