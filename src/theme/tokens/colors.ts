import { defineSemanticTokens } from "@pandacss/dev";

export const defineColorTokens = defineSemanticTokens.colors({
	feedback: {
		correct: {
		  value: {
			base: "#28c350",
			_dark: "#34d399",
		  },
		},
		absent: {
		  value: {
			base: "#d5d5d6",
			_dark: "#4b5563",
		  },
		},
		present: {
		  value: {
			base: "#ff9000",
			_dark: "#facc15",
		  },
		},
	  },
	  bg: {
		default: {
		  value: {
			base: "#ffffff",
			_dark: "#121212",
		  },
		},
	  },
	  fg: {
		default: {
		  value: {
			base: "#1d1e2e",
			_dark: "#f3f4f6",
		  },
		},
		subtle: {
		  value: {
			base: "#d5d4d6",
			_dark: "#6b7280",
		  },
		},
		muted: {
		  value: {
			base: "#e3e3e3",
			_dark: "#374151", 
		  },
		},
	  },
	  accent: {
		default: {
			value: {
				base: "#6e56cf",
				_dark: "#6e56cf",
			}
		}
	  }
});
