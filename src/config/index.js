import CraeteIncident from "../components/create";
import IncidentDetail from "../components/detail";
import AppLayout from "../Layout";
import Incident from "../pages/incident";
import Login from "../pages/login";
import ManageIncidents from "../pages/manage";

export const SESSION_TOKEN = "TOKEN";

export const Routes = {
  login: "/signin",
  landing: "/page",
  incident: "/page/incident",
  createIncident: "/page/incident/create",
  editIncident: "/page/manage/edit",
  viewIncident: "/page/manage/view",
  manage: "/page/manage",
};
export const StatusOptions = [
  { value: 0, label: "Initiated" },
  { value: 1, label: "In-Progress" },
  { value: 2, label: "Fulfilled" },
];

export const StatusMap = {
  0: "Initiated",
  1: "In-Progress",
  2: "Fulfilled",
};

const Roles = [0, 1, 2];
const RolesMap = {
  0: "Admin",
  1: "Agent",
  2: "General User",
};

export const AuthRoutes = [
  { path: Routes.landing, component: AppLayout, permission: Roles },
];
export const SubRoutes = [
  {
    path: Routes.incident,
    title: "Home",
    component: Incident,
    permission: Roles,
    menu: true,
  },
  {
    path: Routes.createIncident,
    title: "Create Incident",
    component: CraeteIncident,
    permission: Roles,
    menu: true,
  },
  {
    path: Routes.manage,
    title: "Manage Incident",
    component: ManageIncidents,
    permission: [1, 0],
    menu: true,
  },
  {
    path: Routes.editIncident,
    component: IncidentDetail,
    permission: Roles,
    menu: false,
  },
  {
    path: Routes.viewIncident,
    component: IncidentDetail,
    permission: Roles,
    menu: false,
  },
];
export const NoAuthRoutes = [
  { path: Routes.login, component: Login, exact: true },
];
