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

export interface IInventoryItem {
  item: string;
  conditionIn: string;
  conditionOut?: string;
}

export interface IContract {
  tenant: ITenant;
  apartmentType?: string;
  rentalPeriod: IRentalPeriod;
  inventoryIn: IInventoryItem[];
  inventoryOut?: IInventoryItem[];
  createdAt: Date;
  updatedAt: Date;
}