import { useGameActorRef } from "@/lib/machine";
import { useCallback, useEffect } from "react";

export const useKeyboardListener = () => {
	const someActorRef = useGameActorRef();

	const handleKeyPress = useCallback(
		(key: string) => {
			switch (key) {
				case "Enter":
					someActorRef.send({ type: "SUBMIT_GUESS" });
					break;
				case "Backspace":
					someActorRef.send({ type: "BACKSPACE" });
					break;
				case "ArrowRight":
					someActorRef.send({ type: "ARROW_CHANGE", direction: "right" });
					break;
				case "ArrowLeft":
					someActorRef.send({ type: "ARROW_CHANGE", direction: "left" });
					break;
				default:
					if (key.length === 1 && /^[a-zA-Z]$/.test(key)) {
						someActorRef.send({
							type: "INPUT_LETTER",
							letter: key.toLowerCase(),
						});
					}
					break;
			}
		},
		[someActorRef],
	);

	useEffect(() => {
		const keyDownListener = (e: KeyboardEvent) => handleKeyPress(e.key);
		document.addEventListener("keydown", keyDownListener);
		return () => {
			document.removeEventListener("keydown", keyDownListener);
		};
	}, [handleKeyPress]);
};
