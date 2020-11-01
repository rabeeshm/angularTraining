export class Auth {

}
export interface LoginRequest {
  username: string;
  password: string;
}
export interface LoginResponse {
  status: boolean;
  message: string;
  id: string;
  username: string;
}
