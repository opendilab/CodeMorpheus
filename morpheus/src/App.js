import React, { Component } from 'react';
import Poster from 'components/poster_template';

class App extends Component {
  state = {
    title: 'CodeMorpheus',
    subtitle: '2023 GitHub 自画像',
    footer: 'Anything one man can imagine, other men can make real. ',
    image: 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Flabel.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1711640138&Signature=LoRMt9cMMvL6QTr8Q8OrMH6%2Fd9Q%3D'
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
          footer={this.state.footer}
        />
      </div>
    );
  }
}

export default App;
