import { Reaction } from "/server/api";

Reaction.registerPackage({
	label: "Actionable Analytics",
	name: "reaction-actionable-analytics",
	icon: "fa fa-bar-chart",
	autoEnable: true,
	setting: {
		name: "Actionable Analytics"
	},
	registry: [{
		provides: "dashboard",
		workflow: "coreDashboardWorkflow",
		template: "actionableAnalytics",
		name: "actionableAnalytics",
		label: "Actionable Analytics",
		description: "Reaction core shop analytics",
		icon: "fa fa-bar-chart",
		priority: 1,
		container: "core",
		permissions: [{
			label: "Dashboard",
			permission: "dashboard"
		}]
	},
	 {
    route: "/dashboard/actionable-analytics",
    template: "actionableAnalytics",
    name: "actionableAnalytics",
    label: "Actionable Analytics",
    provides: "dashboard",
    container: "core"
  }]
})
