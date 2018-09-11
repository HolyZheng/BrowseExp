import Axios, { AxiosPromise } from 'axios';
import config from '@/config';

const baseUrl: string = config.Url;

const axios = Axios.create({
  method: 'get',
  baseURL: baseUrl,
  headers: {
    'Authorization': `Bearer ${config.SpecialPassCode}`,
    'withCredentials': true,
  },
});

export const getAllExperiments = (limit: number, offset: number): AxiosPromise => {
  return axios('/experiments', {
    params: {
      limit,
      offset,
    },
  });
};

export const getExperimentsByType = (type: string, limit: number, offset: number): AxiosPromise => {
  const url = encodeURI('/experiment_types/' + type);
  return axios.get(url, {
    params: {
      limit,
      offset,
    },
  });
};

export const getExperiment = (id: number): AxiosPromise => {
  const url = '/experiments/' + id;
  return axios.get(url);
};
