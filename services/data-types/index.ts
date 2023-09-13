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
}

export interface JwtPayloadTypes {
  player: UserTypes;
  iat: number;
}
