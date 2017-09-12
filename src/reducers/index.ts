import { Action } from '../actions';
import { Json } from '../constants';
import { CONVERT_TO_JSON, CONVERT_FROM_JSON } from '../constants/index';

export type State = {
  fullname: string,
  email: string,
  sex: string,
  militaryduty: string,
  json: Json,
};

export const initialState = {
  fullname: '',
  email: '',
  sex: '',
  militaryduty: 'false',
  json: {
    fullname: '',
    email: '',
    sex: '',
    militaryduty: 'false',
  },
};

export function formApp(state: State = initialState, action: Action): State {
  switch (action.type) {
    case CONVERT_TO_JSON:
      return Object.assign({}, state, {
        json: {
          fullname: action.fullname,
          email: action.email,
          sex: action.sex,
          militaryduty: action.militaryduty
        },
        fullname: '',
        email: '',
        sex: '',
        militaryduty: 'false',
      }
    );
    case CONVERT_FROM_JSON:
      const { fullname, email, sex, militaryduty } = action.json;
      return Object.assign({}, state, {
        fullname, email, sex, militaryduty,
        json: {
          fullname: '',
          email: '',
          sex: '',
          militaryduty: 'false',
        }
      });
    default:
      return state;
  }
}
