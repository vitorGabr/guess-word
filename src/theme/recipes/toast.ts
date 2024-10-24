import { defineSlotRecipe } from "@pandacss/dev";

export const toast = defineSlotRecipe({
	className: "toast",
	slots: [
		"title",
		"root",
		"group",
		"description",
		"actionTrigger",
		"closeTrigger",
	],
	base: {
		root: {
			background: "accent.default",
			borderRadius: "l2",
			boxShadow: "lg",
			opacity: "var(--opacity)",
			overflowWrap: "anywhere",
			px: "4",
			py: "2",
			position: "relative",
			scale: "var(--scale)",
			translate: "var(--x) var(--y) 0",
			willChange: "translate, opacity, scale",
			zIndex: "var(--z-index)",
			transitionDuration: "slow",
			transitionProperty: "translate, scale, opacity, height",
			transitionTimingFunction: "default",
		},
		title: {
			color: "fg.default",
			fontWeight: "semibold",
			textStyle: "xs",
			textAlign: "center",
		},
	},
});
