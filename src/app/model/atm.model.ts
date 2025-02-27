export interface Atm {
  serial_number: string;
  name: string;
  type: string;
  manufacturer: string;
  image: string;
  id: number;
}

export interface AtmEditData {
  serial_number?: string;
  name?: string;
  type?: string;
  manufacturer?: string;
  image?: string;
}
