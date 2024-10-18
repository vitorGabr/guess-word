"use client";

import { type GameSchema, gameSchema } from "./schema";

export const loadGameForToday = () => {
	try {
		const today = new Date().toISOString().split("T")[0];
		const savedGame = JSON.parse(localStorage.getItem("data") || "{}");
		const parsedGame = gameSchema.safeParse(savedGame);
		if (parsedGame.success) {
			return parsedGame.data[today];
		}
		return null;
	} catch (error) {
		return null;
	}
};

export function saveGameForToday(data: GameSchema) {
	try {
		const today = new Date().toISOString().split("T")[0];
		const savedGame = JSON.parse(localStorage.getItem("data") || "{}");
		localStorage.setItem(
			"data",
			JSON.stringify({
				...savedGame,
				[today]: data,
			}),
		);
	} catch (error) {
		// do nothing
	}
}
