from typing import List, Tuple
from PIL import Image
import re
import logging
from transformers.generation import GenerationConfig
from language_model import get_model, get_tokenizer


class Text2ImageAPI:
    # to be updated
    pass


model, tokenizer = get_model('llama-2-7b-hf'), get_tokenizer('llama-2-7b-hf')


def code2pil(code_text, n_images: int = 2, funcs: dict = {}, download_images: bool = True) -> Tuple[List[Image.Image], str]:
    t2i_api = Text2ImageAPI()

    logging.info('Analysing code ...')
    # preprocess code input
    messages_str = code_text
    # predict prompt with fine-tuned LM
    output = tokenizer.decode(
        model.generate(
            tokenizer.encode(
                messages_str,
                return_tensors="pt",
            ).to(model.device),
            generation_config=GenerationConfig(max_new_tokens=100)
        )[0]
    )
    # postprocess reply output
    reply = output[len(messages_str):]
    reply = reply.lower()
    reply = 'style' + reply.split('style')[-1]

    lines = [line.strip() for line in reply.splitlines(keepends=False) if line.strip()]
    fills = [re.split(r'\s*:\s*', line, maxsplit=1)[-1] for line in lines]
    prompt = ','.join(fills)
    if funcs['digital_pixel_style']:
        prompt = 'pixel style, 8-bit digitial game art, ' + prompt

    logging.info(f'Prompt for image generation: {prompt}')
    task_id = t2i_api.submit_task(prompt, n_images)
    result = t2i_api.get_result(task_id, download_images=download_images)
    logging.info('Generation is over!\n\n')
    return result, prompt
