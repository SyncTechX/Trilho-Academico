module.exports = {
	apps: [
	   {
		name: "backend",
		script: "./index.js",
		cwd: "/home/trilho-academico/backend",
		env: {
			NODE_ENV: "production",
			PORT: 5000,
		}
	  }
	]
      };
