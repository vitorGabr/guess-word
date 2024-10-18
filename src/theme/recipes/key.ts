import { defineRecipe } from "@pandacss/dev";

export const key = defineRecipe({
	className: "key",
	base: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		cursor: "pointer",
		md: {
			minW: "10",
			minH: "10",
			fontSize: "lg",
			'&[data-letter="enter"]': {
				fontSize: "md",
				px: "1",
			},
		},
		mdDown: {
			minW: "7",
			h: "10",
			fontSize: "sm",
			'&[data-letter="enter"]': {
				fontSize: "xs",
				px: "1",
			},
		},
		rounded: "sm",
		color: "text",
		fontWeight: "bold",
		textTransform: "uppercase",
		bg: "feedback.absent",
	},
});
