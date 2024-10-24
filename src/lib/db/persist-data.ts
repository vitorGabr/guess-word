import dayjs from "dayjs";
import { type GameSchema, gameSchema } from "./schema";

const KEY = "data";

function loadGameForToday() {
	try {
		const today = dayjs().format("YYYY-MM-DD");
		const savedGameStr = localStorage.getItem(KEY);
		const savedGame = savedGameStr ? JSON.parse(savedGameStr) : {};
		const parsedGame = gameSchema.parse(savedGame);

		if (today in parsedGame) {
			return parsedGame[today];
		}
		throw new Error("No game found for today");
	} catch (error) {
		return null;
	}
}

function saveGameForToday(
	data: Pick<GameSchema, "context" | "value" | "status">,
) {
	try {
		const today = dayjs().format("YYYY-MM-DD");
		const savedGameStr = localStorage.getItem(KEY);
		const savedGame = savedGameStr ? JSON.parse(savedGameStr) : {};

		localStorage.setItem(
			KEY,
			JSON.stringify({
				...savedGame,
				[today]: data,
			}),
		);
	} catch (error) {
		// do nothing
	}
}

function getGameHistory() {
	try {
		const savedGameStr = localStorage.getItem(KEY);
		const savedGame = savedGameStr ? JSON.parse(savedGameStr) : {};
		const parsedGame = gameSchema.parse(savedGame);

		return {
			history: parsedGame,
			total: Object.keys(parsedGame).length,
			won: Object.values(parsedGame).filter((item) => item.value === "won")
				.length,
		};
	} catch (error) {
		return {
			history: {},
			total: 0,
			won: 0,
		};
	}
}

export const persistData = {
	loadGameForToday,
	saveGameForToday,
	getGameHistory,
};
