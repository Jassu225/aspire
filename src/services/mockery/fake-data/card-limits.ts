import { nanoid } from 'nanoid';
import { CardLimitType } from 'src/types/db/card/card-limits';

const getFakeCardLimits = (cardUid: string, totalLimit = 150_000_00) => {
  const transactionLimit = 3_000_00;
  return [
    {
      uid: nanoid(12),
      cardUid,
      type: CardLimitType.TRANSACTION_LIMIT,
      value: transactionLimit,
      timestamp: new Date().toISOString(),
    },
    {
      uid: nanoid(12),
      cardUid,
      type: CardLimitType.DAILY_LIMIT,
      value: transactionLimit * 2,
      timestamp: new Date().toISOString(),
    },
    {
      uid: nanoid(12),
      cardUid,
      type: CardLimitType.MONTHLY_LIMIT,
      value: transactionLimit * 5,
      timestamp: new Date().toISOString(),
    },
    {
      uid: nanoid(12),
      cardUid,
      type: CardLimitType.TOTAL_LIMIT,
      value: totalLimit,
      timestamp: new Date().toISOString(),
    },
    {
      uid: nanoid(12),
      cardUid,
      type: CardLimitType.USABLE_LIMIT,
      value: totalLimit / 10,
      timestamp: new Date().toISOString(),
    },
  ];
};

export default getFakeCardLimits;
