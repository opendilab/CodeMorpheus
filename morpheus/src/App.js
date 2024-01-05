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
    isLoading: false,
    isFetched: false,
    isSuccess: false,
    diveIn: false,
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
                'Authorization': `Bearer ${process.env.REACT_APP_API_KEY || ''}`,
            },
            body: JSON.stringify({'username': username}),
        }
    ).then(response => response.json())
     .then(data => formatData(data))
     .then(data => this.setState({ data: data, isFetched: true, isLoading: false, isSuccess: (data.statusCode === 200) }))
     .catch(error => console.error("fetch error", error));

    this.setState({ username: '' });
  }


  render() {
    const setUserName = (username) => {
        this.setState({ username: username, isLoading: true, isFetched: false, isSuccess: false });
    };

    const setDiveIn = (diveIn) => {
        this.setState({ diveIn: diveIn });
    };

    if (this.state.isSuccess && this.state.diveIn) {
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

    return (
        <div className="container">
            <Entry setUserName={setUserName} setDiveIn={setDiveIn} imgUrl={this.state.data?.imgUrl} isLoading={this.state.isLoading} isSuccess={this.state.isSuccess} isFetched={this.state.isFetched} />
        </div>
    );

  }
}

export default App;
