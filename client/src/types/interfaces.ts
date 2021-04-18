import { E_ERROR } from './enum';

// REACT
export interface ITarget {
  target: {
    value: React.SetStateAction<string>;
  };
  preventDefault(): void;
}

// ERRORS
export interface IMsg {
  msg: string | any;
}

// AUTH
export interface IUser {
  name?: string;
  email: string;
  password: string; 
  isAdmin?: boolean; 
}

export interface IAuthForm {
  isAuthenticated?: boolean;
  error: IError;
  clearErrors(): void;
}

export interface ILoginModal extends IAuthForm {
  login(user: IUser): void;
}

export interface IRegisterModal extends IAuthForm {
  register(user: IUser): void;
}

export interface ILogoutProps {
  logout(): void;
}

export interface IError {
  id: E_ERROR;
  msg: IMsg;
}

export interface IAuthReduxProps {
  auth: { isAuthenticated: boolean, isAdmin:boolean };
  error: IError;
}

export interface IConfigHeaders {
  headers: {
    [index: string]: string;
  };
}

// NAVBAR
export interface IAppNavbar {
  auth?: {
    isAuthenticated: boolean;
    user: IUser;
    isAdmin :boolean;
  };
}

// ITEMS
export interface IExistingItem {
  _id: string;
  name: string;
  desc: string;
  prize: number;
}

export interface IItem {
  _id?: string;
  name: string;
  desc: string;
  prize: number;
}

export interface IItemModal {
  isAuthenticated: boolean;
  isAdmin:boolean;
  addItem(item: IItem): void;
}

export interface IItemEditModal {
  isAuthenticated: boolean;
  editItem(item: IItem): void;
  item : IItem;
  isAdmin:boolean;
}

export interface IItemReduxProps extends IAuthReduxProps {
  item: {
    items: IExistingItem[];
  };
}

export interface IShoppingList {
  item: {
    items: IExistingItem[];
  };
  getItems(): void;
  deleteItem(id: string): void;
  isAuthenticated: boolean;
  isAdmin:boolean;
}

// <<<<<<<<<<<>>>>>>>>>>>>
// <<<<<<<< FLUX >>>>>>>>>
// <<<<<<<<<<<>>>>>>>>>>>>

export interface IAuthFunction {
  name?: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface IReturnErrors {
  msg: {
    msg: string | any;
  };
  status: string;
  id: any;
}

export interface IAction {
  type: string;
  payload?: any;
}
