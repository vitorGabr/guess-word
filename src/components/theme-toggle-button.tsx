import { useThemeSwitch } from "@/hooks/use-theme-switch";
import { styled } from "@/styled-system/jsx";
import { Moon, Sun } from "lucide-react";

export function ThemeToggleButton() {
	const { iconText, toggleTheme } = useThemeSwitch();

	const renderIcon = () => {
		switch (iconText) {
			case "Light":
				return <Sun size="24" />;
			default:
				return <Moon size="24" />;
		}
	};

	return (
		<styled.button
			color="fg.subtle"
			onClick={toggleTheme}
			aria-label={`Toggle ${iconText} mode`}
			cursor="pointer"
			outline="none"
		>
			{renderIcon()}
		</styled.button>
	);
}
