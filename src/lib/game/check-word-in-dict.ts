import dict from "public/_static/dicionario.json";

function normalizeWord(word: string) {
	return word
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");
}

export function isWordInDictionary(word: string[]) {
	return dict.find(
		(dictWord) => normalizeWord(dictWord) === normalizeWord(word.join("")),
	);
}
