import { connect, Dispatch } from 'react-redux';
import App from '../App';
import { Json } from '../constants';
import * as actions from '../actions/';
import { State } from '../reducers/index';

export function mapStateToProps({ fullname, email, sex, militaryduty, json }: State) {
  return {
    fullname, email, sex, militaryduty, json
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
  return {
    convertToJson: (fullname: string, email: string, sex: string, militaryduty: string) => 
      dispatch(actions.convertToJson(fullname, email, sex, militaryduty)),
    convertFromJson: (json: Json) => dispatch(actions.convertFromJson(json)),
  };
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;