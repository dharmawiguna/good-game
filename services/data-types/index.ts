export interface CategoryTypes {
  _id: string;
  name: string;
  __v: number;
}

export interface GameItemTypes {
  _id: string;
  status: string;
  name: string;
  thumbnail: string;
  category: CategoryTypes;
}

export interface BanksTypes {
  _id: string;
  bankName: string;
  ownerName: string;
  accountNumber: string;
}
export interface PaymentTypes {
  _id: string;
  type: string;
  status: string;
  banks: BanksTypes[];
}

export interface NominalTypes {
  _id: string;
  coinQuantity: number;
  coinName: string;
  price: number;
}

export interface LoginTypes {
  email: string;
  password: string;
}

export interface UserTypes {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
  image: string;
}

export interface JwtPayloadTypes {
  player: UserTypes;
  iat: number;
}

export interface CheckoutTypes {
  voucher: string;
  nominal: string;
  payment: string;
  bank: string;
  name: string;
  accountUser: string;
}

export interface HistoryVoucherTopup {
  category: string;
  coinName: string;
  coinQuantity: string;
  price: number;
  gameName: string;
  thumbnail: string;
}

export interface HistoryPaymentTypes {
  bankName: string;
  ownerName: string;
  accountNumber: string;
  type: string;
}
export interface HistoryTransactionTypes {
  _id: string;
  historyVoucherTopup: HistoryVoucherTopup;
  value: number;
  status: string;
  accountUser: string;
  tax: number;
  name: string;
  historyPayment: HistoryPaymentTypes;
}

export interface TopupCategoryTypes {
  _id: string;
  value: number;
  name: string;
}
