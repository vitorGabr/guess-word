import { defineSlotRecipe } from "@pandacss/dev";

export const dialog = defineSlotRecipe({
	className: "dialog",
	slots: [
		"title",
		"content",
		"trigger",
		"backdrop",
		"positioner",
		"description",
		"closeTrigger",
	],
	base: {
		backdrop: {
			backdropFilter: "blur(4px)",
			background: "rgba(0, 0, 0, 0.5)",
			height: "100vh",
			left: "0",
			position: "fixed",
			top: "0",
			width: "100vw",
			zIndex: "overlay",
			_open: {
				animation: "backdrop-in",
			},
			_closed: {
				animation: "backdrop-out",
			},
		},
		positioner: {
			alignItems: "center",
			display: "flex",
			justifyContent: "center",
			left: "0",
			overflow: "auto",
			position: "fixed",
			top: "0",
			width: "100vw",
			height: "100dvh",
			zIndex: "modal",
		},
		content: {
			background: "bg.default",
			borderRadius: "xl",
			boxShadow: "lg",
			position: "relative",
			mdDown: {
				mx: "4",
			},
			_open: {
				animation: "dialog-in",
			},
			_closed: {
				animation: "dialog-out",
			},
		},
		title: {
			fontWeight: "semibold",
			textStyle: "lg",
		},
		description: {
			color: "fg.muted",
			textStyle: "sm",
		},
	},
});
