import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import "./globals.css";
import prisma from "@/lib/prisma";
import { Outfit } from "next/font/google";
import { Toaster } from "sonner";

export const revalidate = false;
export const metadata: Metadata = {
	title: "Adivinhe a palavra",
	description: "Jogo de adivinhação de palavras",
};
const body = Outfit({ subsets: ["latin"] });

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
				<Toaster position="top-center" theme="system" />
				<Providers targetWord={game?.word || "casas"}>{children}</Providers>
			</body>
		</html>
	);
}
