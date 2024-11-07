import { DEFAULTS } from "@/constants/default";
import type { GameFeedback } from "@/lib/db/schema";
import { useGameActorRef, useGameSelector } from "@/lib/state/game-machine";
import { Flex, Stack, styled } from "@/styled-system/jsx";
import { word } from "@/styled-system/recipes";

type WordsProps = {
	feedback: GameFeedback[][];
};

export function Words({ feedback }: WordsProps) {
	const actorRef = useGameActorRef();
	const currentGuess = useGameSelector((state) => state.context.currentGuess);
	const currentCol = useGameSelector((state) => state.context.currentCol);
	const isInvalidWord = useGameSelector((state) =>
		state.matches("invalidWord"),
	);
	const currentRow = feedback.length;

	const renderCell = (row: number, col: number) => {
		let feedbackLetter: GameFeedback | null = null;
		if (feedback[row]?.[col]) feedbackLetter = feedback[row][col];
		if (currentRow === row && currentGuess[col]) {
			feedbackLetter = { letter: currentGuess[col] };
		}

		return (
			<styled.button
				key={`${row}-${col}`}
				className={word()}
				data-status={currentRow === row && currentCol === col && "active"}
				data-feedback={feedbackLetter?.status}
				aria-label={`Letter position ${col + 1}, row ${row + 1}`}
				type="button"
				onClick={() => actorRef.send({ type: "EDIT_LETTER_POSITION", col: col })}
			>
				{(feedbackLetter?.letter || "").toUpperCase()}
			</styled.button>
		);
	};

	return (
		<Stack gap="2" mx="auto" flex={1}>
			{Array.from({ length: DEFAULTS.MAX_ATTEMPTS }).map((_, i) => {
				const isShowInvalidWord = isInvalidWord && i === currentRow;
				return (
					<Flex key={i} gap="2" animation={isShowInvalidWord ? "shake" : undefined}>
						{Array.from({ length: DEFAULTS.MAX_COL + 1 }).map((_, j) => {
							return renderCell(i, j);
						})}
					</Flex>
				);
			})}
		</Stack>
	);
}
