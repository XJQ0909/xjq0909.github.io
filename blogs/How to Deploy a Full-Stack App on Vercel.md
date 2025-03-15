
## Refer to the video
First watch this video-> [How to Deploy MERN Application on Vercel?](https://www.youtube.com/watch?v=Cfi0mymfKiA)
- Ensure MongoDB is working
- Deploy **two separate projects** on Vercel, one for the **frontend** and one for the **backend**.(change url)
- Handle CORS issues
- Although the blogger didn't mention environment variables, they are still an essential part of the process for privacy, security, and other reasons.

## Debugging Tips
In the process of deploying my To-Do List app on Vercel, I encountered several issues, and here’s a summary:

- If Mongoose does not work, try using the MongoDB client
- use the Terminal to simulate POST/GET requests(we can also use Postman), for example,
  ```sh
  shirleytsing@ShirleydeMBP ~ % curl -X POST http://localhost:8000/test
  ```
  *The above code helps confirm that the MongoDB connection is working properly.*
- ChatGPT might help spot syntax errors
- [StackOverflow](https://stackoverflow.com/questions/72584745/having-problem-deploying-express-server-on-vercel-404-page-not-found) mentions that for server-side JavaScript on Vercel, the file must be named **index.js**

- Vercel logs (**very important**)

## How to handle CORS errors
I ran into various CORS errors (i.e., "has been blocked by CORS policy"). Even though I tried several methods to set headers in both **vercel.json** and **index.js**, none of them worked. The real cause of the CORS issue wasn't related to the headers but to something else. I solved it by revisiting the Vercel logs for more details(i.e., Vercel logs complaining 'usersCollection is not defined,' even though I have already defined it and it works locally).

I found that it was a promise-related issue. Then I restructured my **index.js** file.
There were two ways to fix the problem:
- Wrap the routes within the database connection --> **fixed my issue**
*There might be some differences between running it locally and running it on Vercel.*
- Connection Pooling (I didn’t try this one)
