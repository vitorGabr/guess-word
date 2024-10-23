"use client";

import { persistData } from "@/lib/db/persist-data";
import { GameProvider } from "@/lib/state/machine";
import {
	QueryClient,
	QueryClientProvider,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";
import { Toaster } from "../toaster";

type ProvidersProps = PropsWithChildren<{ targetWord: string }>;

const queryClient = new QueryClient();
export function Providers({ children, targetWord }: ProvidersProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<Content targetWord={targetWord}>{children}</Content>
				<Toaster />
			</ThemeProvider>
		</QueryClientProvider>
	);
}

function Content({ targetWord, children }: ProvidersProps) {
	const { data } = useSuspenseQuery({
		queryKey: ["snapshot"],
		queryFn: () => persistData.loadGameForToday(),
	});

	return (
		<GameProvider
			options={{
				snapshot: data as any,
				input: targetWord,
			}}
		>
			{children}
		</GameProvider>
	);
}
