import { calculateFeedback } from "@/lib/game/calculate-feedback";
import { describe, expect,it } from "vitest";

describe("Calculate Feedback", () => {

    it("should return correct feedback for a guess", () => {
        const targetWord = "TESTE";
        const guess = ["T", "E", "S", "T", "E"];

        const feedback = calculateFeedback(guess,targetWord);
        expect(feedback).toEqual([
            { letter: "T", status: "correct" },
            { letter: "E", status: "correct" },
            { letter: "S", status: "correct" },
            { letter: "T", status: "correct" },
            { letter: "E", status: "correct" },
        ]);
    });

    it("should return correct feedback for a guess with repeated letters", () => {
        const targetWord = "TESTE";
        const guess = ["T", "E", "E", "E", "E"];

        const feedback = calculateFeedback(guess,targetWord);
        expect(feedback).toEqual([
            { letter: "T", status: "correct" },
            { letter: "E", status: "correct" },
            { letter: "E", status: "absent" },
            { letter: "E", status: "absent" },
            { letter: "E", status: "correct" },
        ]);
    });

    it("should return correct feedback for a guess with present letters", () => {
        const targetWord = "TESTE";
        const guess = ["E", "T", "S", "E", "T"];

        const feedback = calculateFeedback(guess,targetWord);
        expect(feedback).toEqual([
            { letter: "E", status: "present" },
            { letter: "T", status: "present" },
            { letter: "S", status: "correct" },
            { letter: "E", status: "present" },
            { letter: "T", status: "present" },
        ]);
    });
})