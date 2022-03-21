module.exports = {
  webpack(config, options) {
    config.plugins.push(
      new options.webpack.container.ModuleFederationPlugin({
        remotes: {
          mario: "mario@http://localhost:3000/_next/static/chunks/remoteEntry.js",
        },
        shared: {
          react: {
            // Notice shared ARE eager here.
            eager: true,
            singleton: true,
            requiredVersion: false,
          },
        },
      })
    );

    // we attach next internals to share scope at runtime
    config.module.rules.push({
      test: /pages\/_app.[jt]sx?/,
      loader: "@module-federation/nextjs-mf/lib/federation-loader.js",
    });

    return config;
  },
};