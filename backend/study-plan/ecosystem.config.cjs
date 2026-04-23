module.exports = {
	apps: [
	  {
		name: "backend-study-plan",
		script: "./index.js",
		cwd: "/home/trilho-academico/backend/study-plan",
		env: {
			NODE_ENV: "production",
			PORT: 5002, 
			}
		}
	   ]
	};
