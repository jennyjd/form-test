import * as React from 'react';
import { Message } from 'semantic-ui-react';
import { editorErrorsText } from '../constants'; 

class ErrorMessage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  shouldHide() {
    const errors = this.props.errors;
    for (const error in errors) {
      if (errors[error] && error !== 'syntaxError') {
        return false;
      }
    }
    return true;
  }

  getContent() {
    let errorMessage = '';
    const errors = this.props.errors;
    for (const error in errors) {
      if (errors[error] && error !== 'syntaxError') {
        errorMessage += editorErrorsText[error];
      }
    }
    return errorMessage;
  }

  render() {
    return (
      <Message
        error={true}
        header="Sorry :("
        hidden={this.shouldHide()}
        content={this.getContent()}
      />
    );
  }
}

export default ErrorMessage;
