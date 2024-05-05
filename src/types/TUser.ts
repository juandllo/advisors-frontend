export type TRole = {
  roleName: string;
}

export type TUser = {
  _id: string;
  name: string;
  lastName: string;
  cellphone: string;
  address: string;
  email: string;
  roles: TRole[];
}
