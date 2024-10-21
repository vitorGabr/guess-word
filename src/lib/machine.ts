import { saveGameForToday } from "@/lib/utils";
import { createActorContext } from "@xstate/react";
import dict from "public/_static/dicionario.json";
import { assign, setup } from "xstate";
import type { GameFeedback, GameSchema } from "./schema";
import { DEFAULTS } from "@/constants/default";

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

			const letterCountMap = splitWord.reduce<Record<string, number>>(
				(acc, letter) => {
					acc[letter] = (acc[letter] || 0) + 1;
					return acc;
				},
				{},
			);

			currentGuess.forEach((letter, index) => {
				const correct = letter === splitWord[index];
				const letterCountValue = letterCountMap[letter] || 0;
				feedback[index] = {
					letter,
					status: "absent",
				};
				if (correct || letterCountValue) {
					const isCorrect = letter === splitWord[index];
					letterCountMap[letter]--;
					feedback[index] = {
						letter,
						status: isCorrect ? "correct" : "present",
					};
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
						const col = Math.min(currentCol, DEFAULTS.MAX_COL);
						const newGuess = [...currentGuess];

						newGuess[col] = event.letter;

						return {
							currentGuess: newGuess,
							currentCol: Math.min(currentCol + 1, DEFAULTS.MAX_COL),
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
						const newCol =
							direction === "left" ? currentCol - 1 : currentCol + 1;
						return {
							currentCol: Math.min(
								Math.max(0, newCol),
								DEFAULTS.MAX_COL,
							),
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
						return currentRow >= DEFAULTS.MAX_ATTEMPTS;
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
