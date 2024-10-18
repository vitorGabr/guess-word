import { z } from "zod";

const feedback = z.object({
	letter: z.string(),
	status: z.enum(["correct", "present", "absent"]).optional(),
});

export const gameSchema = z.record(
	z.string(),
	z.object({
		status: z.enum(["active", "done", "error", "stopped"]).default("active"),
		context: z.object({
			feedback: z.array(z.array(feedback).max(5)),
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

export type GameSchema = z.input<typeof gameSchema>[string];
export type GameFeedback = z.input<typeof feedback>;
