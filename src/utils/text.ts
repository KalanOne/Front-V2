export { capitalizeSentences };

function capitalizeSentences(text: string): string {
  const sentences: string[] = text.split(". ");
  const capitalizedSentences: string[] = sentences.map((sentence) => {
    if (sentence.length > 0) {
      return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
    } else {
      return sentence;
    }
  });
  const result: string = capitalizedSentences.join(". ");
  return result;
}
