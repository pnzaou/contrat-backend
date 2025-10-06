import mongoose, { Schema, Document } from "mongoose";
import { IContract, IInventoryItem } from "../types/contract.types";

export interface IContractDocument extends IContract, Document {}

const TenantSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  origin: { type: String, required: true },
  phone: { type: String, required: true },
  emergencyPhone: { type: String, required: true },
  birthYear: { type: String, required: true },
  birthPlace: { type: String, required: true },
  idType: { type: String, required: true, enum: ['CNI', 'Passeport', 'Permis'] },
  idNumber: { type: String, required: true }
}, { _id: false });

const RentalPeriodSchema = new Schema({
  arrivalDate: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  departureDate: { type: String, required: true },
  departureTime: { type: String, required: true },
  numberOfDays: { type: Number, required: true, min: 1 },
  bookingChannel: { 
    type: String, 
    required: true, 
    enum: ['Booking', 'Airbnb', 'Courtier', 'Direct', 'Autre'] 
  },
  pricePerNight: { type: Number, required: true, min: 0 },
  totalAmount: { type: Number, required: true, min: 0 },
  paymentMethod: { 
    type: String, 
    required: true, 
    enum: ['Espèces', 'Carte bancaire', 'Virement', 'Chèque'] 
  }
}, { _id: false });

const InventoryItemSchema = new Schema({
  item: { type: String, required: true },
  conditionIn: { type: String, required: true },
  conditionOut: { type: String }
}, { _id: false });

const ContractSchema = new Schema<IContractDocument>({
  tenant: { type: TenantSchema, required: true },
  apartmentType: { 
    type: String, 
    enum: ['F3', 'F4'],
    required: false 
  },
  rentalPeriod: { type: RentalPeriodSchema, required: true },
  inventoryIn: { 
    type: [InventoryItemSchema], 
    required: true,
    validate: {
      validator: (v: IInventoryItem[]) => v.length > 0,
      message: 'Au moins un élément d\'inventaire requis'
    }
  },
  inventoryOut: { type: [InventoryItemSchema] }
}, {
  timestamps: true
});

ContractSchema.index({ 'tenant.lastName': 1, 'tenant.firstName': 1 });
ContractSchema.index({ createdAt: -1 });

export const Contract = mongoose.model<IContractDocument>('Contract', ContractSchema);