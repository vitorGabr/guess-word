import type { GameFeedback } from "@/lib/db/schema";

export const KEYS = [
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	["a", "s", "d", "f", "g", "h", "j", "k", "l"],
	["backspace", "z", "x", "c", "v", "b", "n", "m", "enter"],
] as const;

export const WEIGHT_STATUS: GameFeedback["status"][] = [
	"absent",
	"present",
	"correct",
];
