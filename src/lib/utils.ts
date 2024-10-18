import { type GameSchema, gameSchema } from "./schema";
import dayjs from "dayjs";

export const loadGameForToday = () => {
	try {
		const today = dayjs().format("YYYY-MM-DD");
		const savedGame = JSON.parse(localStorage.getItem("data") || "{}");
		const parsedGame = gameSchema.parse(savedGame);
		return parsedGame[today];
	} catch (error) {
		return null;
	}
};

export function saveGameForToday(data: GameSchema) {
	try {
		const today = dayjs().format("YYYY-MM-DD");
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
