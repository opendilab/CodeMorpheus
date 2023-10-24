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
