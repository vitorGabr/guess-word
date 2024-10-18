import { useGameActorRef, useGameSelector } from "@/lib/machine";
import type { GameFeedback } from "@/lib/schema";
import { css, cx } from "@/styled-system/css";
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
			<styled.div
				key={`${i}-${j}`}
				className={cx(
					word(),
					currentRow === i && currentCol === j && css({ borderColor: "fg.default" }),
				)}
				data-feedback={feedbackLetter?.status ?? "absent"}
				aria-label={`Letter position ${j + 1}, row ${i + 1}`}
				onClick={() => actorRef.send({ type: "EDIT_LETTER_POSITION", col: j })}
			>
				{(feedbackLetter?.letter || "").toUpperCase()}
			</styled.div>
		);
	};
	
	const renderRow = (i: number) => (
		<Flex key={i} gap="2">
			{Array.from({ length: 5 }).map((_, j) => renderCell(i, j))}
		</Flex>
	);

	return (
		<Stack gap="2" mx="auto" flex={1}>
			{Array.from({ length: 6 }).map((_, i) => renderRow(i))}
		</Stack>
	);
}
