export interface IApp {
  currentUser: string;
  data: data;
}

export interface data {
  [email: string]: IUserInfo;
}

export interface IUserInfo {
  amount: number;
  transactions?: ITransactions[];
  beneficiaries?: IBeneficiaries[];
  password?: string;
}

export interface ITransactions {
  id: string;
  amount: number;
  to: string;
  iban: string;
}

export interface IBeneficiaries {
  first_name: string;
  last_name: string;
  iban: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export type IBanRule = {
  placeholder?: string;
  regex?: RegExp;
};

export type ITemDropdown = {value: string; label: string};
