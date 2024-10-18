"use client";

import { Words } from "@/components/words";
import { useKeyboardListener } from "@/hooks/use-keyboard-listener";
import { useShowInvalidWord } from "@/hooks/use-show-invalid-word";
import { useGameSelector } from "@/lib/machine";
import { Stack } from "@/styled-system/jsx";
import { useEffect, useState } from "react";

export default function Home() {
	const feedback = useGameSelector((state) => state.context.feedback);
	const [isClient, setIsClient] = useState(false);

	useKeyboardListener();
	useShowInvalidWord();

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) return null;

	return (
		<Stack
			w={'screen'}
			h={'screen'}
		>
			<h1>Wordle Clone (Português)</h1>
			<p>Advinhe a palavra:</p>

			<Words feedback={feedback} />
		</Stack>
	);
}
