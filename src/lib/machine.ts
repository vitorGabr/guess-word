import { saveGameForToday } from "@/lib/utils";
import { createActorContext } from "@xstate/react";
import dict from "public/_static/dicionario.json";
import { assign, setup } from "xstate";
import type { GameSchema } from "./schema";
import { DEFAULTS } from "@/constants/default";
import { calculateFeedback } from "./calculate-feedback";

type InputLetterEvent = { type: "INPUT_LETTER"; letter: string };
type BackspaceEvent = { type: "BACKSPACE" };
type EditLetterPositionEvent = { type: "EDIT_LETTER_POSITION"; col: number };
type SubmitGuessEvent = { type: "SUBMIT_GUESS" };
type ArrowChangeEvent = { type: "ARROW_CHANGE"; direction: "left" | "right" };

type GameEvent =
	| InputLetterEvent
	| BackspaceEvent
	| EditLetterPositionEvent
	| SubmitGuessEvent
	| ArrowChangeEvent;

const validWords = new Set(dict);

export const gameMachine = setup({
	types: {
		context: {} as GameSchema["context"],
		events: {} as GameEvent,
	},
	guards: {
		submitGuess: ({ context }) => {
			const { currentGuess, targetWord } = context;
			return currentGuess.join("").length === targetWord.length;
		},
		isInvalidWord: ({ context }) => {
			const { currentGuess } = context;
			return !validWords.has(currentGuess.join(""));
		},
		isWon: ({ context }) => {
			const { currentGuess, targetWord } = context;
			return currentGuess.join("") === targetWord;
		},
		isLost: ({ context }) => {
			const { feedback } = context;
			const currentRow = feedback.length + 1;
			return currentRow >= DEFAULTS.MAX_ATTEMPTS;
		},
	},
	actions: {
		giveFeedback: assign(({ context }) => {
			const { currentGuess, targetWord } = context;
			const feedback = calculateFeedback(currentGuess, targetWord);

			return {
				feedback: [...context.feedback, feedback],
				currentCol: 0,
				currentGuess: [],
			};
		}),
		onGetSnapshot: ({ context }, params?: { value: "lost" | "won" }) => {
			saveGameForToday({
				context,
				...(params?.value && {
					value: params.value,
					status: "done",
				}),
			});
		},
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
				ARROW_CHANGE: {
					actions: assign(({ context, event }) => {
						const { direction } = event;
						const { currentCol } = context;
						const newCol =
							direction === "left" ? currentCol - 1 : currentCol + 1;
						return {
							currentCol: Math.min(Math.max(0, newCol), DEFAULTS.MAX_COL),
						};
					}),
				},
				SUBMIT_GUESS: {
					target: "checking",
					guard: "submitGuess",
				},
			},
		},
		checking: {
			always: [
				{
					target: "won",
					guard: "isWon",
					actions: [
						{
							type: "giveFeedback",
						},
					],
				},
				{
					target: "lost",
					guard: "isLost",
					actions: {
						type: "giveFeedback",
					},
				},
				{
					target: "invalidWord",
					guard: "isInvalidWord",
				},
				{
					target: "playing",
					actions: [
						{
							type: "giveFeedback",
						},
						{
							type: "onGetSnapshot",
						},
					],
				},
			],
		},
		invalidWord: {
			after: {
				1000: {
					target: "playing",
				},
			},
		},
		won: {
			type: "final",
			entry: {
				type: "onGetSnapshot",
				params: { value: "won" },
			},
		},
		lost: {
			type: "final",
			entry: {
				type: "onGetSnapshot",
				params: { value: "lost" },
			},
		},
	},
});

export const {
	Provider: GameProvider,
	useActorRef: useGameActorRef,
	useSelector: useGameSelector,
} = createActorContext(gameMachine);
