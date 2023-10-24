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
