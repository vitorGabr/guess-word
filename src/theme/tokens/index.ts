import { defineSemanticTokens } from "@pandacss/dev";
import { defineColorTokens } from "./colors";
import { defineRadiiTokens } from "./radii";

export const createSemanticTokens = defineSemanticTokens({
	colors: defineColorTokens,
	radii: defineRadiiTokens,
});
