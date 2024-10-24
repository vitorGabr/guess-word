import { useGameSelector } from "@/lib/state/machine";
import { Box, Center, Flex, Grid, Stack } from "@/styled-system/jsx";
import dayjs from "dayjs";
import { GameCountdown } from "./game-countdown";
import { ShareGame } from "./share-game";
import { Text, Dialog } from "../ui";
import { DEFAULTS } from "@/constants/default";
import { persistData } from "@/lib/db/persist-data";
import { calculateSequence } from "@/lib/game/calculate-sequence";

function Content() {
	const game = persistData.getGameHistory();

	const lastWord = game.history[dayjs().format("YYYY-MM-DD")];
	const { sequence, percentage } = calculateSequence(game);

	const data = [
		{ label: "jogos", value: Object.keys(game.history).length },
		{ label: "de vitórias", value: `${percentage}%` },
		{ label: "sequência de vitórias", value: sequence.best },
	];
	const attemptsArray = new Array(DEFAULTS.MAX_ATTEMPTS).fill(null);

	return (
		<Dialog.Root trapFocus={false} open={true} closeOnInteractOutside={false}>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content overflow={"hidden"}>
					<Stack
						maxH={"90vh"}
						overflowY={"auto"}
						alignItems="center"
						p="6"
						gap="6"
						scrollbarWidth={"thin"}
					>
						<Stack gap="6" alignItems="center">
							<Stack alignItems="center">
								<Center px="4" bgColor="fg.muted" rounded="l3" fontSize="xs">
									<Text>
										Palavra certa:
										<Text as="span" fontSize="sm" fontWeight="bold">
											{`  ${lastWord?.context.targetWord}`}
										</Text>
									</Text>
								</Center>
								<Text as="h3" fontSize="lg" fontWeight="semibold">
									{lastWord?.value === "won"
										? "Parabéns você acertou! 🎉"
										: "Que pena você errou! 😢"}
								</Text>
							</Stack>
							<Grid columns={3} gap="3">
								{data.map((item) => (
									<Stack
										key={item.label}
										gap="2"
										alignItems="center"
										justifyContent="flex-start"
										textAlign="center"
									>
										<Text
											fontSize={{
												base: "3xl",
												md: "4xl",
											}}
											lineHeight={"1"}
											fontWeight={"bold"}
										>
											{item.value}
										</Text>
										<Text fontSize="sm">{item.label}</Text>
									</Stack>
								))}
							</Grid>
						</Stack>

						<Stack w="full" alignItems="center">
							<Text fontSize="md" fontWeight="semibold">
								Distribuição das tentativas
							</Text>
							{attemptsArray.map((_, index) => {
								const item = lastWord?.context.feedback[index];
								const win = item
									? item.every((l) => l.status === "correct")
									: false;

								return (
									<Flex key={index} alignItems="center" w="full" gap="3">
										<Text as="span">{index + 1}</Text>
										<Flex
											bgColor="fg.muted"
											rounded="lg"
											h="4"
											flex="1"
											px="1"
											alignItems="center"
										>
											<Box
												h="2"
												w={win ? "full" : "3%"}
												rounded="lg"
												bgColor="feedback.correct"
											/>
										</Flex>
										<Text as="span">{win ? "✅" : "❌"}</Text>
									</Flex>
								);
							})}
						</Stack>

						<Flex
							alignItems="center"
							w="full"
							gap="6"
							smDown={{ flexDirection: "column", gap: "8" }}
						>
							<GameCountdown />
							<ShareGame feedback={lastWord?.context.feedback} />
						</Flex>
					</Stack>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
}

export function GameResult() {
	const status = useGameSelector((state) => state.status);
	if (status !== "done") return null;
	return <Content />
}
