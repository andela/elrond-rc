import { Reaction } from "/server/api";
require("dotenv").config();

Reaction.registerPackage({
  label: "PaystackPayment",
  name: "paystack",
  icon: "fa fa-credit-card-alt",
  autoEnable: true,
  settings: {
    mode: true,
    publicKey: "pk_test_3e07adc39d17fdb204c221ed2b2319ed6267d4df"
  },
  registry: [
    // Dashboard card
    {
      provides: "dashboard",
      label: "Paystack Payment",
      description: "Paystack payment provider",
      icon: "fa fa-credit-card-alt",
      priority: 3,
      container: "paymentMethod"
    },

    {
      label: "Paystack Payment Settings",
      route: "/dashboard/paystack",
      provides: "settings",
      container: "dashboard",
      template: "paystackSettings"
    },

    {
      template: "paystackPaymentForm",
      provides: "paymentMethod"
    }
  ]
});
