# 247-core-backend

#install the dependencies
Type the following command in the terminal.
1-npm install or yarn install 


#Add following env vars in .env file.

#JWT TOKEN VAR(for creating jwt token):
TOKEN_SECRET=>(JWT Token Secret)
#DATABASE VAR(for database connection):
Mongo_DB_URL=>(MongoDB Connection String)

AWS_S3_BUCKET=>(AWS s3 bucket name)
AWS_ACCESS_KEY_ID=>(AWS access key id)
AWS_SECRET_KEY=>(AWS secret key)


#STRIPE VARS(for payment process):
STRIPE_SECRET_KEY=>(stripe app secret key)
STRIPE_PUBLISHABLE_KEY=>(stripe app publishable key)

#TWILLO VARS(for sms authentication):
TWILIO_PHONE_NUMBER=>(twillo phone number)
TWILIO_ACCOUNT_SID=>(twillo account ssid)
TWILIO_AUTH_TOKEN=>(twillo auth token)


#for build the project
type the following command to build ts files into js files
=>yarn build

#for starting dev server
type the following command in the terminal, following command will watch for all changes in the files.
=>yarn dev 

#for starting the server
type the following command in the terminal.
=>yarn start


#for pushing the code to heroku backend server 
Type the following commands in the terminal
1-git add .
2-git commit -m "My first commit"
3-heroku git:remote -a example-app (add the heroku app remote origin)
4-git push heroku main (this will push the code and deploy the backend on heroku automatically)


