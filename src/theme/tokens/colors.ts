import { defineTokens } from "@pandacss/dev";

export const defineColorTokens = defineTokens.colors({
	feedback: {
		correct: { value: "#28c350" },
		absent: { value: "#f0f0f0" },
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
			value: "#e3e3e3",
		}
	}
});