import * as React from 'react';
import { Button, Form, Radio, Checkbox, Grid, Message } from 'semantic-ui-react';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/tomorrow';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      fullname: this.props.fullname,
      email: this.props.email,
      sex: this.props.sex,
      militaryduty: this.props.militaryduty,
      json: this.props.json,
      touched: {
        fullname: false,
        email: false,
      },
      errors: {
        fullname: true,
        email: true,
        sex: true,
        militaryduty: true
      },
      editorErrors: {
        syntaxError: false,
        badSexValue: false,
        badMilitarydutyValue: false,
        militaryDutyForWomen: false,
        fullname: false,
        email: false
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleToJsonClick = this.handleToJsonClick.bind(this);
    this.handleFromJsonClick = this.handleFromJsonClick.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.validate = this.validate.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.shouldMarkError = this.shouldMarkError.bind(this);
    this.dismissMessage = this.dismissMessage.bind(this);
    this.getValid = this.getValid.bind(this);
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps !== this.props) {
      this.setState({
        json: nextProps.json,
        fullname: nextProps.fullname,
        email: nextProps.email,
        sex: nextProps.sex,
        militaryduty: nextProps.militaryduty,
      });
      if (nextProps.fullname.length !== 0 || nextProps.email.length !== 0) {
        const emailRe = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        var fullnameRe = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
        this.setState({errors: {
          fullname: !fullnameRe.test(nextProps.fullname) || nextProps.fullname.length === 0,
          email: !emailRe.test(nextProps.email) || nextProps.email.length === 0,
          sex: !(nextProps.sex === 'male' || nextProps.sex === 'female'),
          militaryduty: (nextProps.militaryduty === 'false')
        }});
      }
    }
  }
  
  handleInputChange(event: any) {
    let {name, value} = event.target;
    this.setState({ [name]: value });
    this.validate(name, value);
  }

  handleEditorChange(newValue: string) {
    try {
      this.setState({ json: JSON.parse(newValue), editorErrors: {...this.state.editorErrors, syntaxError: false} });
    } catch (e) {
      this.setState({ editorErrors: {...this.state.editorErrors, syntaxError: true}});
    }
  }

  handleRadioChange(event: any, {value}: any) {
    this.setState({ sex: value , errors: {...this.state.errors, sex: false}});
  }

  validate(name: string, value: string) {
    const emailRe = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var fullnameRe = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
    if (name === 'fullname') {
      this.setState({errors: {...this.state.errors, fullname: !fullnameRe.test(value) || value.length === 0}});
    } else if (name === 'email') {
      this.setState({errors: {...this.state.errors, email: !emailRe.test(value) || value.length === 0}});
    }
  }

  handleCheck(event: any, { checked }: any) {
    this.setState({ militaryduty: checked.toString() });
    if (checked) {
      this.setState({errors: {...this.state.errors, militaryduty: false}});
    } else {
      this.setState({errors: {...this.state.errors, militaryduty: true}});
    }
  }

  getValid(): number {
    let valid = 0;
    for (const i in this.state.errors) {
      if (this.state.errors[i] === false) {
        valid += 1;
      }
    }
    return valid;
  }

  handleToJsonClick() {
    const { fullname, email, sex, militaryduty } = this.state;
    this.props.convertToJson(fullname, email, sex, militaryduty);
    this.setState({
      touched: {
        fullname: false,
        email: false,
      },
      errors: {
        fullname: true,
        email: true,
        sex: true,
        militaryduty: true,
      }
    });
  }

  handleFromJsonClick() {
    this.setState({ editorErrors: {
      syntaxError: false,
      badSexValue: false,
      badMilitarydutyValue: false,
      militaryDutyForWomen: false,
      fullname: false,
      email: false
    }});
    if (this.isEditorValid()) {
      this.props.convertFromJson(this.state.json);
    }
  }

  isEditorValid(): boolean {
    const emailRe = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var fullnameRe = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
    let flag = true;
    let errors = {
      badSexError: false,
      badMilitaryError: false,
      militaryForWomenError: false,
      fullnameError: false,
      emailError: false
    };
    const {fullname, email, sex, militaryduty} = this.state.json;
    if (!emailRe.test(email) || email.length === 0) {
      errors.emailError = true;
      flag = false;
    }
    if (sex !== 'male' && sex !== 'female' && sex !== '') {
      errors.badSexError = true;
      flag = false;
    }
    if (militaryduty !== 'true' && militaryduty !== 'false') {
      errors.badMilitaryError = true;
      flag = false;
    }
    if (militaryduty === 'true' && sex === 'female') {
      errors.militaryForWomenError = true;
      flag = false;
    }
    if (!fullnameRe.test(fullname) || fullname.length === 0) {
      errors.fullnameError = true;
      flag = false;
    }
    const {badSexError, badMilitaryError, militaryForWomenError, fullnameError, emailError} = errors;
    this.setState({ editorErrors: {
      ...this.state.editorErrors,
      fullname: fullnameError,
      email: emailError,
      badSexValue: badSexError,
      badMilitarydutyValue: badMilitaryError,
      militaryDutyForWomen: militaryForWomenError
    }});
    return flag;
  }

  shouldMarkError(field: string) {
    const hasError = this.state.errors[field];
    const shouldShow = this.state.touched[field];

    return hasError ? shouldShow : false;
  }

  handleBlur = (field: string) => (evt: any) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  dismissMessage() {
    this.setState({ editorErrors: {...this.state.editorErrors, syntaxError: false}});
  }

  render() {
    const { fullname, email } = this.state.errors;
    return (
      <Grid columns={2} relaxed={true}>
        <Grid.Column style={{padding: '30px'}}>
          <h1>Completed <span className={this.getValid() === 4 ? 'green' : ''}>{this.getValid()}/4</span></h1>
          <Form onSubmit={this.handleToJsonClick}>
            <Form.Field>
              <label>Enter your fullname</label>
              <input
                placeholder="Enter your fullname"
                className={this.shouldMarkError('fullname') ? 'error' : ''}
                name="fullname"
                value={this.state.fullname}
                onChange={this.handleInputChange}
                onBlur={this.handleBlur('fullname')}
                required={true}
                maxLength={50}
              />
            </Form.Field>
            <Form.Field>
              <label>Enter your email</label>
              <input
                placeholder="Enter your email"
                className={this.shouldMarkError('email') ? 'error' : ''}
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                onBlur={this.handleBlur('email')}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="Female"
                name="sex"
                value="female"
                checked={this.state.sex === 'female'}
                onChange={this.handleRadioChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="Male"
                name="sex"
                value="male"
                checked={this.state.sex === 'male'}
                onChange={this.handleRadioChange}
              />
            </Form.Field>
            {this.state.sex === 'male' &&
              <Form.Field>
                <Checkbox
                  label="Military"
                  name="militaryduty"
                  checked={this.state.militaryduty === 'true'}
                  onChange={this.handleCheck}
                />
              </Form.Field>
            }
            <Button
              className="my-button"
              disabled={fullname || email}
              color="teal"
              type="submit"
              content="To JSON"
              icon="right arrow"
              labelPosition="right"
            />
          </Form>
        </Grid.Column>
        <Grid.Column style={{padding: '30px'}}>
          <div className="editor">
            <AceEditor
              mode="json"
              theme="tomorrow"
              value={JSON.stringify(this.state.json, null, '\t')}
              highlightActiveLine={false}
              onChange={this.handleEditorChange}
              fontSize={15}
              showGutter={false}
              tabSize={2}
              height="200"
              name="UNIQUE_ID_OF_DIV"
              editorProps={{$blockScrolling: true}}
            />
          </div>
          <Button
            className="my-button"
            color="olive"
            content="From JSON"
            icon="left arrow"
            labelPosition="left"
            onClick={this.handleFromJsonClick}
          />
          <ErrorMessage
            errors={this.state.editorErrors}
          />
          <Message
            onDismiss={this.dismissMessage}
            info={true}
            hidden={this.state.editorErrors.syntaxError === false}
            header="Sorry :("
            content="Change of structure is prohibited"
          />
        </Grid.Column>  
      </Grid>
    );
  }
}

export default App;
