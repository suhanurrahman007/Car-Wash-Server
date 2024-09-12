// import httpStatus from 'http-status';
// import sendResponse from '../../utils/sendResponse';
// import { UserServices } from './user.service';
// import catchAsync from '../../middlewares/catchAsync';

// const createUser = catchAsync(async (req, res) => {
//   const { password, user: userData } = req.body;
//   const result = await UserServices.createUserIntoDB(password, userData);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User is created successfully',
//     data: result,
//   });
// });


// export const UserControllers = {
//   createUser,
// };

