import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
               <Route path="/dashboard" exact component={Dashboard} /> 
               
            </Switch>
        </BrowserRouter>
    );
}