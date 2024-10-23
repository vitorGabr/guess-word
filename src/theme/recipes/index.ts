import type {
	RecipeConfig,
	RecipeVariantRecord,
	SlotRecipeConfig,
} from "@pandacss/dev";
import { dialog } from "./dialog";
import { icon } from "./icon";
import { key } from "./key";
import { text } from "./text";
import { word } from "./word";

export const recipes: Record<string, RecipeConfig<RecipeVariantRecord>> = {
	key,
	word,
	text,
	icon,
};

export const slotRecipes: Record<string, SlotRecipeConfig> = {
	dialog,
};
