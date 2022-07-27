# Programmer test - Node JS back end - [Nur Alif Ilyasa]

Dear Bukit Vista Recruiting Team.

To fulfill the online test, I gladly present my backend app. This app meet every requirement that is defined in [the task](https://www.dropbox.com/scl/fi/niffy8w0hz38lrcwkqh2v/Programmer-test---Node-JS-back-end---%5BNur-Alif-Ilyasa%5D.paper?dl=0&rlkey=aouus9c899uelehl25i03r6cl).


Thank you for giving me a chance to apply for this position. I will be patiently waiting for the next process of the application. 

# How to run

To run my app, simply copy and paste these commands in your terminal:
```
git clone https://github.com/NurAlif/alif_app_express.git
cd alif_app_express

npm install
npm start

```
Now, you can go to http://localhost:3000/api-docs to test the API.
You can use Postman instead of Swagger. The API run on http://localhost:3000


Note: You don't have to setup a database. The database is stored in [database.sqlite](database.sqlite) 

OpenAPI Doc: [apidoc.json](config/api-doc.json)


# Testing with swagger
1. Run the app on terminal

   ![pretty demo](docs/1.png)
2. Go to http://localhost:3000/api-docs

   ![pretty demo](docs/2.png)
3. You need a user you can either create or login with registered user. If you want to create a new user click Create User. 
   
   ![pretty demo](docs/3.png)
   
    Or, you can use this account to login:
    ```
    {
        id: 1,
        password: alif1234
    } 
    ```
4. Press try out to test the endpoint

   ![pretty demo](docs/4.png)
   You can edit the request body if you want
   
   ![pretty demo](docs/5.png)
5. Press execute to send a GET request. Then, the response will appear:
   
   ![pretty demo](docs/6.png)
   The response of create user endpoint is a token. Copy the token, and paste it in Authorize. This will make every endpoint that needs bearer token will be filled with this token. Otherwise the server will return code 403
   
   ![pretty demo](docs/7.png)
   
   ![pretty demo](docs/8.png)
   
   ![pretty demo](docs/9.png)
   
   If you want to log out, you can press log out in Authorize modal.
   Without a bearer token, the response would look like this:
   
   ![pretty demo](docs/14.png)

6. Now we can send a request with any endpoint.
   This is a request to get a poster url of Rambo:
   
   ![pretty demo](docs/10.png)
   
   ![pretty demo](docs/11.png)
 
   Try with any movie title you remember!

7. Add your favorite movies
   
   ![pretty demo](docs/12.png)
   
   Add as many as you want!
8. Read all your favorite movies

   ![pretty demo](docs/13.png)
  
   


# Contact
If you run into a problem feel free to contact me

nuralif.2020@student.uny.ac.id

https://wa.me/qr/5NGTX5JDQNFKF1





