import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import {
	loadGameForToday,
	saveGameForToday,
	getGameHistory,
} from "../src/lib/persist-data";
import type { GameSchema } from "../src/lib/schema";

vi.mock("dayjs", () => ({
	default: () => ({
		format: () => "2023-10-26",
	}),
}));

describe("Game functions", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	afterEach(() => {
		localStorage.clear();
	});

	it("should load game for today", () => {
		const gameData: GameSchema = {
			status: "done",
			context: {
				feedback: [
					[
						{ letter: "t", status: "correct" },
						{ letter: "e", status: "absent" },
						{ letter: "s", status: "present" },
						{ letter: "t", status: "correct" },
						{ letter: "e", status: "absent" },
					],
				],
				currentCol: 1,
				targetWord: "tests",
				currentGuess: ["tests"],
			},
			value: "won",
			children: {},
			historyValue: {},
			tags: [],
		};
		localStorage.setItem(
			"data",
			JSON.stringify({
				"2023-10-26": gameData,
			}),
		);
		expect(loadGameForToday()).toEqual(gameData);
	});

	it("should return null if no game found for today", () => {
		expect(loadGameForToday()).toBeNull();
	});

	it("should save game for today", () => {
		const gameData: GameSchema = {
			status: "active",
			context: {
				feedback: [],
				currentCol: 0,
				targetWord: "tests",
				currentGuess: [],
			},
			value: "playing",
			children: {},
			historyValue: {},
			tags: [],
		};
		saveGameForToday(gameData);
		expect(JSON.parse(localStorage.getItem("data") || "{}")).toEqual({
			"2023-10-26": gameData,
		});
	});

	it("should get game history", () => {
		const gameData = {
			"2023-10-25": {
				status: "done",
				context: {
					feedback: [
						[
							{ letter: "t", status: "correct" },
							{ letter: "e", status: "absent" },
							{ letter: "s", status: "present" },
							{ letter: "t", status: "correct" },
							{ letter: "e", status: "absent" },
						],
					],
					currentCol: 1,
					targetWord: "tests",
					currentGuess: ["tests"],
				},
				value: "won",
				children: {},
				historyValue: {},
				tags: [],
			},
			"2023-10-26": {
				status: "done",
				context: {
					feedback: [],
					currentCol: 0,
					targetWord: "tests",
					currentGuess: [],
				},
				value: "lost",
				children: {},
				historyValue: {},
				tags: [],
			},
		} satisfies Record<string, GameSchema>;
		localStorage.setItem("data", JSON.stringify(gameData));

		const expectedHistory = {
			history: gameData,
			total: 2,
			won: 1,
		};
		expect(getGameHistory()).toEqual(expectedHistory);
	});

	it("should return empty object if no game history found", () => {
		expect(getGameHistory()).toEqual({
			history: {},
			total: 0,
			won: 0,
		});
	});
});