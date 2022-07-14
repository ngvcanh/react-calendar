import en_translation from './translation/en.json';

const translation = {
  en: en_translation
}

export default translation;
export type CalendarLocaleSupported = keyof typeof translation;