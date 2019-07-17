/**
 * create by yanle
 * create time 2019/7/17 11:07 PM
 */
export interface UserData {
  username: string;
  email: string;
  token?: string;
  bio: string;
  image?: string;
}

export interface UserRo {
  user: UserData;
}
