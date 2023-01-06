import { useQuery } from 'react-query';
import { getCity, getDistrict, getCommune } from '../services/address';

const CITY_LIST = 'CITY_LIST';
const DISTRICT_LIST = 'DISTRICT_LIST';
const COMMUNE_LIST = 'COMMUNE_LIST';
export const useQueryCity = () => useQuery([CITY_LIST], () => getCity(), { refetchOnWindowFocus: false });
export const useQueryDistrict = (payload: string) =>
  useQuery([DISTRICT_LIST, payload], () => getDistrict(payload), { refetchOnWindowFocus: false });
export const useQueryCommune = (payload: string) =>
  useQuery([COMMUNE_LIST, payload], () => getCommune(payload), { refetchOnWindowFocus: false });
