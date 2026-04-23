module.exports = {
	apps: [
	   {
		name: "backend-payments",
		script: "./server.js",
		cwd: "/home/trilho-academico/backend/payment",
		env: {
			NODE_ENV: "production",
			PORT: 5003,
		}
	  }
	]
      };
