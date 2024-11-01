import { useThemeSwitch } from "@/hooks/use-theme-switch";
import { styled } from "@/styled-system/jsx";
import { Moon, Sun } from "lucide-react";

export function ThemeToggleButton() {
	const { theme, toggleTheme } = useThemeSwitch();

	const renderIcon = () => {
		switch (theme) {
			case "dark":
				return <Moon size="24" />;
			default:
				return <Sun size="24" />;
		}
	};

	return (
		<styled.button
			color="fg.subtle"
			onClick={toggleTheme}
			onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
			aria-label={`Toggle ${theme} mode`}
			cursor="pointer"
			outline="none"
			type="button"
			_hover={{
				color: "fg.default",
			}}
		>
			{renderIcon()}
		</styled.button>
	);
}
