import type { GameFeedback } from "../db/schema";

export function calculateFeedback(currentGuess: string[], targetWord: string) {
	const splitWord = targetWord.split("");
	const feedback: GameFeedback[] = [];

	const letterCountMap = splitWord.reduce(
		(acc, letter, index) => {
			if (currentGuess[index] !== letter) {
				acc[letter] = (acc[letter] || 0) + 1;
			}
			return acc;
		},
		{} as Record<string, number>,
	);

	currentGuess.forEach((letter, index) => {
		const correct = letter === splitWord[index];
		const letterCountValue = letterCountMap[letter] || 0;
		feedback[index] = {
			letter,
			status: "absent",
		};
		if (correct || letterCountValue > 0) {
			const isCorrect = letter === splitWord[index];
			letterCountMap[letter]--;
			feedback[index] = {
				letter,
				status: isCorrect ? "correct" : "present",
			};
		}
	});

	return feedback;
}
