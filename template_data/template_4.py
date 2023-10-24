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
