# CodeMorpheus
English | [简体中文](https://github.com/opendilab/CodeMorpheus/blob/release/README_zh.md)
<div align="center">
    <img width="1000px" height="auto" src="https://github.com/opendilab/CodeMorpheus/blob/release/assets/template_imgs.jpeg"></a>
</div>


:rocket: :rocket: "Have you ever contemplated that code can do more than just execute logic, but can also be transformed into visual art? This is not just an event; it's an artistic experiment. Dear coding enthusiasts, in celebration of this special day that belongs to us, OpenDILab has prepared a spectacular event for all the 'code monkeys' out there. Let your code 'paint' the world in your heart."

P.S. remember to give us a star ![stars - codemorpheus](https://img.shields.io/github/stars/opendilab/codemorpheus?style=social)

## :star_struck: Quick Start

### Input Code Lines

You can [access it online](http://codemorpheus.opendilab.net/), enter the code snippet you wish to generate into the input box, click 'submit and generate', and after waiting for a few seconds, you can obtain a portrait of that code segment.
<div align="center">
    <img width="50%" height="50%" src="https://github.com/opendilab/CodeMorpheus/blob/release/assets/input_code_en.jpg"></a>
</div>

### Upload Code File

You can [access it online](http://codemorpheus.opendilab.net/), click ‘Upload code via file’, and select the code you want to generate, click 'submit and generate', and after waiting for a few seconds, you can obtain a portrait of that code segment.
<div align="center">
    <img width="50%" height="50%" src="https://github.com/opendilab/CodeMorpheus/blob/release/assets/upload_file_en.jpg"></a>
</div>

## :writing_hand: Feature

- [x] Release inference service
- [x] Dataset examples
- [ ] Release inference model
- [ ] Access to more open source text-to-image models
- [ ] Release code-prompt-self-portrait dataset
- [ ] Release RL fine-tuning code
- [ ] Support more programming languages


## Project Structure
```text
.
├── LICENSE
├── assets                       --> media assets (please indicate the source if you want to reprint)
├── template_data                --> data for examples
├── analysis.py                  --> code for usage statistics
├── app.py                       --> code for Gradio App
├── code2pil.py                  --> code for image generation
├── examples.py                  --> code examples
└── language_model.py            --> code for language model

```

## News
- 2024.01.08: We released the GitHub year-end wraparound version of CodeMorpheus, come and try! [Online trial](https://morpheus.opendilab.org.cn) and [Release note](https://zhuanlan.zhihu.com/p/676509763)

## :speech_balloon: Feedback and Contribution
- [File an issue](https://github.com/opendilab/CodeMorpheus/issues/new/choose) on Github
- Contact our email (opendilab@pjlab.org.cn)

- We appreciate all the feedback and contributions to improve CodeMorpheus, both algorithms and system designs. 

- Discuss on DI-engine's WeChat group (i.e. add us on WeChat: ding314assist)
<img src=https://github.com/opendilab/CodeMorpheus/blob/release/assets/wechat.jpeg width=35% />


## License
All code within this repository is under [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

<p align="right">(<a href="#top">back to top</a>)</p>
