"use client";

import { z } from "zod";

const schema = z.record(
	z.string(),
	z.object({
		status: z.enum(["active", "done", "error", "stopped"]).default("active"),
		context: z.object({
			feedback: z.array(
				z
					.array(
						z.object({
							letter: z.string(),
							status: z.enum(["correct", "present", "absent"]).optional(),
						}),
					)
					.max(5),
			),
			currentCol: z.number().max(5),
			targetWord: z.string().max(5),
			currentGuess: z.array(z.string()).max(5),
		}),
		value: z.enum(["playing", "checking", "won", "lost"]).default("playing"),
		children: z.any().default({}),
		historyValue: z.any().default({}),
		tags: z.array(z.any()).default([]),
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

export function saveGameForToday(data:  z.input<typeof schema>[string]) {
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
