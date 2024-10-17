"use client";

import { z } from "zod";

const schema = z.record(
	z.string(),
	z.object({
		status: z.enum(["active", "done", "error", "stopped"]),
		context: z.object({
			feedback: z.array(
				z
					.array(
						z.object({
							letter: z.string(),
							status: z.enum(["correct", "present", "absent"]),
						}),
					)
					.max(5),
			),
			currentCol: z.number().max(5),
			targetWord: z.string().max(5),
			currentGuess: z.array(z.string()).max(5),
			isInvalidWord: z.boolean().optional(),
		}),
		value: z.enum(["playing", "checking", "won", "lost"]),
		children: z.unknown(),
		historyValue: z.unknown(),
		tags: z.array(z.unknown()),
	}),
);

export const loadGameForToday = () => {
	try {
		const today = new Date().toISOString().split("T")[0];
		const savedGame = JSON.parse(localStorage.getItem("data") || "{}");
		const parsedGame = schema.safeParse(savedGame);
		if (parsedGame.success) {
			return parsedGame.data[today];
		}
		return null;
	} catch (error) {
		return null;
	}
};

export function saveGameForToday(data: Record<string, unknown>) {
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
