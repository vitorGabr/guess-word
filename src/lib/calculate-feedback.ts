import type { GameFeedback } from "./schema";

export function calculateFeedback(currentGuess: string[], targetWord: string) {
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

	return feedback;
}
