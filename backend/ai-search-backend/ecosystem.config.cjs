module.exports = {
	apps: [
	  {
		name: "ai-search-backend",
		script: "./server.js",
		cwd: "/home/trilho-academico/backend/ai-search-backend",
		env: {
			NODE_ENV: "production",
			PORT: 5001
		     }
		}
	   ]
	};
