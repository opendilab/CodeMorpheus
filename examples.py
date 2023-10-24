examples0 = """
def hello_world():
    print("hello world")
"""
examples1 = """
class MLPNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        self.linear_relu_stack = nn.Sequential(
            nn.Linear(28*28, 512),
            nn.ReLU(),
            nn.Linear(512, 512),
            nn.ReLU(),
            nn.Linear(512, 10),
        )

    def forward(self, x):
        logits = self.linear_relu_stack(x)
        return logits
"""
examples2 = """
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
        lines = open(filename, encoding='utf-8').read().strip().split('\n')
        return [unicodeToAscii(line) for line in lines]

    for filename in findFiles('data/names/*.txt'):
        category = os.path.splitext(os.path.basename(filename))[0]
        all_categories.append(category)
        lines = readLines(filename)
        category_lines[category] = lines

    n_categories = len(all_categories)
"""
examples3 = """
def auto_reduce(rfunc, nrfunc, determine=None, condition=None):
    determine = determine or _default_auto_determine
    condition = condition or _default_auto_condition

    def _decorator(func):
        # noinspection PyUnusedLocal,PyShadowingBuiltins
        @wraps(func)
        def _new_func(input, *args, reduce: Optional[bool] = None, **kwargs):
            _determine = determine(*args, **kwargs)
            if _determine is not None:
                if reduce is not None:
                    if not _determine and reduce:
                        warnings.warn(UserWarning(
                            f'Reduce forbidden for this case of function {func.__name__}, '
                            f'enablement of reduce option will be ignored.'), stacklevel=2)
                    elif _determine and not reduce:
                        warnings.warn(UserWarning(
                            f'Reduce must be processed for this case of function {func.__name__}, '
                            f'disablement of reduce option will be ignored.'), stacklevel=2)
                reduce = not not _determine

            _reduce = condition(*args, **kwargs) if reduce is None else not not reduce
            return (rfunc if _reduce else nrfunc)(input, *args, **kwargs)

        return _new_func

    return _decorator
"""
examples4 = """
def jax_network_tutorial():
    import jax.numpy as jnp
    from jax import grad, jit, vmap
    from jax import random


    # A helper function to randomly initialize weights and biases
    # for a dense neural network layer
    def random_layer_params(m, n, key, scale=1e-2):
      w_key, b_key = random.split(key)
      return scale * random.normal(w_key, (n, m)), scale * random.normal(b_key, (n,))

    # Initialize all layers for a fully-connected neural network with sizes "sizes"
    def init_network_params(sizes, key):
      keys = random.split(key, len(sizes))
      return [random_layer_params(m, n, k) for m, n, k in zip(sizes[:-1], sizes[1:], keys)]

    layer_sizes = [784, 512, 512, 10]
    step_size = 0.01
    num_epochs = 10
    batch_size = 128
    n_targets = 10
    params = init_network_params(layer_sizes, random.PRNGKey(0))

    from jax.scipy.special import logsumexp

    def relu(x):
      return jnp.maximum(0, x)

    def predict(params, image):
      # per-example predictions
      activations = image
      for w, b in params[:-1]:
        outputs = jnp.dot(w, activations) + b
        activations = relu(outputs)

      final_w, final_b = params[-1]
      logits = jnp.dot(final_w, activations) + final_b
      return logits - logsumexp(logits)

    # This works on single examples
    random_flattened_image = random.normal(random.PRNGKey(1), (28 * 28,))
    preds = predict(params, random_flattened_image)
    print(preds.shape)
"""
examples5 = """
class EzPickle:
    '''Objects that are pickled and unpickled via their constructor arguments.

    Example::

        >>> class Dog(Animal, EzPickle):
        ...    def __init__(self, furcolor, tailkind="bushy"):
        ...        Animal.__init__()
        ...        EzPickle.__init__(furcolor, tailkind)

    When this object is unpickled, a new ``Dog`` will be constructed by passing the provided furcolor and tailkind into the constructor.
    However, philosophers are still not sure whether it is still the same dog.

    This is generally needed only for environments which wrap C/C++ code, such as MuJoCo and Atari.
    '''

    def __init__(self, *args, **kwargs):
        self._ezpickle_args = args
        self._ezpickle_kwargs = kwargs

    def __getstate__(self):
        return {
            "_ezpickle_args": self._ezpickle_args,
            "_ezpickle_kwargs": self._ezpickle_kwargs,
        }

    def __setstate__(self, d):
        out = type(self)(*d["_ezpickle_args"], **d["_ezpickle_kwargs"])
        self.__dict__.update(out.__dict__)
"""
examples6 = """
def _make_n_folds(
    full_data: Dataset,
    folds: Optional[Union[Iterable[Tuple[np.ndarray, np.ndarray]], _LGBMBaseCrossValidator]],
    nfold: int,
    params: Dict[str, Any],
    seed: int,
    fpreproc: Optional[_LGBM_PreprocFunction],
    stratified: bool,
    shuffle: bool,
    eval_train_metric: bool
) -> CVBooster:
    full_data = full_data.construct()
    num_data = full_data.num_data()
    if folds is not None:
        if not hasattr(folds, '__iter__') and not hasattr(folds, 'split'):
            raise AttributeError("folds should be a generator or iterator of (train_idx, test_idx) tuples "
                                 "or scikit-learn splitter object with split method")
        if hasattr(folds, 'split'):
            group_info = full_data.get_group()
            if group_info is not None:
                group_info = np.array(group_info, dtype=np.int32, copy=False)
                flatted_group = np.repeat(range(len(group_info)), repeats=group_info)
            else:
                flatted_group = np.zeros(num_data, dtype=np.int32)
            folds = folds.split(X=np.empty(num_data), y=full_data.get_label(), groups=flatted_group)
    else:
        if any(params.get(obj_alias, "") in {"lambdarank", "rank_xendcg", "xendcg",
                                             "xe_ndcg", "xe_ndcg_mart", "xendcg_mart"}
               for obj_alias in _ConfigAliases.get("objective")):
            if not SKLEARN_INSTALLED:
                raise LightGBMError('scikit-learn is required for ranking cv')
            # ranking task, split according to groups
            group_info = np.array(full_data.get_group(), dtype=np.int32, copy=False)
            flatted_group = np.repeat(range(len(group_info)), repeats=group_info)
            group_kfold = _LGBMGroupKFold(n_splits=nfold)
            folds = group_kfold.split(X=np.empty(num_data), groups=flatted_group)
        elif stratified:
            if not SKLEARN_INSTALLED:
                raise LightGBMError('scikit-learn is required for stratified cv')
            skf = _LGBMStratifiedKFold(n_splits=nfold, shuffle=shuffle, random_state=seed)
            folds = skf.split(X=np.empty(num_data), y=full_data.get_label())
        else:
            if shuffle:
                randidx = np.random.RandomState(seed).permutation(num_data)
            else:
                randidx = np.arange(num_data)
            kstep = int(num_data / nfold)
            test_id = [randidx[i: i + kstep] for i in range(0, num_data, kstep)]
            train_id = [np.concatenate([test_id[i] for i in range(nfold) if k != i]) for k in range(nfold)]
            folds = zip(train_id, test_id)

    ret = CVBooster()
    for train_idx, test_idx in folds:
        train_set = full_data.subset(sorted(train_idx))
        valid_set = full_data.subset(sorted(test_idx))
        # run preprocessing on the data set if needed
        if fpreproc is not None:
            train_set, valid_set, tparam = fpreproc(train_set, valid_set, params.copy())
        else:
            tparam = params
        booster_for_fold = Booster(tparam, train_set)
        if eval_train_metric:
            booster_for_fold.add_valid(train_set, 'train')
        booster_for_fold.add_valid(valid_set, 'valid')
        ret.boosters.append(booster_for_fold)
    return ret
"""
examples7 = """
def sample(self, mask: None = None) -> np.ndarray:
    r'''Generates a single random sample inside the Box.

    In creating a sample of the box, each coordinate is sampled (independently) from a distribution
    that is chosen according to the form of the interval:

    * :math:`[a, b]` : uniform distribution
    * :math:`[a, \infty)` : shifted exponential distribution
    * :math:`(-\infty, b]` : shifted negative exponential distribution
    * :math:`(-\infty, \infty)` : normal distribution

    Args:
        mask: A mask for sampling values from the Box space, currently unsupported.

    Returns:
        A sampled value from the Box
    '''
    if mask is not None:
        raise gym.error.Error(
            f"Box.sample cannot be provided a mask, actual value: {mask}"
        )

    high = self.high if self.dtype.kind == "f" else self.high.astype("int64") + 1
    sample = np.empty(self.shape)

    # Masking arrays which classify the coordinates according to interval
    # type
    unbounded = ~self.bounded_below & ~self.bounded_above
    upp_bounded = ~self.bounded_below & self.bounded_above
    low_bounded = self.bounded_below & ~self.bounded_above
    bounded = self.bounded_below & self.bounded_above

    # Vectorized sampling by interval type
    sample[unbounded] = self.np_random.normal(size=unbounded[unbounded].shape)

    sample[low_bounded] = (
        self.np_random.exponential(size=low_bounded[low_bounded].shape)
        + self.low[low_bounded]
    )

    sample[upp_bounded] = (
        -self.np_random.exponential(size=upp_bounded[upp_bounded].shape)
        + self.high[upp_bounded]
    )

    sample[bounded] = self.np_random.uniform(
        low=self.low[bounded], high=high[bounded], size=bounded[bounded].shape
    )
    if self.dtype.kind == "i":
        sample = np.floor(sample)

    return sample.astype(self.dtype)
"""
examples8 = """
class almost(Approximate):

    def normalize(self, value):
        if isinstance(value, Rating):
            return self.normalize(tuple(value))
        elif isinstance(value, list):
            try:
                if isinstance(value[0][0], Rating):
                    # flatten transformed ratings
                    return list(sum(value, ()))
            except (TypeError, IndexError):
                pass
        return super(almost, self).normalize(value)

    @classmethod
    def wrap(cls, f, *args, **kwargs):
        return lambda *a, **k: cls(f(*a, **k), *args, **kwargs)
"""
examples9 = """
def module_func_loader(base, cls: Type[TreeValue], cls_mapper=None):
    func_treelize = replaceable_partial(original_func_treelize, return_type=cls)
    doc_from_base = replaceable_partial(original_doc_from_base, base=base)
    outer_frame = inspect.currentframe().f_back
    outer_module = outer_frame.f_globals.get('__name__', None)
    auto_tree_cls = replaceable_partial(auto_tree, cls=cls_mapper or cls)

    def _load_func(name):
        func = getattr(base, name)
        return_self_dec = return_self if func.__name__.endswith("_") else (lambda x: x)

        @doc_from_base()
        @return_self_dec
        @post_process(auto_tree_cls)
        @func_treelize(return_type=TreeValue, subside=True, rise=True)
        @wraps(func, assigned=('__name__',), updated=())
        def _new_func(*args, **kwargs):
            return func(*args, **kwargs)

        _new_func.__qualname__ = _new_func.__name__
        _new_func.__module__ = outer_module
        return _new_func

    return _load_func
"""
examples_list = [
    examples0,
    examples1,
    examples2,
    examples3,
    examples4,
    examples5,
    examples6,
    examples7,
    examples8,
    examples9,
]
