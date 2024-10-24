import { globalCss } from "@/theme/global-css";
import { recipes, slotRecipes } from "@/theme/recipes";
import { createSemanticTokens } from "@/theme/tokens";
import { defineConfig } from "@pandacss/dev";

export default defineConfig({
	preflight: true,
	include: [
		"./src/components/**/*.{ts,tsx,js,jsx}",
		"./src/app/**/*.{ts,tsx,js,jsx}",
	],
	exclude: [],
	jsxFramework: "react",
	globalCss,
	conditions: {
		extend: {
			dark: '.dark &, [data-theme="dark"] &',
			light: ".light &",
		}
	},
	theme: {
		extend: {
			semanticTokens: createSemanticTokens,
		},
		recipes,
		slotRecipes
	},
	outdir: "styled-system",
	patterns: {
		extend: {
			container: {
				transform(props: any) {
					return {
						position: "relative",
						width: "100%",
						maxWidth: "5xl",
						mx: "auto",
						px: { base: "4", md: "0" },
						...props,
					};
				},
			},
		},
	},
});
