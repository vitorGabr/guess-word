import { defineTokens } from "@pandacss/dev";

export const defineColorTokens = defineTokens.colors({
	feedback: {
		correct: { value: "#28c350" },
		absent: { value: "#d5d5d6" },
		present: { value: "#ff9000" },
	},
	bg: {
		default: {
			value: "#ffffff",
		},
	},
	fg: {
		default: {
			value: "#1d1e2e",
		},
		subtle: {
			value: "#d5d4d6",
		},
		muted: {
			value: "#e3e3e3",
		},
	},
});
