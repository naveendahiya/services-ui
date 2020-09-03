import React from "react";
import { Route, Switch } from "react-router-dom";

import TaskForm from "../components/taskForm";
import Home from '../components/home';
import Tasks from "../components/tasklist";
import TaskDetail from "../components/taskDetail";

const ROUTES = [
    { path: "/", key: "ROOT", exact: true, component: () => <h1>Log in</h1> },
    {
        path: "/app",
        key: "APP",
        component: RenderRoutes,
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
                path: '/app/tasks/:name',
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