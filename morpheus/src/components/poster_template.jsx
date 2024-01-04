import { Component, useEffect, useRef, createRef } from 'react';
import { PieChart, Pie, Cell } from "recharts";
import * as echarts from 'echarts';
import * as React from 'react'
import 'echarts-wordcloud';
import { TrophyIcon, MarkGithubIcon, GitPullRequestIcon, GitCommitIcon, StarIcon, ClockIcon } from '@primer/octicons-react'
import {QRCodeSVG} from 'qrcode.react';
import { renderActiveShape, COLORS } from 'components/pie'

const data = [
  { name: "Python", value: 33.27 },
  { name: "Python1", value: 13.27 },
  { name: "Python2", value: 10.00 },
  { name: "C++", value: 29.17 },
  { name: "Cython", value: 12.11 },
  { name: "Others", value: 5.45 },
];
const imgUrl = "https://psydi.oss-cn-shanghai.aliyuncs.com/codemorpheus%2Fdemo_diffusion.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1711646125&Signature=PiLESGJ7ZfP3gsB9pYxDoUflj0k%3D";
const words = {'RL': 5, 'deep-learning': 3, 'imitation-learning': 3, 'reinforcement-learning-algorithms': 3, 'nextjs': 3, 'react': 3, 'vercel': 3, 'chatgpt': 2, 'llm': 2, 'inverse-reinforcement-learning': 2, 'model-based-reinforcement-learning': 2, 'offline-rl': 2, 'pytorch-rl': 2, 'deep-reinforcement-learning': 2, 'large-language-models': 2, 'atari': 2, 'pytorch': 2, 'self-play': 2, 'compiler': 2, 'agent': 1}
        //<div style={{margin: "15px", justifyContent: "center", display: 'flex'}}>
        // <img src={imgUrl} alt="sd image" style={{ width: '90%' }} />
        //</div>
function WordCloudComponent() {
  const chartRef = useRef(null);

  useEffect(() => {
      // transfrom word to echarts format
    const wordFrequency = Object.entries(words).map(([name, value]) => ({ name, value }));

    const chart = echarts.init(chartRef.current);

    const option = {
      series: [{
        type: 'wordCloud',
        sizeRange: [4, 32],
        gridSize: 1,
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
  if (props.cssType == "left") {
    cssName = "icon-item-left"
  } else if (props.cssType == "right") {
    cssName = "icon-item-right"
  } else if (props.cssType == "middle") {
    cssName = "icon-item-middle"
  } else {
    throw new Error("cssType must be left or right: " + props.cssType + " is not allowed")
  }
  const Icon = props.icon

  return (
    <div className={cssName}>
      <button className="github-button">
        <Icon size={20} fill={"rgb(199, 93, 77"}/> 
        <text color="rgb(250, 50, 50)" style={{marginLeft: "10px"}}>{props.text}</text>
      </button>
    </div>
  )
}

class Poster extends Component {
  render() {
    const styles = {
      backgroundImage: `url(${this.props.image})`,
      backgroundRepeat: `no-repeat`,
      backgroundSize: `cover`
    };
    const hasTitle = this.props.title;
    const hasSubTitle = this.props.subtitle;

    return (
      <div className="column poster-container" style={styles}>
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
          <text className="rectangle-text"> GitHub 总结概述 </text>
        </div>
        <div className="grid-container">
          <IconComponent text="总操作数：9999" cssType="left" icon={MarkGithubIcon}/>
          <IconComponent text="PR/ISSUE: 666" cssType="right" icon={GitPullRequestIcon}/>
          <IconComponent text="最晚瞬间：04:59" cssType="left" icon={ClockIcon}/>
          <IconComponent text="Commit: 2023" cssType="right" icon={GitCommitIcon}/>
        </div>
          <IconComponent text="最关注：OpenDILab/DI-engine" cssType="middle" icon={StarIcon}/>
        <div className="rectangle">
          <text className="rectangle-text"> GitHub 可视化 </text>
        </div>
        <div className="grid-container">
			<div style={{margin: "10px", width: '100%'}}>
				<PieChart width={180} height={140}>
				<Pie
					activeIndex={data.map((_, index) => index)}
					activeShape={renderActiveShape}
					data={data}
					cx={60}
					cy={60}
					innerRadius={17}
					outerRadius={24}
					fill="#8884d8"
					dataKey="value"
					paddingAngle={3}
				>
					{data.map((entry, index) => (
					<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				</PieChart>
			</div>
			<div style={{margin: "10px", width: '100%'}}>
			  <WordCloudComponent />
			</div>
        </div>
        <div className="icon-item-middle2"> 
          <button className="github-button">
            称号：磅礴浩渺的攀登者
          </button>
        </div>
          <div className="blank-area-tiny"></div>
        <footer className="poster-footer">
          <h3 style={{color: 'rgb(121, 77, 65)', marginBottom: "0px"}}>{this.props.footer}</h3>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
            <div> 
              <h5>{"OpenDILab 出品，版权所有 © 2023"}</h5>
            </div>
            <div style={{ position: "absolute", bottom: 0, right: 0, margin: "8px" }}>
              <QRCodeSVG value="https://github.com/opendilab/CodeMorpheus" size={36} fgColor={"#AE2012"}/>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Poster;
