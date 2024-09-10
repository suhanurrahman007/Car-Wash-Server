import httpStatus from 'http-status';
import catchAsync from '../../middlewares/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SlotService } from './slot.service';

const getSlot = catchAsync(async (req, res) => {
  const result = await SlotService.getSlotFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available slots retrieved successfully',
    data: result,
  });
});

export const SlotController = {
  getSlot,
};
