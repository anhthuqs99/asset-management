export enum LanguageCode {
  EN = 'en',
  VI = 'vi',
  RU = 'ru',
}

export enum Language {
  EN = 'English',
  VI = 'Tiếng Việt',
  RU = 'Русский',
}

export const LanguageCodes = [
  LanguageCode.EN,
  LanguageCode.VI,
  LanguageCode.RU,
];

export const languageKey = 'language';

export const LanguageOptions = [
  { code: LanguageCode.EN, name: Language.EN },
  { code: LanguageCode.VI, name: Language.VI },
  { code: LanguageCode.RU, name: Language.RU },
];
