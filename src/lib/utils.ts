import dayjs from "dayjs";
import { type GameSchema, gameSchema } from "./schema";

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

export function saveGameForToday(
	data: Pick<GameSchema, "context" | "value" | "status">,
) {
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

export function getGameHistory() {
	try {
		const savedGame = JSON.parse(localStorage.getItem("data") || "{}");
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
