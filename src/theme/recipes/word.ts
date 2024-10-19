import { defineRecipe } from "@pandacss/dev";

export const word = defineRecipe({
	className: "word",
	base: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "12",
		height: "12",
		border: "2px solid",
		borderColor: "fg.subtle",
		rounded: "xl",
		color: "fg.default",
		fontSize: "2xl",
		fontWeight: "bold",
		cursor: "pointer",
		bg: "fg.subtle",
		'&[data-status="active"]': {
			borderColor: "fg.default"
		},
		'&[data-feedback="correct"]': {
			borderColor: "feedback.correct",
		},
		'&[data-feedback="absent"]': {
			bg: "feedback.absent",
			borderColor: "feedback.absent",
		},
		'&[data-feedback="present"]': {
			borderColor: "feedback.present",
			borderStyle: "dashed",
		},
	},
});
