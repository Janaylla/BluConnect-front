import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalPage from "../pages/global";
import { routes } from "./router";
import ProtectedRoute from "./ProtectedRoute"; // Importe o componente de rota protegida
import Login from "../pages/login/Login";
import NotFoundPage from "../pages/notFound/NotFound";
const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <Login />}
                />

                {routes.map((route) =>
                    route.routes.map((routeChildren) => {
                        const isAdminRoute = route.path === "admin"; // Verifica se é uma rota admin
                        return (
                            <Route
                                key={routeChildren.path}
                                path={route.path + "/" + routeChildren.path}
                                element={
                                    isAdminRoute ? (
                                        <ProtectedRoute>
                                            <GlobalPage routes={routes}>
                                                <routeChildren.Component />
                                            </GlobalPage>
                                        </ProtectedRoute>
                                    ) : (
                                        <GlobalPage routes={routes}>
                                            <routeChildren.Component />
                                        </GlobalPage>
                                    )
                                }
                                
                            />
                        );
                    })
                )}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
