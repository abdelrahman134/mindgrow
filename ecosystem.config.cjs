module.exports = {
  apps: [
    {
      name: 'my-app',       // Name of your app
      script: 'npm',        // The command to run
      args: 'start',        // Arguments to pass to the command
      interpreter: 'none',  // Tells PM2 not to use a Node interpreter
      env: {
        NODE_ENV: 'production',  // You can add custom environment variables here
      }
    }
  ]
};
