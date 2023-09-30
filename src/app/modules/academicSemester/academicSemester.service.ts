import ApiError from '../../../error/ApiError';
import { academicSemesterCodeMapper } from './academicSemester.constent';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import httpStatus from 'http-status';
const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  if (academicSemesterCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code ');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = { createSemester };
