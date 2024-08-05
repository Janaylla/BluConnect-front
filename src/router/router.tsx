import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/about";
import GlobalPage from "../pages/global";
import CreateBusStop from "../pages/busStop/createBusStop";
import ListBusStop from "../pages/busStop/listBusStop";
import EditBusStop from "../pages/busStop/editBusStop";
import ListTrip from "../pages/trip/listTrip";
import EditTrip from "../pages/trip/editTrip";
import CreateTrip from "../pages/trip/createTrip";
import CreateOrEditTravelSchedule from "../pages/travelSchedule/createOrEditTravelSchedule";
import ListTravelSchedule from "../pages/travelSchedule/listTravelSchedule";
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
      {
        path: "bus-schedules",
        Component: () => <ListTravelSchedule commonUser={true}/>,
        label: "Horários dos Ônubus",
        showInMenu: true,
      },
      { path: "about", Component: About, label: "Sobre Nós", showInMenu: true },
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
        path: "bus-stop/edit/:id",
        Component: EditBusStop,
        label: "Editar Ponto de Ônibus",
        showInMenu: false,
      },
      {
        path: "bus-stop/create",
        Component: CreateBusStop,
        label: "Criar Ponto de Ônibus",
        showInMenu: true,
      },
      {
        path: "trip",
        Component: ListTrip,
        label: "Listar Viagens de Ônibus",
        showInMenu: true,
      },
      {
        path: "trip/edit/:id",
        Component: EditTrip,
        label: "Editar Viagens de Ônibus",
        showInMenu: false,
      },
      {
        path: "trip/create",
        Component: CreateTrip,
        label: "Criar Viagens de Ônibus",
        showInMenu: true,
      },
      {
        path: "travel-schedule",
        Component: () => <ListTravelSchedule commonUser={false}/>,
        label: "Listar os Horários dos Ônibus",
        showInMenu: true,
      },
      {
        path: "travel-schedule/edit/:id",
        Component: CreateOrEditTravelSchedule,
        label: "Editar os Horários dos Ônibus",
        showInMenu: false,
      },
      {
        path: "travel-schedule/create",
        Component: CreateOrEditTravelSchedule,
        label: "Criar os Horários dos Ônibus",
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
