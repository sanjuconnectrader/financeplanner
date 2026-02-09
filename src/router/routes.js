const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", redirect: "/dashboard" },

      { path: "dashboard", component: () => import("pages/admin/DashboardPage.vue") },
      { path: "clients", component: () => import("pages/admin/ClientsPage.vue") },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
