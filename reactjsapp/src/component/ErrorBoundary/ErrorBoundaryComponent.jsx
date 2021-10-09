import React, { Component } from "react";

class ErrorBoundryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
    };
  }
  static getDerivedStateFromError(error) {
    return {
      errorMessage: error.toString(),
    };
  }

  componentDidCatch = (error, logInfo) => {
    console.log(error.toString(), logInfo.componentStack);
  };

  render() {
    if (this.state.errorMessage) {
      return (
        <div className="container">
          <strong>Error Occured in rendering the component</strong>
          <hr />
          <strong>{this.state.errorMessage}</strong>
        </div>
      );
    } else {
        return this.props.children; 
    }
  }
}

export default ErrorBoundryComponent;