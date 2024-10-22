import { KEYS, WEIGHT_STATUS } from "@/constants/keyboard";
import { useGameActorRef } from "@/lib/state/machine";
import type { GameFeedback } from "@/lib/db/schema";
import { Flex, Stack, styled } from "@/styled-system/jsx";
import { key } from "@/styled-system/recipes";
import { useCallback, useMemo } from "react";

type Props = {
	feedback: GameFeedback[][];
};

const KEY_LABELS = {
	enter: "Enviar",
	backspace: "⌫",
} as Record<string, string>;

export function Keyboard({ feedback }: Props) {
	const actor = useGameActorRef();

	const distinctLetterObjects = useMemo(() => {
		const letters = feedback.flat();
		const feedbackMap = new Map<string, GameFeedback>();

		for (const letter of letters) {
			const existingLetter = feedbackMap.get(letter.letter);

			if (
				!existingLetter ||
				WEIGHT_STATUS.indexOf(existingLetter.status) <
					WEIGHT_STATUS.indexOf(letter.status)
			) {
				feedbackMap.set(letter.letter, letter);
			}
		}

		return Array.from(feedbackMap.values());
	}, [feedback]);

	const handleClick = useCallback(
		(letter: string) => {
			switch (letter) {
				case "enter":
					actor.send({ type: "SUBMIT_GUESS" });
					break;
				case "backspace":
					actor.send({ type: "BACKSPACE" });
					break;
				default:
					actor.send({ type: "INPUT_LETTER", letter });
			}
		},
		[actor],
	);

	const showKeyLetter = (letter: string) => KEY_LABELS[letter] || letter;

	return (
		<Stack
			mx="auto"
			alignItems={"center"}
			gap="2"
			mb="4"
			mdDown={{
				w: "full",
				px: "2",
			}}
		>
			{KEYS.map((row, i) => (
				<Flex
					key={i}
					gap="2"
					w={"full"}
					alignItems={"center"}
					justifyContent={"center"}
				>
					{row.map((k) => {
						const feedback = distinctLetterObjects.find(
							(item) => item.letter === k,
						);
						return (
							<KeyItem
								className={key()}
								key={k}
								aria-label={`Tecla ${k}`}
								data-feedback={feedback?.status ?? "untouched"}
								onClick={() => handleClick(k)}
								type="button"
								data-letter={k}
							>
								{showKeyLetter(k)}
							</KeyItem>
						);
					})}
				</Flex>
			))}
		</Stack>
	);
}

const KeyItem = styled("button", key);
