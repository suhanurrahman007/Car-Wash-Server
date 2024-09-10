import { FilterQuery } from 'mongoose';
import { TSlot, TSlotQuery } from './slot.interface';
import { SlotModel } from './slot.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';

const getSlotFromDB = async (query: TSlotQuery): Promise<TSlot[]> => {
  const { date, serviceId } = query;

  const filter: FilterQuery<TSlot> = {
    isBooked: 'available',
  };

  if (date) {
    filter.date = date;
  }

  if (serviceId) {
    filter.service = serviceId;
  }

  const result = await SlotModel.find(filter).populate('service');

  if (!result.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'In this date, no available slot');
  }
  return result;
};

export const SlotService = {
  getSlotFromDB,
};
