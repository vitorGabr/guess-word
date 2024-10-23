import { Providers } from "@/components/layout/providers";
import type { Metadata } from "next";
import "./globals.css";
import prisma from "@/lib/db/prisma";
import { Roboto_Mono } from "next/font/google";

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
			targetDate: new Date().toISOString().split("T")[0],
		},
	});

	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body className={`${body.className}`}>
				<Providers targetWord={game?.word || "casas"}>{children}</Providers>
			</body>
		</html>
	);
}
