import React from 'react';

import Categories from '../categories'

import './sidebar.css';
import { Link, HashRouter as Router, Route, Switch, useRouteMatch } from 'react-router-dom';

const Sidebar = () => {

    let { path, url } = useRouteMatch();

    return (

        <Router>
            <nav className="sidebar">
                <h3 className="sidebar__header">Категории</h3>
                <ul className="sidebar__list">
                    <li className="sidebar__item">
                        <Link className="sidebar__link" to={`${url}/category`}>Напитки</Link>
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