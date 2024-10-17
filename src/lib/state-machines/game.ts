import { saveGameForToday } from "@/lib/utils";
import { createActorContext } from "@xstate/react";
import dict from "public/_static/dicionario.json";
import { assign, setup } from "xstate";

type Event =
	| { type: "INPUT_LETTER"; letter: string }
	| { type: "BACKSPACE" }
	| { type: "EDIT_LETTER_POSITION"; col: number }
	| { type: "SUBMIT_GUESS" };

type Context = {
	feedback: {
		letter: string;
		status: "correct" | "present" | "absent";
	}[][];
	currentCol: number;
	targetWord: string;
	maxAttempts: number;
	currentGuess: string[];
	isInvalidWord?: boolean;
};

export const machine = setup({
	types: {
		context: {} as Context,
		events: {} as Event,
	},
	guards: {},
}).createMachine({
	context: ({ input }) => {
		return {
			feedback: [],
			currentCol: 0,
			isInvalidWord: false,
			targetWord: input as string,
			maxAttempts: 6,
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
						const { currentGuess, currentCol, targetWord } = context;

						const maxCol = targetWord.length;
						const col = Math.min(currentCol, maxCol - 1);
						const newGuess = [...currentGuess];

						newGuess[col] = event.letter;

						return {
							currentGuess: newGuess,
							currentCol: Math.min(currentCol + 1, maxCol),
						};
					}),
				},
				BACKSPACE: {
					actions: assign(({ context }) => {
						const { currentGuess, currentCol } = context;
						if (currentCol > 0) {
							const newGuess = [...currentGuess];
							newGuess[currentCol - 1] = "";
							return {
								currentGuess: newGuess,
								currentCol: currentCol - 1,
							};
						}
						return context;
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
				},
				{
					target: "lost",
					guard: ({ context }) => {
						const { maxAttempts, feedback } = context;
						const currentRow = feedback.length + 1;
						return currentRow >= maxAttempts;
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
					actions: assign(({ context }) => {
						const { currentGuess, targetWord } = context;

						const splitWord = targetWord.split("");
						const feedback: Context["feedback"][number] = [];

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

						const response = {
							feedback: [...context.feedback, feedback],
							currentCol: 0,
							currentGuess: [],
						};

						return response;
					}),
				},
			],
		},
		invalidWord: {
			entry: assign({ isInvalidWord: true }),
			always: { target: "playing" },
		},
		won: {
			type: "final",
		},
		lost: {
			type: "final",
		},
	},
});

export const {
	Provider: GameProvider,
	useActorRef: useGameActorRef,
	useSelector: useGameSelector,
} = createActorContext(machine, {
	inspect(inspectionEvent) {
		if (inspectionEvent.type === "@xstate.snapshot") {
			saveGameForToday(inspectionEvent.snapshot);
		}
	},
});
