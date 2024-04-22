import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/about";
import BusSchedules from "../pages/busSchedules";
import GlobalPage from "../pages/global";

export interface CustomRoute {
  path: string;
  Component: () => JSX.Element;
  label: string;
}

const routes: CustomRoute[] = [
  { path: "/", Component: Home, label: "Home" },
  { path: "/about", Component: About, label: "Sobre Nós" },
  {
    path: "/bus-schedules",
    Component: BusSchedules,
    label: "Horários dos Ônubus",
  },
];

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <GlobalPage routes={routes}>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.Component />}
            />
          ))}
        </Routes>
      </GlobalPage>
    </BrowserRouter>
  );
};

export { routes }; // Exporta o array de rotas
export default AppRoutes;
