const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "login", component: () => import("pages/LoginPage.vue") },
      { path: "", component: () => import("pages/DashboardPage.vue") },
      { path: "category", component: () => import("pages/CategoryView.vue") },
      { path: "income", component: () => import("pages/IncomeView.vue") },
      { path: "egress", component: () => import("pages/EgressView.vue") },
      { path: "accounts-to-pay", component: () => import("pages/AccountsPay.vue") },
      { path: "payment-methods", component: () => import("pages/PaymentMethodsView.vue") },
      {
        path: "category-report",
        component: () => import("pages/CategoryReport.vue"),
      },
      {
        path: "income-vs-egress-report",
        component: () => import("pages/IncomeVsEgressReport.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
