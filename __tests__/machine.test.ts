import { describe, it, expect } from "vitest";
import { createActor } from "xstate";
import { gameMachine } from "../src/lib/machine";

describe("Wordle Game Machine", () => {
	it('deve iniciar no estado "playing"', () => {
		const actor = createActor(gameMachine, {
			input: "TESTE",
		}).start();

		expect(actor.getSnapshot().value).toBe("playing");
	});

	it("deve adicionar uma letra ao palpite atual", () => {
		const actor = createActor(gameMachine, {
			input: "TESTE",
		}).start();

		actor.send({ type: "INPUT_LETTER", letter: "T" });

		expect(actor.getSnapshot().context.currentGuess).toEqual(["T"]);
		expect(actor.getSnapshot().context.currentCol).toBe(1);
	});

	it("deve remover a última letra com BACKSPACE", () => {
		const actor = createActor(gameMachine, {
			input: "TESTE",
		}).start();

		actor.send({ type: "INPUT_LETTER", letter: "T" });

		actor.send({ type: "BACKSPACE" });

		expect(actor.getSnapshot().context.currentGuess).toEqual([""]);
		expect(actor.getSnapshot().context.currentCol).toBe(0);
	});

	it("deve processar corretamente a submissão de um palpite válido", () => {
		const actor = createActor(gameMachine, {
			input: "TESTE",
		}).start();

		for (const letra of "TESTE") {
			actor.send({ type: "INPUT_LETTER", letter: letra });
		}

		actor.send({ type: "SUBMIT_GUESS" });
		const snapshot = actor.getSnapshot();

		expect(snapshot.context.currentGuess).toEqual([]);
		expect(snapshot.context.currentCol).toBe(0);
		expect(snapshot.context.feedback).toHaveLength(1); // Deve haver feedback para o palpite submetido

		expect(["playing", "won", "lost"]).toContain(snapshot.value);
	});
	
});
