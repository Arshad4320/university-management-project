import express from 'express';
import validateRequest from '../../middlewars/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';
const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(academicSemesterValidation.academicSemesterZodSchema),
  AcademicSemesterController.createSemester,
);
router.patch(
  '/:id',
  validateRequest(academicSemesterValidation.updateSemesterZodSchema),
  AcademicSemesterController.updateSemester,
);
router.get('/:id', AcademicSemesterController.getSingleSemester);
router.get('/', AcademicSemesterController.getAllSemester);
router.delete('/:id', AcademicSemesterController.deleteSemester);
export const AcademicSemesterRoutes = {
  router,
};
