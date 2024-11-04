import { BrowserRouter as Router, Route, Routes   } from 'react-router-dom';
import {Provider} from "react-redux";
import {store} from "./redux/store/store"
import Home from "./components/Home";
import Login from './components/auth/LogIn';
import Register from './components/auth/Register';
import { useEffect } from 'react';
import setAuthToken from './util/setAuthToken';
import { setCurrentUser } from './redux/actions/authAction';
import ProtectedRoute from './components/auth/ProtectedRoute';


if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {
  useEffect(() => {
    store.dispatch(setCurrentUser())
    }, [])

  return (
    <Provider store={store}>
    <Router>
      <div id="screen">
        <Routes>
          <Route exact path='/' Component={Register}/>
          <Route  path = "/login" Component={Login}/> 
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        /> 
        </Routes> 
      </div>
      </Router>
    </Provider>
  );
}

export default App;
