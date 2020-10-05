import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import configureStore from '../store/store';

import TaskForm from "../components/forms/taskForm";
import Home from '../views/home';
import Tasks from "../views/tasklist";
import TaskDetail from "../views/taskDetail";
import SignUp from '../views/signup';
import LogIn from '../views/login';
import Loading from '../components/loading';
import Error from '../components/errors/error';

const ROUTES = [
    {path: "/", key: "ROOT", exact: true, component: LogIn },
    {path: '/loading', key: "ROOT_LOADING", exact: true, component: Loading},
    {path: '/error', key: "ROOT_ERROR", exact: true, component: Error},
    {path: '/signup', key: "ROOT_SIGNUP", exact: true, component: SignUp},
    {
        path: "/app",
        key: "APP",
        component: props => {
            if (!localStorage.getItem('token')){
              return <Redirect to={"/"} />;
            }
            return <RenderRoutes {...props} />;
          },
        routes: [
            {
                path: "/app",
                key: "APP_ROOT",
                exact: true,
                component: Home,
            },
            {
                path: "/app/post-task/",
                key: "APP_TASK_FORM",
                exact: true,
                component: TaskForm,
            },
            {
                path: '/app/tasks/',
                key: 'APP_TASK_LIST',
                exact: true,
                component: Tasks,
            },
            {
                path: '/app/tasks/:id',
                key: 'APP_TASK_DETAIL',
                exact: true,
                component: TaskDetail,
            }
        ],
    },
];

export default ROUTES;


function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            exact={route.exact}
            render={props => <route.component {...props} routes={route.routes} />}
        />
    );
}


export function RenderRoutes({ routes }) {
    return (
        <Switch>
            {routes.map((route, i) => {
                return <RouteWithSubRoutes key={route.key} {...route} />;
            })}
            <Route component={() => <h1>Not Found!</h1>} />
        </Switch>
    );
}