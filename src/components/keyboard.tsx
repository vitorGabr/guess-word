import { useGameActorRef } from "@/lib/machine";
import type { GameFeedback } from "@/lib/schema";
import { Flex, Stack, styled } from "@/styled-system/jsx";
import { useMemo } from "react";
import { key } from "@/styled-system/recipes";
import { cx } from "@/styled-system/css";

type Props = {
	feedback: GameFeedback[][];
};

const KEYS = [
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	["a", "s", "d", "f", "g", "h", "j", "k", "l"],
	["backspace", "z", "x", "c", "v", "b", "n", "m", "enter"],
] as const;

type KeyItem = (typeof KEYS)[number][number];

export function Keyboard({ feedback }: Props) {
	const actor = useGameActorRef();

	const distinctLetterObjects: GameFeedback[] = useMemo(() => {
		const uniqueLetterMap = new Map();
		for (const item of feedback.flat()) {
			const lowerLetter = item.letter.toLowerCase();
			if (!uniqueLetterMap.has(lowerLetter)) {
			  uniqueLetterMap.set(lowerLetter, { letter: lowerLetter, status: item.status });
			}
		}
		return Array.from(uniqueLetterMap.values());
	  }, [feedback]);

	function onClick(letter: KeyItem) {
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

	function showKeyLetter(letter: KeyItem) {
		if (letter === "enter") return "Enviar";
		if (letter === "backspace") return "⌫";
		return letter;
	}
    
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
						const feedback = distinctLetterObjects.find((item) => item.letter === k);
						return <KeyItem
						className={cx(key())}
						key={k}
						aria-label={`Tecla ${k}`}
						data-feedback={feedback?.status ?? 'untouched'}
						onClick={() => onClick(k)}
						type="button"
						data-letter={k}
					>
						{showKeyLetter(k)}
					</KeyItem>
					})}
				</Flex>
			))}
		</Stack>
	);
}

const KeyItem = styled("button", key);
