import type { GameSchema } from "../db/schema";

export function calculateSequence({
	won,
	total,
	history,
}: {
	history: Record<string, GameSchema>;
	won: number;
	total: number;
}) {
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

	const percentage = history ? (won / total) * 100 : 0;
	return { sequence, percentage };
}
