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
router.get('/:id', AcademicSemesterController.getSingleSemester);
router.get('/', AcademicSemesterController.getAllSemester);
export const AcademicSemesterRoutes = {
  router,
};
