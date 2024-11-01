import { Providers } from "@/components/layout/providers";
import type { Metadata } from "next";
import "./globals.css";
import prisma from "@/lib/db/prisma";
import { Roboto_Mono } from "next/font/google";
import dayjs from "dayjs";

export const revalidate = false;
export const metadata: Metadata = {
	title: "Adivinhe a palavra",
	description: "Jogo de adivinhação de palavras",
};
const body = Roboto_Mono({
	subsets: ["latin"],
	variable: "--global-font-body",
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const game = await prisma.games.findFirst({
		where: {
			targetDate: dayjs().format("YYYY-MM-DD"),
		},
		select: {
			word: true
		}
	});

	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body className={`${body.className}`}>
				<Providers targetWord={game?.word || "casas"}>{children}</Providers>
			</body>
		</html>
	);
}
