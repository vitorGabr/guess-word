import type { RecipeConfig, RecipeVariantRecord } from "@pandacss/dev";
import { key } from "./key";
import { text } from "./text";
import { word } from "./word";

export const recipes: Record<string, RecipeConfig<RecipeVariantRecord>> = {
	key,
	word,
	text,
};
