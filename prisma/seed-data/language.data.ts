import { Prisma } from '@prisma/client';

export const LANGUAGES: Prisma.LanguageCreateInput[] = [
  { language: 'en-us' },
  { language: 'en-gb' },
  { language: 'fr-fr' },
  { language: 'es-es' },
  { language: 'de-de' },
  { language: 'ru-ru' },
];
