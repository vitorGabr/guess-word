"use client";

import { GameResult } from "@/components/game/game-result";
import { HowToPlay } from "@/components/how-to-play";
import { Keyboard } from "@/components/keyboard";
import { ThemeToggleButton } from "@/components/theme-toggle-button";
import { Heading } from "@/components/ui";
import { Words } from "@/components/words";
import { useKeyboardListener } from "@/hooks/use-keyboard-listener";
import { useGameSelector } from "@/lib/state/machine";
import { Container, Flex } from "@/styled-system/jsx";
import { stack } from "@/styled-system/patterns";
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
					<ThemeToggleButton />
				</Flex>
			</Container>

			<Words feedback={feedback} />
			<Keyboard feedback={feedback} />
			<GameResult />
		</main>
	);
}
