import React from 'react';
import "@fontsource/roboto";
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PUBLIC_ROUTE_PAGE } from './routes/routes';
import PublicWraper from './components/PublicWraper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import theme from './theme/theme';


const App = () => {
    const renderRouter = () => {
        return createBrowserRouter(
            PUBLIC_ROUTE_PAGE.map((route: any) => ({
                path: route.path,
                element: (
                    <PublicWraper>
                        {React.createElement(route.element)}
                    </PublicWraper>
                ),
                children: route.children,
            }))
        );
    };

    return (
        <RouterProvider router={renderRouter()} />
    );
};

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
