// Import Type
import {IApp} from './app';

export interface IInitialState {
  // State
  app: IApp;
}

export interface IError {
  code: number;
  message: string;
}
