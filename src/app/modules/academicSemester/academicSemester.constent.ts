import {
  AcademicSemesterCode,
  AcademicSemesterMonth,
  AcademicSemesterTitle,
} from './academicSemester.interface';

export const academicSemesterTitle: AcademicSemesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const academicSemesterCode: AcademicSemesterCode[] = ['01', '02', '03'];

export const academicSemesterMonth: AcademicSemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
