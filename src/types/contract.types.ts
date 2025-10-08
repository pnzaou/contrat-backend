// Structure pour chaque composant d'une pièce
export interface IInventoryComponent {
  name: string;
  conditionIn?: string;
  conditionOut?: string;
}

// Structure pour chaque pièce
export interface IRoom {
  roomName: string;
  components: IInventoryComponent[];
}

export interface ITenant {
  firstName: string;
  lastName: string;
  origin: string;
  phone: string;
  emergencyPhone: string;
  birthYear: string;
  birthPlace: string;
  idType: string;
  idNumber: string;
}

export interface IRentalPeriod {
  arrivalDate: string;
  arrivalTime: string;
  departureDate: string;
  departureTime: string;
  numberOfDays: number;
  bookingChannel: string;
  pricePerNight: number;
  totalAmount: number;
  paymentMethod: string;
}

export interface IContract {
  tenant: ITenant;
  apartmentType?: 'F3' | 'F4';
  rentalPeriod: IRentalPeriod;
  inventoryIn: IRoom[];
  inventoryOut?: IRoom[];
  createdAt: Date;
  updatedAt: Date;
}