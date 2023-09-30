import { RequestHandler } from 'express';
import { UserService } from './user.service';

// import userService from '../user/user.service';
export const createNewUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = await req.body;
    const result = await UserService.createUser(user);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const UserController = {
  createNewUser,
};
