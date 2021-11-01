import { ResponseModel } from '../ui/ui.models';

export interface LoginServiceModel {
    email: string;
    password: string;
}

export interface LoginResponseModel extends ResponseModel {
    body: UserInfo;
}

export interface UserInfo {
  isAdmin: string;
}
