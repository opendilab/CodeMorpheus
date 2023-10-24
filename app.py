import logging
import os
import pathlib

import gradio as gr

from examples import examples_list
from analysis import Analysis
from code2pil import code2pil

logging.basicConfig(level=logging.INFO)
title = "CodeMorpheus：一键生成代码自画像"
powered_by = "<i>Powered by <a href='https://github.com/opendilab'>OpenDILab</a> & <a href='https://miaohua.sensetime.com/zh-CN'>秒画</a><br></i>"
github_link = "<i>相关示例代码已开源，欢迎 star 和分享 <a href='https://github.com/opendilab/CodeMorpheus'>传送门</a><i>"
description = """
准备一段你自己编写的 Python 代码并提交，AI 将开始它的魔法。这不仅仅是将代码转化为图像，而是一个深度、多层次的分析。
智能体会仔细研究你的代码，根据其内容、风格、质量和语法糖等诸多因素进行考量，创作出一幅反映你个人编程特性的专属图像。每一段代码，都有其独特的故事和个性，借助决策型 AI 与生成式 AI
结合的力量，孕育代码的视觉分身，留下每个人专属的 "10.24" 记忆。

**注意：AI 生成的图片仅供参考，不代表用户的编程水平或能力，也不代表任何本项目开发人员和 AI 服务的态度与观点，我们不对生成内容做任何保证。**
"""
article = """\n
- 用户提交的代码须符合审核标准，不得提交包含色情、暴力、政治敏感或其他违规内容的代码。\n
- 坚决杜绝作品抄袭，一经发现，将取消活动提交资格。若发生知识产权纠纷，由用户自行承担法律责任。
- 所有提交代码段必须是可公开源代码，不得提交包含商业秘密或敏感信息的代码，在线网页端应用将不会记录任何用户数据。
- AI 生成的图片仅供参考，不代表用户的编程水平或能力，也不代表任何本项目开发人员和 AI 服务的态度与观点，我们不对生成内容做任何保证。
- 最终解释权归 OpenDILab 所有。
"""

analysis_obj = Analysis('analysis_dir')


def _get_cnt_text():
    return f"已为{analysis_obj.visit_count}份代码赋予自画像"


if __name__ == '__main__':
    # with gr.Blocks(theme='gradio/monochrome') as demo:
    with gr.Blocks(theme='ParityError/Interstellar', title='CodeMorpheus') as demo:
        with gr.Row():
            with gr.Column():
                # add a title
                gr_p_title = gr.Markdown(f"<h1 style='text-align: center; margin-bottom: 1rem'>{title}</h1>")
                # add github link
                gr_p_github_link = gr.Markdown(f"<h4 style='text-align: center; margin-bottom: 0.5rem'>{powered_by}{github_link}</h4>")
                # add detailed description
                gr_p_descrption = gr.Markdown(description)
                gr_p_code = gr.TextArea(placeholder='粘贴你的 Python 代码', label='Python 源代码')
                # add user tips
                gr_p_upload = gr.UploadButton(label='通过文件上传代码', file_count='single', size='sm')
                gr_p_tips = gr.Markdown('小贴士：1. 支持直接复制粘贴和文件上传代码两种方式，代码长度建议不超过 100 行；2. 文件上传只支持单个 Python 文件；3. 生成图片数量最多为 4 张；4. AI 主观补全功能将会根据 AI 的想象进行生成，结果随机性较大。', label='Tips')
                gr_p_number = gr.Slider(value=2, minimum=2, maximum=4, step=1, label='生成代码自画像候选图的数量 (2-4)')
                gr_p_func = gr.CheckboxGroup(["数字像素风格", "AI 主观补全"], label="附加功能")
                gr_p_submit = gr.Button(value='提交生成', variant='primary')
                gr.Markdown("生成过程一般需要 20-35 秒，高峰期也可能出现排队情况，敬请谅解：")
                gr_p_gallery = gr.Gallery(label='自画像生成结果', show_download_button=True, show_share_button=True)
                gr.Examples(examples=examples_list, inputs=[gr_p_code], label="代码输入样例", cache_examples=False)
                gr_p_count = gr.Markdown(f"<h4 style='text-align: center;'>{_get_cnt_text()}</h4>")
                gr.Markdown(f"<h5 style='text-align: center;'>{article}</h5>")

        def _upload_code(code_file):
            path = pathlib.Path(code_file.name)
            if not path.suffix == '.py':
                raise gr.Error("只能上传单个 Python 文件，后缀名为'.py'")
            return path.read_text(encoding='utf-8')

        def _code2pil(code_text, n_images, funcs):
            funcs_template = {'bg_completion': False, 'digital_pixel_style': False}
            if 'AI 主观补全' in funcs:
                funcs_template['bg_completion'] = True
            if '数字像素风格' in funcs:
                funcs_template['digital_pixel_style'] = True
            retval, _ = code2pil(code_text, n_images, funcs_template, download_images=False)
            analysis_obj.save()
            return retval

        gr_p_upload.upload(
            fn=_upload_code,
            inputs=[gr_p_upload],
            outputs=[gr_p_code],
        )
        gr_p_submit.click(
            fn=_code2pil,
            inputs=[gr_p_code, gr_p_number, gr_p_func],
            outputs=[gr_p_gallery],
        )

    concurrency = int(os.environ.get('CONCURRENCY', os.cpu_count()))
    demo.queue(concurrency_count=concurrency).launch(share=True, server_name="0.0.0.0", server_port=8006, favicon_path='./assets/logo.png')
