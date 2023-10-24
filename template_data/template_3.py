def prepare_data():
    from io import open
    import glob
    import os

    def findFiles(path): return glob.glob(path)

    print(findFiles('data/names/*.txt'))

    import unicodedata
    import string

    all_letters = string.ascii_letters + ' .,;'
    n_letters = len(all_letters)

    # Turn a Unicode string to plain ASCII, thanks to https://stackoverflow.com/a/518232/2809427
    def unicodeToAscii(s):
        return ''.join(
            c for c in unicodedata.normalize('NFD', s)
            if unicodedata.category(c) != 'Mn'
            and c in all_letters
        )

    print(unicodeToAscii('Ślusàrski'))

    # Build the category_lines dictionary, a list of names per language
    category_lines = {}
    all_categories = []

    # Read a file and split into lines
    def readLines(filename):
        lines = open(filename, encoding='utf-8').read().strip().split('')
        return [unicodeToAscii(line) for line in lines]

    for filename in findFiles('data/names/*.txt'):
        category = os.path.splitext(os.path.basename(filename))[0]
        all_categories.append(category)
        lines = readLines(filename)
        category_lines[category] = lines

    n_categories = len(all_categories)
