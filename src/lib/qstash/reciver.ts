import { Receiver } from "@upstash/qstash";

export const qstashReciver = new Receiver({
	currentSigningKey: `${process.env.QSTASH_CURRENT_SIGNING_KEY}`,
	nextSigningKey: `${process.env.QSTASH_NEXT_SIGNING_KEY}`,
});
