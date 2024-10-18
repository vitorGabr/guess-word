"use client";

import { Words } from "@/components/words";
import { useKeyboardListener } from "@/hooks/use-keyboard-listener";
import { useGameSelector } from "@/lib/machine";
import { useEffect, useState } from "react";

export default function Home() {
	const feedback = useGameSelector((state) => state.context.feedback);
	const [isClient, setIsClient] = useState(false);

	useKeyboardListener();
	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) return null;

	return (
		<div>
			<h1>Wordle Clone (Português)</h1>
			<p>Advinhe a palavra:</p>

			<Words feedback={feedback} />
		</div>
	);
}
