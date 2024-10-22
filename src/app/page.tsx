"use client";

import { GameResult } from "@/components/game-result";
import { HowToPlay } from "@/components/how-to-play";
import { Keyboard } from "@/components/keyboard";
import { ToggleModeButton } from "@/components/toggle-mode-button";
import { Heading } from "@/components/ui";
import { Words } from "@/components/words";
import { useKeyboardListener } from "@/hooks/use-keyboard-listener";
import { useShowInvalidWord } from "@/hooks/use-show-invalid-word";
import { useGameSelector } from "@/lib/machine";
import { Container, Flex } from "@/styled-system/jsx";
import { stack } from "@/styled-system/patterns";
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
		<main
			className={stack({
				width: "100vw",
				height: "100vh",
			})}
			data-testid="home-component"
		>
			<Container>
				<Flex
					pt={"6"}
					pb={"6"}
					justifyContent={"space-between"}
					alignItems={"center"}
				>
					<HowToPlay />
					<Heading
						as={"h1"}
						fontSize={["xl", "2xl", "2xl"]}
						fontWeight={"extrabold"}
						color={"fg.default"}
					>
						Adivinhe a palavra
					</Heading>
					<ToggleModeButton />
				</Flex>
			</Container>

			<Words feedback={feedback} />
			<Keyboard feedback={feedback} />
			<GameResult />
		</main>
	);
}
