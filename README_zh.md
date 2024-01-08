# CodeMorpheus
[English](https://github.com/opendilab/CodeMorpheus/blob/release/README.md) | 简体中文
<div align="center">
    <img width="1000px" height="auto" src="https://github.com/opendilab/CodeMorpheus/blob/release/assets/template_imgs.jpeg"></a>
</div>


:rocket: :rocket:  你是否曾想过代码不仅仅可以执行逻辑，还能够被转化为视觉艺术？这不仅是一个活动，更是一个艺术实验。亲爱的编程爱好者们，为了庆祝这个属于我们的特殊日子，OpenDILab为各位“程序猿”们准备了一个精彩的活动，让你用代码“绘”出你心中的世界。

P.S. 路过记得点个 star ![stars - codemorpheus](https://img.shields.io/github/stars/opendilab/codemorpheus?style=social) ，持续更新ing。

## News
- 2024.01.08: 我们发布了 GitHub 年终盘点版本的CodeMprpheus，欢迎大家点击试玩！ [在线试玩](https://morpheus.opendilab.org.cn) & [知乎文章](https://zhuanlan.zhihu.com/p/676509763)

## :star_struck: 快速上手指南

### 直接输入代码

访问[活动页面](http://codemorpheus.opendilab.net/)，将想要生成的代码段输入到对话框内 点击“提交生成”，等待20-35秒后，即可获得代码专属形象。
<div align="center">
    <img width="320px" height="240px" src="https://github.com/opendilab/CodeMorpheus/blob/release/assets/input_code_zh.jpg"></a>
</div>

### 上传代码文件

访问[活动页面](http://codemorpheus.opendilab.net/)，点击“通过文件上传代码”，选择想要生成的代码文件后，点击“提交生成”，等20-35秒后，即可获得代码专属形象。
<div align="center">
    <img width="320px" height="240px" src="https://github.com/opendilab/CodeMorpheus/blob/release/assets/upload_file_zh.jpg"></a>
</div>

## :writing_hand: 更新计划

- [x] 开源推理服务接口
- [x] 数据集样例
- [ ] 开源完整推理模型代码
- [ ] 接入更多开源文生图模型
- [ ] 开放完整代码-提示词-自画像数据集
- [ ] 开源RL微调代码
- [ ] 支持更多编程语言


# 项目结构
```text
.
├── LICENSE
├── assets                       --> 相关图片素材（转载请注明来源）
├── morpheus                     --> GitHub 年终盘点相关代码
├── template_data                --> 样例数据
├── analysis.py                  --> 使用量统计代码
├── app.py                       --> Gradio App 代码
├── code2pil.py                  --> 图片生成代码
├── examples.py                  --> 代码样例
└── language_model.py            --> 语言模型代码


```

## :speech_balloon: 反馈意见和贡献
- 有任何疑问或意见都可以在 github 上直接 [提出 issue](https://github.com/opendilab/LightZero/issues/new/choose)
- 或者联系我们的邮箱 (opendilab@pjlab.org.cn)

- 我们欢迎任何有关提升 CodeMorpheus 项目代码质量和生成效果的意见和建议。

- 如果对相关技术细节有兴趣，可以加入 OpenDILab 的微信讨论群参与讨论。 (即添加小助手微信：ding314assist)
<img src=https://github.com/opendilab/CodeMorpheus/blob/release/assets/wechat.jpeg width=35% />


## License
本仓库中的所有代码都符合 [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

<p align="right">(<a href="#top">back to top</a>)</p>
