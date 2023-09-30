import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const result = await AcademicSemesterService.createSemester(req.body);
    res.status(200).json({
      success: true,
      message: 'create semester successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const AcademicSemesterController = {
  createSemester,
};
