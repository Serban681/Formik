# Formik

How to run:  
  copy environment variables from .env.example  
Replace the  "MONGODB_URI" link with the following:  

You might want to create a mongodb cluster to test the application.  
Go to https://account.mongodb.com/account/login. Sign in with google or github. 
Create a new organization  
Then create a new project  
Click "Build a Database" in the center of the screen.  
Chose M0 FREE and give a name to the cluster.  
Add a simple username and password ex: user: "dad" pass: "dad" and click create user.  
When the cluster is created click "Connect" and choose "MongoDB for VS Code". Copy the given link and add it to the .env file. Be sure to replase <password> with the chosen password.   
 (ex: "mongodb+srv://dad:dad@cluster0.mrvo6da.mongodb.net/").  
  
Run "npm install" to install the necesary dependecies and "npm run dev" to run the application.  

Technologies used:  
  -Next.js  
  -MongoDb  
  -Next Auth  
  -Typescript  
  -trpc (for data fetching)  
  -zod (for data validation)  
