import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/about";
import BusSchedules from "../pages/busSchedules";
import GlobalPage from "../pages/global";
import CreateBusStop from "../pages/createBusStop";
import ListBusStop from "../pages/listBusStop";

export interface CustomRoute {
  path: string;
  Component: () => JSX.Element;
  label: string;
  showInMenu?: boolean;
}

export interface CustomRouteMain {
  path: string;
  routes: CustomRoute[];
}
const routes: CustomRouteMain[] = [
  {
    path: "",
    routes: [
      { path: "", Component: Home, label: "Home", showInMenu: true },
      { path: "about", Component: About, label: "Sobre Nós", showInMenu: true },
      {
        path: "bus-schedules",
        Component: BusSchedules,
        label: "Horários dos Ônubus",
        showInMenu: true,
      },
    ],
  },
  {
    path: "admin",
    routes: [
      {
        path: "bus-stop",
        Component: ListBusStop,
        label: "Listar Pontos de Ônibus",
        showInMenu: true,
      },
      {
        path: "bus-stop/:id",
        Component: CreateBusStop,
        label: "Editar Ponto de Ônibus",
        showInMenu: false,
      },
      {
        path: "bus-stop/create",
        Component: CreateBusStop,
        label: "Criar Ponto de Ônibus",
        showInMenu: true,
      },
    ],
  },
];

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <GlobalPage routes={routes}>
        <Routes>
          {routes.map((route) =>
            route.routes.map((routeChildren) => (
              <Route
                key={routeChildren.path}
                path={route.path + "/" + routeChildren.path}
                element={<routeChildren.Component />}
              />
            ))
          )}
        </Routes>
      </GlobalPage>
    </BrowserRouter>
  );
};

export { routes }; // Exporta o array de rotas
export default AppRoutes;
