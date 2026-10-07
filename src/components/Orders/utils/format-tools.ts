const pluralRules = new Intl.PluralRules("ru-RU");

const TOOL_FORMS: Record<Intl.LDMLPluralRule, string> = {
  zero: "инструментов",
  one: "инструмент",
  two: "инструмента",
  few: "инструмента",
  many: "инструментов",
  other: "инструмента",
};

export function formatTools(count: number) {
  return TOOL_FORMS[pluralRules.select(count)];
}
