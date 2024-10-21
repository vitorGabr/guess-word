import { DEFAULTS } from "@/constants/default";
import { useGameActorRef, useGameSelector } from "@/lib/machine";
import type { GameFeedback } from "@/lib/schema";
import { Flex, Stack, styled } from "@/styled-system/jsx";
import { word } from "@/styled-system/recipes";

type WordsProps = {
	feedback: GameFeedback[][];
};

export function Words({ feedback }: WordsProps) {
	const currentGuess = useGameSelector((state) => state.context.currentGuess);
	const currentCol = useGameSelector((state) => state.context.currentCol);
	const actorRef = useGameActorRef();
	const currentRow = feedback.length;

	const renderCell = (i: number, j: number) => {
		let feedbackLetter: GameFeedback | null = null;
		if (feedback[i]?.[j]) feedbackLetter = feedback[i][j];
		if (currentRow === i && currentGuess[j]) {
			feedbackLetter = { letter: currentGuess[j] };
		}
		return (
			<styled.button
				key={`${i}-${j}`}
				className={word()}
				data-status={currentRow === i && currentCol === j && "active"}
				data-feedback={feedbackLetter?.status}
				aria-label={`Letter position ${j + 1}, row ${i + 1}`}
				type="button"
				onClick={() => actorRef.send({ type: "EDIT_LETTER_POSITION", col: j })}
			>
				{(feedbackLetter?.letter || "").toUpperCase()}
			</styled.button>
		);
	};

	const renderRow = (i: number) => (
		<Flex key={i} gap="2">
			{Array.from({ length: DEFAULTS.MAX_COL + 1 }).map((_, j) => renderCell(i, j))}
		</Flex>
	);

	return (
		<Stack gap="2" mx="auto" flex={1}>
			{Array.from({ length: DEFAULTS.MAX_ATTEMPTS }).map((_, i) => renderRow(i))}
		</Stack>
	);
}
