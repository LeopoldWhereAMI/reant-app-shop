const pluralRules = new Intl.PluralRules("ru-RU");

const DAY_FORMS: Record<Intl.LDMLPluralRule, string> = {
  zero: "дней",
  one: "день",
  two: "дня",
  few: "дня",
  many: "дней",
  other: "дня",
};

export function formatDays(days: number) {
  return DAY_FORMS[pluralRules.select(days)];
}
