import { defineSemanticTokens, defineTokens } from "@pandacss/dev";
import { defineColorTokens } from "./colors";
import { defineRadiiTokens } from "./radii";
import { animations } from "./animations";

export const createSemanticTokens = defineSemanticTokens({
	colors: defineColorTokens,
	radii: defineRadiiTokens,
});

export const createTokens = defineTokens({
	animations
})