export interface IApp {
  currentUser: string;
  data: data;
}

export interface data {
  [email: string]: UserTransactions;
}

export interface UserTransactions {
  amount: number;
  transactions: ITransactions[];
  beneficiaries: Beneficiaries[];
}

export interface ITransactions {
  id: string;
  amount: number;
  to: string;
  iban: string;
}

export interface Beneficiaries {
  first_name: string;
  last_name: string;
  iban: string;
}
