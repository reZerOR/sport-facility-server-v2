import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

const createFacilityIntoDB = async (payload: Partial<TFacility>) => {
  const result = await Facility.create(payload);
  return result;
};

const updateFacilityByIdIntoDB = async (
  id: string,
  payload: Partial<TFacility>
) => {
  const result = await Facility.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const DeleteFacilityByIdIntoDB = async (id: string) => {
  const result = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};
const geAllGacilityFromDB = async () => {
  const result = await Facility.find({isDeleted: false});
  return result;
};
const getFacilityByIdFromDB = async (id: string) => {
  const result = await Facility.findById(id);
  return result;
};
export const FacilityService = {
  createFacilityIntoDB,
  updateFacilityByIdIntoDB,
  DeleteFacilityByIdIntoDB,
  geAllGacilityFromDB,
  getFacilityByIdFromDB,
};
