import { defineTokens } from "@pandacss/dev";

export const defineColorTokens = defineTokens.colors({
	feedback: {
		correct: { value: "#28c350" },
		absent: { value: "#f0f0f0" },
		present: { value: "#ff9000" },
	},
	bg: {
		DEFAULT: {
			value: "#ffffff",
		},
	},
    text: {
        DEFAULT: {
            value: "#1d1e2e",
        }
    }
});