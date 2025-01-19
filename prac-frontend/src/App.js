import React, { useCallback,useState } from 'react';
import { BrowserRouter as Router,Route,Switch, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import User from './users/pages/User';
import UserPlace from './places/pages/UserPlace';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './users/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
const App = () => {

  const [isLoggedIn, setIsLogin]= useState(false);
  const [isUserId, setIsUserId]= useState(false);
  const login = useCallback((uid)=>{
    setIsLogin(true)
    setIsUserId(uid)
  },[])
  const logout =useCallback(()=>{
    setIsLogin(false)
    setIsUserId(null)
  },[])

   let routes;

   if(isLoggedIn){
    routes=(
      <Switch>

      <Route path ="/" exact>
      <User/> 
    </Route>

    <Route path="/:uid/places">
      <UserPlace/>
    </Route>
    <Route path="/places/new" exact>
    <NewPlace/>
    </Route>
    <Route path="/places/:pid" exact>
    <UpdatePlace/>
    </Route>

    <Redirect to="/"/>
    </Switch>
    )
   }else{
    routes = (
      <Switch>

      <Route path ="/" exact>
      <User/> 
    </Route>

    <Route path="/:uid/places">
      <UserPlace/>
    </Route>

    <Route path="/auth" exact>
    <Auth/>
    </Route>
    <Redirect to="/auth"/>
    </Switch>
    )
   }

  return (
    <AuthContext.Provider
    value={{isLoggedIn,login,logout,isUserId}}>
  <Router>
    <MainNavigation/>
    <main>
   
     
    {routes}
    
    </main>
    </Router>
    </AuthContext.Provider>
    );
};

export default App;
