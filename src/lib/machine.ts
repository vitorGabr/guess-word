import { saveGameForToday } from "@/lib/utils";
import { createActorContext } from "@xstate/react";
import dict from "public/_static/dicionario.json";
import { assign, setup } from "xstate";
import type { GameFeedback, GameSchema } from "./schema";

export const gameMachine = setup({
	types: {
		context: {} as GameSchema["context"],
		events: {} as
			| { type: "INPUT_LETTER"; letter: string }
			| { type: "BACKSPACE" }
			| { type: "EDIT_LETTER_POSITION"; col: number }
			| { type: "SUBMIT_GUESS" }
			| { type: "ARROW_CHANGE"; direction: "left" | "right" },
	},
	guards: {},
	actions: {
		giveFeedback: assign(({ context }) => {
			const { currentGuess, targetWord } = context;

			const splitWord = targetWord.split("");
			const feedback: GameFeedback[] = [];

			const letterCountMap = splitWord.reduce(
				(acc, letter) => {
					acc[letter] = (acc[letter] || 0) + 1;
					return acc;
				},
				{} as Record<string, number>,
			);

			currentGuess.forEach((letter, index) => {
				if (letter === splitWord[index]) {
					feedback.push({
						letter,
						status: "correct",
					});
					letterCountMap[letter] -= 1;
				} else if (letterCountMap[letter] > 0) {
					feedback.push({
						letter,
						status: "present",
					});
					letterCountMap[letter] -= 1;
				} else {
					feedback.push({
						letter,
						status: "absent",
					});
				}
			});

			return {
				feedback: [...context.feedback, feedback],
				currentCol: 0,
				currentGuess: [],
			};
		}),
	},
}).createMachine({
	context: ({ input }) => {
		return {
			feedback: [],
			currentCol: 0,
			targetWord: input as string,
			currentGuess: [],
		};
	},
	id: "wordle",
	initial: "playing",
	states: {
		playing: {
			on: {
				INPUT_LETTER: {
					actions: assign(({ context, event }) => {
						const { currentGuess, currentCol } = context;
						const col = Math.min(currentCol, 5 - 1);
						const newGuess = [...currentGuess];

						newGuess[col] = event.letter;

						return {
							currentGuess: newGuess,
							currentCol: Math.min(currentCol + 1, 4),
						};
					}),
				},
				BACKSPACE: {
					actions: assign(({ context }) => {
						const { currentGuess, currentCol } = context;
						const newGuess = [...currentGuess];
						const current = newGuess[currentCol] ?? "";
						const col = currentCol - (current.length === 0 ? 1 : 0);
						newGuess[col] = "";

						return {
							currentCol: Math.max(0, currentCol - 1),
							currentGuess: newGuess,
						};
					}),
				},
				EDIT_LETTER_POSITION: {
					actions: assign(({ event }) => {
						return {
							currentCol: event.col,
						};
					}),
				},
				SUBMIT_GUESS: {
					target: "checking",
					guard: ({ context }) =>
						context.currentGuess.join("").length === context.targetWord.length,
				},
				ARROW_CHANGE: {
					actions: assign(({ context, event }) => {
						const { direction } = event;
						const { currentCol } = context;
						const maxCol = 4;
						const newCol =
							direction === "left" ? currentCol - 1 : currentCol + 1;
						return {
							currentCol: Math.min(Math.max(0, newCol), maxCol),
						};
					}),
				},
			},
		},
		checking: {
			always: [
				{
					target: "won",
					guard: ({ context }) => {
						const { currentGuess, targetWord } = context;
						return currentGuess.join("") === targetWord;
					},
					actions: [
						{
							type: "giveFeedback",
						},
					],
				},
				{
					target: "lost",
					guard: ({ context }) => {
						const { feedback } = context;
						const currentRow = feedback.length + 1;
						return currentRow >= 6;
					},
					actions: {
						type: "giveFeedback",
					},
				},
				{
					target: "invalidWord",
					guard: ({ context }) => {
						const { currentGuess } = context;
						return !dict.includes(currentGuess.join(""));
					},
				},
				{
					target: "playing",
					actions: [
						{
							type: "giveFeedback",
						},
						({ context }) => {
							saveGameForToday({
								context,
							});
						},
					],
				},
			],
		},
		invalidWord: {
			after: {
				50: {
					target: "playing",
				},
			},
		},
		won: {
			type: "final",
			entry: ({ context }) => {
				saveGameForToday({
					context: context,
					value: "won",
					status: "done",
				});
			},
		},
		lost: {
			type: "final",
			entry: ({ context }) => {
				saveGameForToday({
					context: context,
					value: "lost",
					status: "done",
				});
			},
		},
	},
});

export const {
	Provider: GameProvider,
	useActorRef: useGameActorRef,
	useSelector: useGameSelector,
} = createActorContext(gameMachine);
