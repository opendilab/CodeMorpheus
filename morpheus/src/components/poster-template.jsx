import { Component, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell } from "recharts";
import * as echarts from 'echarts';
import * as React from 'react'
import 'echarts-wordcloud';
import { TrophyIcon, MarkGithubIcon, GitPullRequestIcon, GitCommitIcon, StarIcon, ClockIcon } from '@primer/octicons-react'
import {QRCodeSVG} from 'qrcode.react';
import { renderActiveShape, COLORS } from 'components/pie'

const fakeData = { 
    totalOperation: 9999,
    commitOperation: 2023,
    PRIssueOperation: 66,
    latestMoment: "03:14",
    favoriteRepo: "OpenDILab/DI-engine",
    label: "磅礴浩渺的攀登者",
    languageRanking: [ 
        { name: "Python", value: 33.27 },
        { name: "C++", value: 29.17 },
        { name: "Java", value: 13.27 },
        { name: "Cython", value: 12.11 },
        { name: "HTML", value: 10.00 },
        { name: "Others", value: 5.45 },
    ],
    imgUrl: "https://psydi.oss-cn-shanghai.aliyuncs.com/codemorpheus%2Fdemo_diffusion.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1711646125&Signature=PiLESGJ7ZfP3gsB9pYxDoUflj0k%3D",
    repoTopic: {'RL': 5, 'deep-learning': 3, 'imitation-learning': 3, 'reinforcement-learning-algorithms': 3, 'nextjs': 3, 'react': 3, 'vercel': 3, 'chatgpt': 2, 'llm': 2, 'inverse-reinforcement-learning': 2, 'model-based-reinforcement-learning': 2, 'offline-rl': 2, 'pytorch-rl': 2, 'deep-reinforcement-learning': 2, 'large-language-models': 2, 'atari': 2, 'pytorch': 2, 'self-play': 2, 'compiler': 2, 'agent': 1},
};
        //<div style={{margin: "15px", justifyContent: "center", display: 'flex'}}>
        // <img src={imgUrl} alt="sd image" style={{ width: '90%' }} />
        //</div>
function WordCloudComponent(props) {
  const chartRef = useRef(null);

  useEffect(() => {
      // transfrom word to echarts format
    const wordFrequency = Object.entries(props.words).map(([name, value]) => ({ name, value }));

    const chart = echarts.init(chartRef.current);

    const option = {
      series: [{
        type: 'wordCloud',
        sizeRange: [4, 32],
        gridSize: 2,
        width: "135px",
        textStyle: {
          normal: {
            fontFamily: 'Arial',
            fontWeight: 'bold',
          },
		color: function () {
			return 'rgb(' + [
				Math.round(Math.random() * 200) + 50,
				Math.round(Math.random() * 50),
				Math.round(Math.random() * 50) + 50
			].join(',') + ')';
		}
        },
        data: wordFrequency,
      }],
    };

    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '140px' }} />;
}

function IconComponent(props) {
  let cssName = ""
  if (props.cssType === "left") {
    cssName = "icon-item-left"
  } else if (props.cssType === "right") {
    cssName = "icon-item-right"
  } else if (props.cssType === "middle") {
    cssName = "icon-item-middle"
  } else {
    throw new Error("cssType must be left or right: " + props.cssType + " is not allowed")
  }
  const Icon = props.icon

  return (
    <div className={cssName}>
      <button className="github-button">
        <Icon size={20} fill={"rgb(199, 93, 77"}/> 
        <span color="rgb(250, 50, 50)" style={{marginLeft: "10px"}}>{props.text}</span>
      </button>
    </div>
  )
}

class Poster extends Component {
  render() {
    const hasTitle = this.props.title;
    const hasSubTitle = this.props.subtitle;
    const username = this.props.username;
    const data = this.props.data || fakeData;

    return (
      <div className="column poster-container">
        <header>
          {/* <small className="poster-byline">A posterly original poster</small> */}
          {hasTitle ? <h2 className="poster-title">{this.props.title}</h2> : ''}
          {hasSubTitle ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h3 className="poster-subtitle">{this.props.subtitle}</h3>
                <button className="github-button-sp">
                <a
                    target="_blank"
                    href="https://github.com/opendilab/CodeMorpheus"
                    rel="noopener noreferrer"
                >
                    <MarkGithubIcon size={16} fill={"rgb(199, 93, 77"}/> 
                </a>
                </button>
            </div>
          ) : (
            ''
          )}
        </header>
          <div className="blank-area-tiny"></div>
        <div className="rectangle">
          <span className="rectangle-text"> 言之有物 </span>
        </div>
        <div className="grid-container">
          <IconComponent text={`总操作数：${data.totalOperation}`} cssType="left" icon={MarkGithubIcon}/>
          <IconComponent text={`PR/ISSUE: ${data.PRIssueOperation}`} cssType="right" icon={GitPullRequestIcon}/>
          <IconComponent text={`最晚瞬间：${data.latestMoment}`} cssType="left" icon={ClockIcon}/>
          <IconComponent text={`Commit: ${data.commitOperation}`} cssType="right" icon={GitCommitIcon}/>
        </div>
          <IconComponent text={`最关注：${data.favoriteRepo}`} cssType="middle" icon={StarIcon}/>
        <div className="rectangle">
          <span className="rectangle-text"> 小孔成像 </span>
        </div>
        <div className="grid-container">
			<div style={{margin: "5px", marginLeft: "10px", marginRight: "0px", width: '100%'}}>
				<PieChart width={150} height={140}>
				<Pie
					activeIndex={data.languageRanking.map((_, index) => index)}
					activeShape={renderActiveShape}
					data={data.languageRanking}
					cx={60}
					cy={60}
					innerRadius={16}
					outerRadius={22}
					fill="#8884d8"
					dataKey="value"
					paddingAngle={3}
				>
					{data.languageRanking.map((entry, index) => (
					  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				</PieChart>
			</div>
			<div style={{margin: "8px", marginRight: "12px", marginLeft: "0px", width: '100%'}}>
			  <WordCloudComponent words={data.repoTopic}/>
			</div>
        </div>
        <div className="icon-item-middle2"> 
          <button className="github-button" style={{fontSize: "16px"}}>
            {data.label}
          </button>
        </div>
        <footer className="poster-footer">
          <h4 style={{color: 'rgb(121, 77, 65)', marginBottom: "0px"}}>Anything one man can imagine,</h4>
          <h4 style={{color: 'rgb(121, 77, 65)', marginBottom: "0px", marginTop: "0px"}}>other men can make real.</h4>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
            <div style={{ position: "absolute", bottom: "2px", margin: "0px" }}>
              <span style={{ fontSize: "10px", fontWeight: 800}}>{"OpenDILab 出品，版权所有 © 2023"}</span>
            </div>
            <div style={{ position: "absolute", bottom: 0, right: 0, margin: "4px" }}>
              <QRCodeSVG value="https://github.com/opendilab/CodeMorpheus" size={32} fgColor={"#AE2012"}/>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Poster;
