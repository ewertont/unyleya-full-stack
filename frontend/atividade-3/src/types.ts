export interface Person {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  birthday: string;
  gender: string;
  image: string;
  website: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
}

export interface ApiResponse {
  status: string;
  code: number;
  data: Person[];
}
