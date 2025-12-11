export enum CurrencyCode {
  NGN = 'NGN',
  USD = 'USD',
  GBP = 'GBP',
  EUR = 'EUR',
  CAD = 'CAD'
}

export interface ExchangeRate {
  code: CurrencyCode;
  official_buy: number;
  official_sell: number;
  parallel_buy: number;
  parallel_sell: number;
  flag: string;
  name: string;
}

export interface HistoricalDataPoint {
  date: string;
  rate: number;
}

export interface BankUSSD {
  name: string;
  code: string;
  color: string;
}

export enum AppTab {
  CONVERTER = 'CONVERTER',
  CHARTS = 'CHARTS',
  TOOLS = 'TOOLS'
}

export enum ToolType {
  NONE = 'NONE',
  VAT = 'VAT',
  INFLATION = 'INFLATION',
  SALARY = 'SALARY',
  FUEL = 'FUEL',
  POWER = 'POWER',
  USSD = 'USSD',
  DATA = 'DATA',
  MARKET = 'MARKET',
  EMERGENCY = 'EMERGENCY',
  LOAN = 'LOAN',
  SAVINGS = 'SAVINGS',
  LAND = 'LAND',
  RENT = 'RENT',
  SME = 'SME',
  JAPA = 'JAPA',
  WEDDING = 'WEDDING',
  GENSET = 'GENSET',
  PENSION = 'PENSION',
  INVOICE = 'INVOICE',
  SOLAR = 'SOLAR',
  DUTY = 'DUTY',
  OWANBE = 'OWANBE',
  // New Tools
  CAR_IMPORT = 'CAR_IMPORT',
  FREELANCE = 'FREELANCE',
  CRYPTO = 'CRYPTO',
  VEHICLE_PAPERS = 'VEHICLE_PAPERS',
  CEMENT = 'CEMENT',
  POS = 'POS',
  SAFELOCK = 'SAFELOCK',
  DSTV = 'DSTV',
  COOKING_GAS = 'COOKING_GAS',
  SCHOOL_FEES = 'SCHOOL_FEES',
  AIRTIME_CASH = 'AIRTIME_CASH',
  TRAFFIC = 'TRAFFIC',
  PASSPORT = 'PASSPORT',
  TITHES = 'TITHES',
  DATE_NIGHT = 'DATE_NIGHT',
  SOCIAL_ADS = 'SOCIAL_ADS',
  STARLINK = 'STARLINK',
  CINEMA = 'CINEMA',
  RIDESHARE = 'RIDESHARE',
  KEKE = 'KEKE'
}

export type MarketUnit = {
  id: string;
  name: string;
  toKg: number;
  category: string;
};