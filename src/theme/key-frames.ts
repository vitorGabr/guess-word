import { defineKeyframes } from '@pandacss/dev'

export const keyframes = defineKeyframes({
    shake: {
        "0%, 100%": { transform: "translateX(0)" },
        "20%": { transform: "translateX(-10px)" },
        "40%": { transform: "translateX(10px)" },
        "60%": { transform: "translateX(-10px)" },
        "80%": { transform: "translateX(10px)" },
    }
})