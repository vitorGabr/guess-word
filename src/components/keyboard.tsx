import { useGameActorRef } from "@/lib/machine";
import type { GameFeedback } from "@/lib/schema";
import { Center, Flex, Stack, styled } from "@/styled-system/jsx";
import { useMemo } from "react";

type Props = {
	feedback: GameFeedback[][];
};

const KEYS = [
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	["a", "s", "d", "f", "g", "h", "j", "k", "l"],
	["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
] as const;

export function Keyboard({ feedback }: Props) {
	const actor = useGameActorRef();
	const distinctLetters = useMemo(() => {
		const allLetters = feedback.flat().map((item) => item.letter);
		return Array.from(new Set(allLetters));
	}, [feedback]);

	function onClick(letter: (typeof KEYS)[number][number]) {
		if (letter === "enter") {
			actor.send({ type: "SUBMIT_GUESS" });
			return;
		}
		if (letter === "backspace") {
			actor.send({ type: "BACKSPACE" });
			return;
		}
		actor.send({ type: "INPUT_LETTER", letter });
	}

	return (
		<Stack mx="auto" alignItems={"center"} gap="2">
			{KEYS.map((row, i) => (
				<Flex key={i} gap="2">
					{row.map((key) => (
						<styled.button
							key={key}
							minW={8}
							minH={8}
							bg="gray.200"
							aria-label={`Tecla ${key}`}
							onClick={() => onClick(key)}
                            type="button"
						>
							{key}
						</styled.button>
					))}
				</Flex>
			))}
		</Stack>
	);
}
