import { Stack } from "@/styled-system/jsx";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Text } from "./ui/text";

export function NextGameCountdown() {
	const calculateTimeRemaining = useCallback(
		() => dayjs().endOf("day").diff(dayjs(), "second"),
		[],
	);

	const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeRemaining(calculateTimeRemaining());
		}, 1000);
		return () => clearInterval(interval);
	}, [calculateTimeRemaining]);

	const time = useMemo(
		() => ({
			hour: `${Math.floor(timeRemaining / 3600)}`.padStart(2, "0"),
			minutes: `${Math.floor((timeRemaining % 3600) / 60)}`.padStart(2, "0"),
			seconds: `${Math.floor((timeRemaining % 3600) % 60)}`.padStart(2, "0"),
		}),
		[timeRemaining],
	);

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
			<Text
				fontSize={{
					base: "3xl",
					md: "4xl",
				}}
				fontWeight={"bold"}
				lineHeight={"1"}
			>
				{time.hour} : {time.minutes} : {time.seconds}
			</Text>
		</Stack>
	);
}
