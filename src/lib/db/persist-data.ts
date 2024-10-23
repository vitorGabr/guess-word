import dayjs from "dayjs";
import { LocalStorageAdapter } from "./adapters";
import type { StorageAdapter } from "./interfaces";
import { type GameSchema, gameSchema } from "./schema";

class PersistData {
	private storage: StorageAdapter;
	private readonly KEY = "data";

	constructor(storage: StorageAdapter) {
		this.storage = storage;
	}

	async loadGameForToday() {
		try {
			const today = dayjs().format("YYYY-MM-DD");
			const savedGameStr = await this.storage.getItem(this.KEY);
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

	async saveGameForToday(
		data: Pick<GameSchema, "context" | "value" | "status">,
	) {
		try {
			const today = dayjs().format("YYYY-MM-DD");
			const savedGameStr = await this.storage.getItem(this.KEY);
			const savedGame = savedGameStr ? JSON.parse(savedGameStr) : {};

			await this.storage.setItem(
				this.KEY,
				JSON.stringify({
					...savedGame,
					[today]: data,
				}),
			);
		} catch (error) {
			// do nothing
		}
	}

	async getGameHistory() {
		try {
			const savedGameStr = await this.storage.getItem(this.KEY);
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
}

export const persistData = new PersistData(new LocalStorageAdapter());
