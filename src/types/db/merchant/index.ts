import type { ImageResource } from 'src/types/helpers';

export enum MerchantCategory {
  UTILITY = 'UTILITY',
  TRAVEL = 'TRAVEL',
  HEALTHCARE = 'HEALTHCARE',
  ENTERTAINMENT = 'ENTERTAINMENT',
  DINING = 'DINING',
  FOOD_AND_GROCERIES = 'FOOD_AND_GROCERIES',
  TRANSPORT = 'TRANSPORT',
  LEISURE = 'LEISURE',
  PAYMENTS = 'PAYMENTS',
  TRANSFERS = 'TRANSFERS',
  EDUCATION = 'EDUCATION',
  ATM = 'ATM',
  MISCELLANEOUS = 'MISCELLANEOUS', // un-categorized
}

export type Merchant = {
  uid: string;
  name: string;
  mcc: string; // merchant category code
  registeredCountry: string; // ISO 3166-1 alpha-3 code
  acquiringBankId: string;
  acquiringBankName: string;
  category: MerchantCategory;
  icon?: ImageResource;
};
