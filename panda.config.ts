import { recipes, slotRecipes } from "@/theme/recipes";
import { defineColorTokens } from "@/theme/tokens/colors";
import { defineConfig } from "@pandacss/dev";

export default defineConfig({
	preflight: true,
	include: [
		"./src/components/**/*.{ts,tsx,js,jsx}",
		"./src/app/**/*.{ts,tsx,js,jsx}",
	],
	exclude: [],
	jsxFramework: "react",
	theme: {
		extend: {
			tokens: {
				colors: defineColorTokens,
			},
		},
		recipes,
		slotRecipes
	},
	outdir: "styled-system",
});
