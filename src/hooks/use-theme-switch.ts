import { useTheme } from "next-themes";

export const useThemeSwitch = () => {
	const theme = useTheme();
	const { setTheme, resolvedTheme } = theme;
	const isDark = resolvedTheme === "dark";

	const toggleTheme = () => setTheme(isDark ? "light" : "dark");
	const iconText = isDark ? "Dark" : "Light";
	return {
		iconText,
		toggleTheme,
	};
};
