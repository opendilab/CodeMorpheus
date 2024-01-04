import React, { Component } from 'react';
import Poster from 'components/poster_template';

class App extends Component {
  state = {
    title: 'CodeMorpheus',
    subtitle: '2023 GitHub 自画像',
  };

  // Change state based on values entered
  handleValueChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <Poster
          title={this.state.title}
          subtitle={this.state.subtitle}
        />
      </div>
    );
  }
}

export default App;
