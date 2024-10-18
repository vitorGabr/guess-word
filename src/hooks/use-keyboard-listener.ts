import { useGameActorRef } from "@/lib/game-machine";
import { useCallback, useEffect } from "react";

export const useKeyboardListener = () => {
	const someActorRef = useGameActorRef();

	const handleKeyPress = useCallback(
		(key: string) => {
			if (key === "Enter") {
				someActorRef.send({ type: "SUBMIT_GUESS" });
			} else if (key === "Backspace") {
				someActorRef.send({ type: "BACKSPACE" });
			} else if (key.length === 1 && /^[a-zA-Z]$/.test(key)) {
				someActorRef.send({ type: "INPUT_LETTER", letter: key.toLowerCase() });
			}
		},
		[someActorRef],
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const keyDownListener = (e: KeyboardEvent) => handleKeyPress(e.key);
		document.addEventListener("keydown", keyDownListener);
		return () => {
			document.removeEventListener("keydown", keyDownListener);
		};
	}, []);
};
