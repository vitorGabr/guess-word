"use client";

import { GameResult } from "@/components/game-result";
import { HowToPlay } from "@/components/how-to-play";
import { Keyboard } from "@/components/keyboard";
import { ToggleModeButton } from "@/components/toggle-mode-button";
import { Heading } from "@/components/ui/heading";
import { Words } from "@/components/words";
import { useKeyboardListener } from "@/hooks/use-keyboard-listener";
import { useShowInvalidWord } from "@/hooks/use-show-invalid-word";
import { useGameSelector } from "@/lib/machine";
import { Flex, Stack } from "@/styled-system/jsx";
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
		<Stack w={"screen"} h={"screen"} data-testid="home-component">
			<Flex
				w={"full"}
				pt={"6"}
				pb={"6"}
				px={"8"}
				mdDown={{
					pt: "4",
					pb: "4",
					px: "6",
				}}
				justifyContent={"space-between"}
				alignItems={"center"}
			>
				<HowToPlay />
				<Heading
					as={"h1"}
					fontSize={"2xl"}
					fontWeight={"extrabold"}
					color={"fg.default"}
				>
					Adivinhe a palavra
				</Heading>
				<ToggleModeButton />
			</Flex>

			<Words feedback={feedback} />
			<Keyboard feedback={feedback} />
			<GameResult />
		</Stack>
	);
}
