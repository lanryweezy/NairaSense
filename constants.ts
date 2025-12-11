import { CurrencyCode, ExchangeRate, HistoricalDataPoint, BankUSSD, MarketUnit } from './types';

export const MOCK_RATES: Record<CurrencyCode, ExchangeRate> = {
  [CurrencyCode.NGN]: {
    code: CurrencyCode.NGN,
    official_buy: 1,
    official_sell: 1,
    parallel_buy: 1,
    parallel_sell: 1,
    flag: '🇳🇬',
    name: 'Nigerian Naira'
  },
  [CurrencyCode.USD]: {
    code: CurrencyCode.USD,
    official_buy: 1540.50,
    official_sell: 1555.00,
    parallel_buy: 1680.00,
    parallel_sell: 1700.00,
    flag: '🇺🇸',
    name: 'US Dollar'
  },
  [CurrencyCode.GBP]: {
    code: CurrencyCode.GBP,
    official_buy: 1980.20,
    official_sell: 2005.50,
    parallel_buy: 2150.00,
    parallel_sell: 2200.00,
    flag: '🇬🇧',
    name: 'British Pound'
  },
  [CurrencyCode.EUR]: {
    code: CurrencyCode.EUR,
    official_buy: 1680.10,
    official_sell: 1700.40,
    parallel_buy: 1820.00,
    parallel_sell: 1850.00,
    flag: '🇪🇺',
    name: 'Euro'
  },
  [CurrencyCode.CAD]: {
    code: CurrencyCode.CAD,
    official_buy: 1120.30,
    official_sell: 1140.00,
    parallel_buy: 1250.00,
    parallel_sell: 1280.00,
    flag: '🇨🇦',
    name: 'Canadian Dollar'
  }
};

export const HISTORICAL_DATA: HistoricalDataPoint[] = [
  { date: 'Jan', rate: 1200 },
  { date: 'Feb', rate: 1350 },
  { date: 'Mar', rate: 1450 },
  { date: 'Apr', rate: 1300 },
  { date: 'May', rate: 1400 },
  { date: 'Jun', rate: 1480 },
  { date: 'Jul', rate: 1550 },
  { date: 'Aug', rate: 1600 },
  { date: 'Sep', rate: 1650 },
  { date: 'Oct', rate: 1700 },
];

export const INFLATION_DATA = [
    { year: 2015, cpi: 100 },
    { year: 2016, cpi: 115.6 },
    { year: 2017, cpi: 134.7 },
    { year: 2018, cpi: 151.0 },
    { year: 2019, cpi: 168.2 },
    { year: 2020, cpi: 190.4 },
    { year: 2021, cpi: 222.7 },
    { year: 2022, cpi: 264.6 },
    { year: 2023, cpi: 329.4 },
    { year: 2024, cpi: 420.5 },
];

export const BANKS_USSD: BankUSSD[] = [
    { name: 'GTBank', code: '*737#', color: '#e04403' },
    { name: 'Zenith Bank', code: '*966#', color: '#ff0000' },
    { name: 'First Bank', code: '*894#', color: '#004281' },
    { name: 'UBA', code: '*919#', color: '#d50611' },
    { name: 'Access Bank', code: '*901#', color: '#2b873a' },
    { name: 'Kuda', code: '*945#', color: '#4c0082' }, 
    { name: 'OPay', code: '*955#', color: '#1dc87f' },
    { name: 'Palmpay', code: '*652#', color: '#6a35ff' },
    { name: 'FCMB', code: '*329#', color: '#56004e' },
    { name: 'Fidelity', code: '*770#', color: '#172b85' },
    { name: 'Stanbic IBTC', code: '*909#', color: '#0033a1' },
    { name: 'Union Bank', code: '*826#', color: '#00aec7' },
];

export const POWER_BANDS = [
    { band: 'Band A (20+ Hrs)', rate: 206.80 },
    { band: 'Band B (16-20 Hrs)', rate: 63.00 },
    { band: 'Band C (12-16 Hrs)', rate: 50.00 },
    { band: 'Band D (8-12 Hrs)', rate: 42.00 },
    { band: 'Band E (4-8 Hrs)', rate: 30.00 },
];

export const MARKET_UNITS: MarketUnit[] = [
    { id: 'derica', name: 'Derica (Rice/Beans)', toKg: 0.85, category: 'Grains' },
    { id: 'paint_rubber', name: 'Paint Rubber (Garri)', toKg: 4.0, category: 'Grains' },
    { id: 'congo', name: 'Congo (Standard)', toKg: 1.5, category: 'Grains' },
    { id: 'bag_rice', name: 'Bag of Rice', toKg: 50, category: 'Grains' },
    { id: 'basket_tomato', name: 'Basket (Tomatoes)', toKg: 25, category: 'Vegetables' }, // Avg approx
    { id: 'tuber_yam', name: 'Tuber of Yam (Lg)', toKg: 3.5, category: 'Tubers' },
];

export const EMERGENCY_NUMBERS = [
    { label: 'National Emergency', number: '112', desc: 'All emergencies' },
    { label: 'Lagos Emergency', number: '767', desc: 'Lagos State Only' },
    { label: 'FRSC', number: '122', desc: 'Road Accidents' },
    { label: 'Fire Service', number: '112', desc: 'Fire Outbreaks' },
    { label: 'NEMA', number: '080022556362', desc: 'Disaster Response' },
];

export const APP_USAGE_RATES = {
    WHATSAPP_CALL: 0.7, // MB per minute
    INSTAGRAM_SCROLL: 10, // MB per minute
    TIKTOK_WATCH: 14, // MB per minute
    YOUTUBE_720P: 25, // MB per minute
    NETFLIX_HD: 50, // MB per minute
    ZOOM_CALL: 15, // MB per minute
};

export const LAND_UNITS = [
    { id: 'sqm', name: 'Square Meters', toSqm: 1 },
    { id: 'plot_lagos', name: 'Plot (Lagos Std)', toSqm: 600 },
    { id: 'acre', name: 'Acre', toSqm: 4046.86 },
    { id: 'hectare', name: 'Hectare', toSqm: 10000 },
    { id: 'feet_sq', name: 'Square Feet', toSqm: 0.092903 },
];

export const GEN_SPECS = [
  { id: 'small', name: 'Small (Tiger/I pass)', rate: 0.75, fuel: 'Petrol' },
  { id: 'medium', name: 'Medium (2.5 - 3.5KVA)', rate: 1.2, fuel: 'Petrol' },
  { id: 'large', name: 'Large (5KVA - 8KVA)', rate: 2.2, fuel: 'Petrol' },
  { id: 'diesel', name: 'Diesel Silent (10KVA+)', rate: 3.5, fuel: 'Diesel' }
];

export const SOLAR_APPLIANCES = [
    { id: 'bulb', name: 'LED Bulb (10W)', watts: 10 },
    { id: 'fan', name: 'Ceiling Fan', watts: 70 },
    { id: 'laptop', name: 'Laptop', watts: 65 },
    { id: 'tv', name: 'LED TV (43")', watts: 100 },
    { id: 'fridge', name: 'Fridge (Med)', watts: 200 },
    { id: 'freezer', name: 'Freezer', watts: 300 },
    { id: 'pump', name: 'Pumping Machine (1HP)', watts: 750 },
    { id: 'ac', name: 'Inverter AC (1HP)', watts: 1000 },
];

export const DRINK_CRATES = [
    { id: 'water', name: 'Water (50/75cl)', count: 12 },
    { id: 'soft', name: 'Soft Drinks (PET)', count: 12 },
    { id: 'beer', name: 'Beer (Large)', count: 12 },
    { id: 'malt', name: 'Malt Drinks', count: 24 },
    { id: 'juice', name: 'Fruit Juice (1L)', count: 10 },
];

export const DSTV_PLANS = [
    { name: 'Premium', price: 37000 },
    { name: 'Compact Plus', price: 25000 },
    { name: 'Compact', price: 15700 },
    { name: 'Confam', price: 9300 },
    { name: 'Yanga', price: 5100 },
    { name: 'Padi', price: 3600 },
];

export const VEHICLE_PAPER_COSTS = [
    { name: 'Vehicle License (Car)', price: 2500 },
    { name: 'Road Worthiness', price: 5000 },
    { name: '3rd Party Insurance', price: 15000 },
    { name: 'Hackney Permit (Commercial)', price: 3000 },
    { name: 'Tint Permit', price: 20000 },
];

export const PASSPORT_PRICES = [
    { type: '32 Pages (5 Years)', price: 35000 },
    { type: '64 Pages (5 Years)', price: 70000 },
    { type: '64 Pages (10 Years)', price: 140000 },
];