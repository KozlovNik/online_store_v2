import React from 'react';

import Categories from '../categories'

import './sidebar.css';
import { Link, HashRouter as Router, Route, Switch, useRouteMatch } from 'react-router-dom';

const Sidebar = () => {

    let { path, url } = useRouteMatch();

    return (

        <Router>
            <nav class="sidebar">
                <h3 class="sidebar__header">Категории</h3>
                <ul class="sidebar__list">
                    <li class="sidebar__item">
                        <Link class="sidebar__link" to={`${url}/category`}>Напитки</Link>
                    </li>
                </ul>
            </nav>
            <div>
                <Switch>
                    <Route exact path={`${path}`}/>
                    <Route exact path={`${path}/:category`} component={Categories} />
                </Switch>
            </div>
        </Router>
    );
}

export default Sidebar;