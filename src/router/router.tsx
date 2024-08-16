import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/about";
import GlobalPage from "../pages/global";
import CreateOrUpdateBusStop from "../pages/busStop/createOrEditBusStop";
import ListBusStop from "../pages/busStop/listBusStop";
import ListTrip from "../pages/trip/listTrip";
import CreateOrEditTravelSchedule from "../pages/travelSchedule/createOrEditTravelSchedule";
import ListTravelSchedule from "../pages/travelSchedule/listTravelSchedule";
import CreatOrEditTrip from "../pages/trip/createOrEditTrip";
export interface CustomRoute {
  path: string;
  Component: () => JSX.Element;
  label: string;
  showInMenu?: boolean;
  help: Array<{
    title: string,
    text: string;
  }>,
  imgHelp?: any
}

export interface CustomRouteMain {
  path: string;
  routes: CustomRoute[];
}
const routes: CustomRouteMain[] = [
  {
    path: "",
    routes: [
      {
        path: "", Component: Home, label: "Home", showInMenu: true,
        help: [
          {
            title: 'Selecione os Pontos de Partida e Chegada',
            text: 'Você pode escolher de onde você está saindo e para onde deseja ir usando os menus de seleção disponíveis.'
          }
          , {
            title: 'Veja a Rota no Mapa',
            text: 'Depois de selecionar os pontos, a página calcula a melhor rota entre eles e mostra essa rota em um mapa.'
          }]
      },
      {
        path: "bus-schedules",
        Component: () => <ListTravelSchedule commonUser={true} />,
        label: "Horários dos Ônubus",
        showInMenu: true,
        help: []
      },
      {
        path: "about", Component: About, label: "Sobre Nós", showInMenu: true,
        help: []
      },
    ],
  },
  {
    path: "admin",
    routes: [
      {
        path: "bus-stop",
        Component: ListBusStop,
        label: "Pontos de Ônibus",
        showInMenu: true,
        help: []
      },
      {
        path: "bus-stop/edit/:id",
        Component: CreateOrUpdateBusStop,
        label: "Editar Ponto de Ônibus",
        showInMenu: false,
        help: []
      },
      {
        path: "bus-stop/create",
        Component: CreateOrUpdateBusStop,
        label: "Criar Ponto de Ônibus",
        showInMenu: true,
        help: []
      },
      {
        path: "trip",
        Component: ListTrip,
        label: "Viagens de Ônibus",
        showInMenu: true,
        help: []
      },
      {
        path: "trip/edit/:id",
        Component: CreatOrEditTrip,
        label: "Editar Viagens de Ônibus",
        showInMenu: false,
        help: []
      },
      {
        path: "trip/create",
        Component: CreatOrEditTrip,
        label: "Criar Viagens de Ônibus",
        showInMenu: true,
        help: []
      },
      {
        path: "travel-schedule",
        Component: () => <ListTravelSchedule commonUser={false} />,
        label: "Horários dos Ônibus",
        showInMenu: true,
        help: []
      },
      {
        path: "travel-schedule/edit/:id",
        Component: CreateOrEditTravelSchedule,
        label: "Editar os Horários dos Ônibus",
        showInMenu: false,
        help: []
      },
      {
        path: "travel-schedule/create",
        Component: CreateOrEditTravelSchedule,
        label: "Criar Horário dos Ônibus",
        showInMenu: true,
        help: []
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
