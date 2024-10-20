import { Stack } from "@/styled-system/jsx";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Text } from "./ui/text";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export function NextGameCountdown() {
	const [timeLeft, setTimeLeft] = useState("");

	useEffect(() => {
		const calculateTimeLeft = () => {
			const now = dayjs();
			const midnight = dayjs().endOf("day");
			const diff = dayjs.duration(midnight.diff(now));

			const hours = diff.hours().toString().padStart(2, "0");
			const minutes = diff.minutes().toString().padStart(2, "0");
			const seconds = diff.seconds().toString().padStart(2, "0");

			setTimeLeft(`${hours}:${minutes}:${seconds}`);
		};

		calculateTimeLeft();
		const interval = setInterval(calculateTimeLeft, 1000);

		return () => clearInterval(interval);
	}, []);

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
				{timeLeft}
			</Text>
		</Stack>
	);
}
