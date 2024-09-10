/* eslint-disable prefer-const */
import { minutesToTime, timeToMinutes } from './service.constant';
import { TService, TSlot } from './service.interface';
import { ServiceModel, SlotModel } from './service.model';

const createServiceIntoDB = async (payload: TService) => {
  const result = await ServiceModel.create(payload);
  return result;
};

const getAllServiceFromDB = async () => {
  const result = await ServiceModel.find();
  return result;
};

const getSingleServiceFromDB = async (id: string) => {
  const result = await ServiceModel.findById(id);
  return result;
};

const updateServiceFromDB = async (id: string, payload: Partial<TService>) => {
  const result = await ServiceModel.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteServiceFromDB = async (id: string) => {
  const result = await ServiceModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

const createSlotIntoDB = async (payload: TSlot) => {
  const { service, date, startTime, endTime } = payload;

  const serviceDuration = 60;

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  const totalDuration = endMinutes - startMinutes;

  const numberOfSlots = totalDuration / serviceDuration;

  // Generate slots
  let slots = [];
  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartTime = minutesToTime(startMinutes + i * serviceDuration);
    const slotEndTime = minutesToTime(startMinutes + (i + 1) * serviceDuration);

    slots.push({
      service,
      date,
      startTime: slotStartTime,
      endTime: slotEndTime,
    });
  }
  const result = await SlotModel.insertMany(slots);
  return result;
};

export const ServiceService = {
  createServiceIntoDB,
  getAllServiceFromDB,
  getSingleServiceFromDB,
  updateServiceFromDB,
  deleteServiceFromDB,
  createSlotIntoDB,
};
