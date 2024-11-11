module.exports = {
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      // Your setup code for before and after middleware goes here

      // Example of adding a custom middleware
      middlewares.unshift({
        name: "customMiddleware",
        middleware: (req, res, next) => {
          // Custom middleware code
          next();
        },
      });

      return middlewares;
    },
  },
};
