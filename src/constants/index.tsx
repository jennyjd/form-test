export const CONVERT_TO_JSON = 'CONVERT_TO_JSON';
export type CONVERT_TO_JSON = typeof CONVERT_TO_JSON;

export const CONVERT_FROM_JSON = 'CONVERT_FROM_JSON';
export type CONVERT_FROM_JSON = typeof CONVERT_FROM_JSON;

export interface Json {
  fullname: string;
  email: string;
  sex: string;
  militaryduty: string;
}

export const editorErrorsText = {
  militaryDutyForWomen: 'You cant have military duty for women.',
  badMilitarydutyValue: 'Bad malitary duty value.',
  badSexValue: 'Bad sex value.',
  fullname: 'Bad fullname value.',
  email: 'Bad email value.'
};
