import { Request, Response, NextFunction } from 'express';
import { Contract } from '../models/Contract.model';
import { AppError } from '../middleware/errorHandler';
import { validationResult } from 'express-validator';

export class ContractController {
  // Créer un contrat
  static async createContract(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const contract = new Contract(req.body);
      await contract.save();

      res.status(201).json({
        status: 'success',
        data: { contract }
      });
    } catch (error) {
      next(error);
    }
  }

  // Récupérer tous les contrats
  static async getAllContracts(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const contracts = await Contract.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Contract.countDocuments();

      res.status(200).json({
        status: 'success',
        data: {
          contracts,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Récupérer un contrat par ID
  static async getContractById(req: Request, res: Response, next: NextFunction) {
    try {
      const contract = await Contract.findById(req.params.id);

      if (!contract) {
        throw new AppError('Contrat non trouvé', 404);
      }

      res.status(200).json({
        status: 'success',
        data: { contract }
      });
    } catch (error) {
      next(error);
    }
  }

  // Mettre à jour un contrat
  static async updateContract(req: Request, res: Response, next: NextFunction) {
    try {
      const contract = await Contract.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!contract) {
        throw new AppError('Contrat non trouvé', 404);
      }

      res.status(200).json({
        status: 'success',
        data: { contract }
      });
    } catch (error) {
      next(error);
    }
  }

  // Supprimer un contrat
  static async deleteContract(req: Request, res: Response, next: NextFunction) {
    try {
      const contract = await Contract.findByIdAndDelete(req.params.id);

      if (!contract) {
        throw new AppError('Contrat non trouvé', 404);
      }

      res.status(204).json({
        status: 'success',
        data: null
      });
    } catch (error) {
      next(error);
    }
  }

  // Rechercher des contrats
  static async searchContracts(req: Request, res: Response, next: NextFunction) {
    try {
      const { search } = req.query;
      
      const contracts = await Contract.find({
        $or: [
          { 'tenant.firstName': { $regex: search, $options: 'i' } },
          { 'tenant.lastName': { $regex: search, $options: 'i' } },
          { 'tenant.phone': { $regex: search, $options: 'i' } }
        ]
      }).sort({ createdAt: -1 });

      res.status(200).json({
        status: 'success',
        data: { contracts }
      });
    } catch (error) {
      next(error);
    }
  }

  static async addInventoryOut(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { inventoryOut } = req.body;

      const contract = await Contract.findById(id);

      if (!contract) {
        throw new AppError('Contrat non trouvé', 404);
      }

      contract.inventoryOut = inventoryOut;
      await contract.save();

      res.status(200).json({
        status: 'success',
        data: { contract }
      });
    } catch (error) {
      next(error);
    }
  }
}