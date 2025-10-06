import { Router } from 'express';
import { ContractController } from '../controllers/contract.controller';
import { body } from 'express-validator';

const router = Router();

// Validations
const contractValidation = [
  body('tenant.firstName').notEmpty().trim(),
  body('tenant.lastName').notEmpty().trim(),
  body('tenant.origin').notEmpty().trim(),
  body('tenant.phone').notEmpty().trim(),
  body('tenant.emergencyPhone').notEmpty().trim(),
  body('tenant.birthYear').notEmpty(),
  body('tenant.birthPlace').notEmpty().trim(),
  body('tenant.idType').isIn(['CNI', 'Passeport', 'Permis']),
  body('tenant.idNumber').notEmpty().trim(),
  body('rentalPeriod.arrivalDate').notEmpty(),
  body('rentalPeriod.arrivalTime').notEmpty(),
  body('rentalPeriod.departureDate').notEmpty(),
  body('rentalPeriod.departureTime').notEmpty(),
  body('rentalPeriod.numberOfDays').isInt({ min: 1 }),
  body('rentalPeriod.bookingChannel').isIn(['Booking', 'Airbnb', 'Courtier', 'Direct', 'Autre']),
  body('rentalPeriod.pricePerNight').isNumeric(),
  body('rentalPeriod.totalAmount').isNumeric(),
  body('rentalPeriod.paymentMethod').isIn(['Espèces', 'Carte bancaire', 'Virement', 'Chèque']),
  body('inventoryIn').isArray({ min: 1 })
];

// Routes
router.post('/', contractValidation, ContractController.createContract);
router.get('/', ContractController.getAllContracts);
router.get('/search', ContractController.searchContracts);
router.get('/:id', ContractController.getContractById);
router.put('/:id', ContractController.updateContract);
router.delete('/:id', ContractController.deleteContract);

export default router;