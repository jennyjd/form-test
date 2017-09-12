import * as constants from '../constants';

export interface ConvertToJson {
    type: constants.CONVERT_TO_JSON;
    fullname: string;
    email: string;
    sex: string;
    militaryduty: string;
}

export interface ConvertFromJson {
    type: constants.CONVERT_FROM_JSON;
    json: constants.Json;
}

export type Action = ConvertToJson | ConvertFromJson;

export function convertToJson(fullname: string, email: string, sex: string, militaryduty: string): ConvertToJson {
  return {
    type: constants.CONVERT_TO_JSON,
    fullname,
    email,
    sex,
    militaryduty,
  };
}

export function convertFromJson(json: constants.Json): ConvertFromJson {
  return {
    type: constants.CONVERT_FROM_JSON,
    json,
  };
}
