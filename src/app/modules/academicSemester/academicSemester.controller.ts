import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const result = await AcademicSemesterService.createSemester(req.body);
    res.status(httpStatus.OK).json({
      success: true,
      message: 'create semester successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
//pagination options
const getAllSemester: RequestHandler = async (req, res, next) => {
  try {
    // const paginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy,
    //   sortOrder: req.query.sortOrder,
    // };
    const paginationOptions = pick(req.query, paginationFields);
    const filters = pick(req.query, ['searchTerm', 'title', 'code', 'year']);
    const result = await AcademicSemesterService.getAllSemester(
      filters,
      paginationOptions,
    );
    res.status(httpStatus.OK).json({
      success: true,
      message: 'find your data',
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

//get single semester
const getSingleSemester: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await AcademicSemesterService.getSingleSemester(id);

    res.status(httpStatus.OK).json({
      success: true,
      message: 'single semester got successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
// Academic semester update
const updateSemester: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const result = await AcademicSemesterService.updateSemester(id, updateData);
    res.status(httpStatus.OK).json({
      success: true,
      message: 'semester updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteSemester: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await AcademicSemesterService.deleteSemester(id);

    res.status(httpStatus.OK).json({
      success: true,
      message: 'semester deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const AcademicSemesterController = {
  deleteSemester,
  updateSemester,
  createSemester,
  getAllSemester,
  getSingleSemester,
};
