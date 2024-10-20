import { useGameSelector } from "@/lib/machine";
import { getGameHistory } from "@/lib/utils";
import { Box, Center, Flex, Grid, Stack } from "@/styled-system/jsx";
import dayjs from "dayjs";
import { useMemo } from "react";
import { NextGameCountdown } from "./next-game-countdown";
import * as Dialog from "./ui/dialog";
import { Text } from "./ui/text";

function Content() {
	const game = useMemo(() => getGameHistory(), []);
	const lastWord = game.history[dayjs().format("YYYY-MM-DD")];

	const { sequence, percentage } = useMemo(() => {
		const sequence = Object.values(history).reduce(
			(acc, item) => {
				if (item.value === "won") {
					acc.current += 1;
					acc.best = Math.max(acc.current, acc.best);
				} else {
					acc.current = 0;
				}
				return acc;
			},
			{ current: 0, best: 0 },
		);

		const percentage = history ? (game.won / game.total) * 100 : 0;
		return { sequence, percentage };
	}, [history]);

	const data = useMemo(
		() => [
			{ label: "jogos", value: Object.keys(history).length },
			{ label: "de vitórias", value: `${percentage}%` },
			{ label: "sequência de vitórias", value: sequence.best },
		],
		[history, percentage, sequence.best],
	);

	return (
		<Dialog.Root
			trapFocus={false}
			open={true}
			closeOnInteractOutside={false}
		>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content>
					<Stack alignItems="center" p='6'>
						<Stack gap="6" alignItems="center">
							<Stack alignItems="center">
								<Center px="4" bgColor="fg.muted" rounded="lg" fontSize="xs">
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
							{lastWord?.context.feedback.map((item, index) => {
								const win = item.every((l) => l.status === "correct");
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

						<Stack
							alignItems="center"
							w="full"
							smDown={{ flexDirection: "column", gap: "8" }}
						>
							<NextGameCountdown />
						</Stack>
					</Stack>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
}

export function GameResult() {
	const status = useGameSelector((state) => state.status);

	if (status === "done") {
		return <Content />;
	}

	return null;
}