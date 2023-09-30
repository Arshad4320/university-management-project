import { Schema, model } from 'mongoose';
import httpStatus from 'http-status';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';
import {
  academicSemesterCode,
  academicSemesterMonth,
  academicSemesterTitle,
} from './academicSemester.constent';
import ApiError from '../../../error/ApiError';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitle,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCode,
    },
    startMonth: {
      type: String,
      require: true,
      enum: academicSemesterMonth,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonth,
    },
  },
  { timestamps: true },
);

academicSemesterSchema.pre('save', async function () {
  const isExit = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExit) {
    throw new ApiError(httpStatus.CONFLICT, 'Academic Semester Already Exists');
  }
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema,
);
