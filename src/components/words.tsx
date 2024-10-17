import { useGameActorRef, useGameSelector } from "@/lib/state-machines/game";
import { styled } from "@/styled-system/jsx";

interface Feedback {
	letter: string;
	status?: string;
}

type WordsProps = {
	feedback: Feedback[][];
};

export function Words({ feedback }: WordsProps) {
	const currentGuess = useGameSelector((state) => state.context.currentGuess);
	const actorRef = useGameActorRef();
	const currentRow = feedback.length;

	const renderCell = (i: number, j: number) => {
		let feedbackLetter: Feedback | null = null;

		if (feedback[i]?.[j]) {
			feedbackLetter = feedback[i][j];
		}

		if (currentRow === i && currentGuess[j]) {
			feedbackLetter = { letter: currentGuess[j] };
		}

		return (
			<styled.div
				key={`${i}-${j}`}
				width="12"
				height="12"
				border="1px solid black"
				margin="2px"
				display="flex"
				alignItems="center"
				justifyContent="center"
				aria-label={`Letter position ${j + 1}, row ${i + 1}`}
				onClick={() => actorRef.send({ type: "EDIT_LETTER_POSITION", col: j })}
				rounded="lg"
			>
				{feedbackLetter?.letter || ""}
			</styled.div>
		);
	};

	const renderRow = (i: number) => (
		<div
			key={i}
			style={{
				display: "flex",
				flexDirection: "row",
			}}
		>
			{Array.from({ length: 5 }).map((_, j) => renderCell(i, j))}
		</div>
	);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
			}}
		>
			{Array.from({ length: 6 }).map((_, i) => renderRow(i))}
		</div>
	);
}
