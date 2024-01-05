import React, { Component } from 'react';
import Poster from 'components/poster-template';
import Entry from 'components/entry-template';
import { formatData } from 'components/format-data';


class App extends Component {
  state = {
    title: 'CodeMorpheus',
    subtitle: '2023 GitHub 自画像',
    username: '',
    data: null,
  };

  componentDidUpdate() {
    const username = this.state.username;
    if (username === '') {
        return
    }
    const url = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000';
    
    fetch(
        `${url}/get_data`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'username': username}),
        }
    ).then(response => response.json())
     .then(data => formatData(data))
     .then(data => this.setState({ data: data }))
     .catch(error => console.error("fetch error", error));
    
    this.setState({ username: '' });
  }


  render() {
    const setUserName = (username) => {
        this.setState({ username: username });
    };

    if (!this.state.data) {
        return (
            <div className="container">
              <Entry setUserName={setUserName}/>
            </div>
        );
    }
    console.log('render')

    return (
      <div className="container">
        <Poster
          title={this.state.title}
          subtitle={this.state.subtitle}
          data={this.state.data}
        />
      </div>
    );
  }
}

export default App;
