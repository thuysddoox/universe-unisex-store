import API from '../axios';

const base_url = 'https://api.mysupership.vn/v1/partner/areas';
const { get } = API;

export const getCity = async () => {
  return get(`${base_url}/province`);
};
export const getDistrict = async (province: string) => {
  return province ? get(`${base_url}/district?province=${province}`) : undefined;
};
export const getCommune = async (district: string) => {
  return district ? get(`${base_url}/commune?district=${district}`) : undefined;
};
