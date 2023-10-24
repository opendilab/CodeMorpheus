def _fit_full(self, X, n_components):
    xp, is_array_api_compliant = get_namespace(X)

    n_samples, n_features = X.shape

    if n_components == "mle":
        if n_samples < n_features:
            raise ValueError(
                "n_components='mle' is only supported if n_samples >= n_features"
            )
    elif not 0 <= n_components <= min(n_samples, n_features):
        raise ValueError(
            "n_components=%r must be between 0 and "
            "min(n_samples, n_features)=%r with "
            "svd_solver='full'" % (n_components, min(n_samples, n_features))
        )

    # Center data
    self.mean_ = xp.mean(X, axis=0)
    X -= self.mean_

    if not is_array_api_compliant:
        # Use scipy.linalg with NumPy/SciPy inputs for the sake of not
        # introducing unanticipated behavior changes. In the long run we
        # could instead decide to always use xp.linalg.svd for all inputs,
        # but that would make this code rely on numpy's SVD instead of
        # scipy's. It's not 100% clear whether they use the same LAPACK
        # solver by default though (assuming both are built against the
        # same BLAS).
        U, S, Vt = linalg.svd(X, full_matrices=False)
    else:
        U, S, Vt = xp.linalg.svd(X, full_matrices=False)
    # flip eigenvectors' sign to enforce deterministic output
    U, Vt = svd_flip(U, Vt)

    components_ = Vt

    # Get variance explained by singular values
    explained_variance_ = (S**2) / (n_samples - 1)
    total_var = xp.sum(explained_variance_)
    explained_variance_ratio_ = explained_variance_ / total_var
    singular_values_ = xp.asarray(S, copy=True)  # Store the singular values.

    # Postprocess the number of components required
    if n_components == "mle":
        n_components = _infer_dimension(explained_variance_, n_samples)
    elif 0 < n_components < 1.0:
        # number of components for which the cumulated explained
        # variance percentage is superior to the desired threshold
        # side='right' ensures that number of features selected
        # their variance is always greater than n_components float
        # passed. More discussion in issue: #15669
        ratio_cumsum = stable_cumsum(explained_variance_ratio_)
        n_components = xp.searchsorted(ratio_cumsum, n_components, side="right") + 1
    # Compute noise covariance using Probabilistic PCA model
    # The sigma2 maximum likelihood (cf. eq. 12.46)
    if n_components < min(n_features, n_samples):
        self.noise_variance_ = xp.mean(explained_variance_[n_components:])
    else:
        self.noise_variance_ = 0.0

    self.n_samples_ = n_samples
    self.components_ = components_[:n_components, :]
    self.n_components_ = n_components
    self.explained_variance_ = explained_variance_[:n_components]
    self.explained_variance_ratio_ = explained_variance_ratio_[:n_components]
    self.singular_values_ = singular_values_[:n_components]

    return U, S, Vt

