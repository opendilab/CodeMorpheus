import React, { Component } from 'react';
import Poster from 'components/poster-template';
import Entry from 'components/entry-template';


function formatData(rawData) {
    const data = rawData.result
    const statusCode = rawData.statusCode
    if (statusCode !== 200) {
        return {
            totalOperation: 0,
            commitOperation: 0,
            PRIssueOperation: 0,
            latestMoment: '00:00',
            favoriteRepo: '',
            label: '',
            languageRanking: [],
            imgUrl: '',
            repoTopic: 0,
        }
    } else {
        const tmp = data.later_time.split('-')
        const latestMoment = `${tmp[tmp.length - 3]}:${tmp[tmp.length - 2]}`
        return {
            totalOperation: data.total_operate,
            commitOperation: data.commit_operate,
            PRIssueOperation: data.issue_and_pullrequest,
            latestMoment: latestMoment,
            favoriteRepo: data.favorite_repo,
            label: data.label.split('\"')[3],
            languageRanking: Object.entries(data.language_ranking).map(item => {return { name: item[0], value: item[1] }}),
            imgUrl: data.img_url,
            repoTopic: data.topic_total,
        }
    }
}


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
    //const url = process.env.SERVER_URL || 'http://localhost:3000';
    const url = "http://8.218.102.192:8006"
    
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
