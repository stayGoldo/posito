export const ARTICLES_STATUS = ['draft','published'] as const;
export type ArticleStatus = (typeof ARTICLES_STATUS)[number];
