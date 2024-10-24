import { DEFAULTS } from "@/constants/default";
import type { GameFeedback } from "@/lib/db/schema";
import { useGameActorRef, useGameSelector } from "@/lib/state/machine";
import { Flex, Stack, styled } from "@/styled-system/jsx";
import { word } from "@/styled-system/recipes";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

type WordsProps = {
	feedback: GameFeedback[][];
};

export function Words({ feedback }: WordsProps) {
	const currentGuess = useGameSelector((state) => state.context.currentGuess);
	const currentCol = useGameSelector((state) => state.context.currentCol);
	const isInvalidWord = useGameSelector((state) =>
		state.matches("invalidWord"),
	);

	const actorRef = useGameActorRef();
	const currentRow = feedback.length;
	const controls = useAnimation();
	const shakeVariants = {
		shake: {
			x: [0, -10, 10, -10, 10, 0],
			transition: { duration: 0.3 },
		},
	};
	const flipVariants = {
		hidden: { rotateX: 90 },
		visible: (i: number) => ({
			rotateX: 0,
			transition: {
				delay: i * 0.2, // Delay para cada célula
				duration: 0.5,
			},
		}),
	};

	useEffect(() => {
		if (isInvalidWord) {
			controls.start("shake");
		}
	}, [isInvalidWord, controls]);

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
			{Array.from({ length: DEFAULTS.MAX_COL + 1 }).map((_, j) => {
				return renderCell(i, j);
			})}
		</Flex>
	);

	return (
		<Stack gap="2" mx="auto" flex={1}>
			{Array.from({ length: DEFAULTS.MAX_ATTEMPTS }).map((_, i) => {
				if (i === currentRow) {
					return (
						<motion.div
							key={i}
							initial="shake"
							animate={controls}
							variants={shakeVariants}
						>
							{renderRow(i)}
						</motion.div>
					);
				}

				return renderRow(i);
			})}
		</Stack>
	);
}
