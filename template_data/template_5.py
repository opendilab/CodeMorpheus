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
