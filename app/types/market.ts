export interface MarketItem {
  id: string;
  title: string;
  image: string; // 图片 URL
  volume: string; // 交易量，如 "$1.2m"
  outcomeYes: number; // Yes 的概率，如 0.65 (65%)
  outcomeNo: number;  // No 的概率，如 0.35 (35%)
}