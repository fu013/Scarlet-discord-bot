const makeCodeBlock = (text: string) => {
  const reply = `\`\`\`fix\n${text}\`\`\``;
  return reply;
};

export { makeCodeBlock };
