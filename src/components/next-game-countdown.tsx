import { Stack } from "@/styled-system/jsx";
import dayjs from "dayjs";
import { Text } from "./ui/text";
import { Timer } from "@ark-ui/react/timer";
import { flex } from "@/styled-system/patterns";

export function NextGameCountdown() {
	const diff = dayjs().endOf("day").diff(dayjs(), "milliseconds");

	return (
		<Stack
			gap="1"
			textAlign="center"
			alignItems="center"
			justifyContent="center"
		>
			<Text fontSize="xs" fontWeight="medium">
				PRÓXIMA PALAVRA EM
			</Text>
			<Timer.Root
				startMs={diff}
				autoStart
				countdown
			>
				<Timer.Area
					className={flex({
						fontSize: {
							base: "3xl",
							md: "4xl",
						},
						fontWeight: "bold",
						lineHeight: "1",
					})}
				>
					<Timer.Item type="hours" />
					<Timer.Separator>:</Timer.Separator>
					<Timer.Item type="minutes" />
					<Timer.Separator>:</Timer.Separator>
					<Timer.Item type="seconds" />
				</Timer.Area>
			</Timer.Root>
		</Stack>
	);
}
