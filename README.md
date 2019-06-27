# Get started

This project consists 2 parts, server and client.

The server side was built by `json-server`, that helps create a group of APIs very quick, in just 30 secs.
The client side was build with React. It also used a trendy css frame work, `styled-components`. You might love it.

So, to get started, you need to install all the dependencies first, by running the command `npm install`, then running the following commands in different thread.

1. `npm run server`
2. `npm run client`

The main app will run in port 3000 by default, whereas the APIs will be served in 3001. Now you can open your browser and enter this URL http://localhost:3000 to access project `Kamereo Tamboon`.

You can run `npm run test`, to test your application as well.

## Project Kamereo Tamboon

You can find the requirements of this project [here](/requirements.md).

![Kamereo Tamboon](/resources/kamereo-tamboon.png)

What I've done in this project?

1. Update the layout as provided design.
2. Split Card into another component, to maintain easier in the future.
3. Create a fancy grateful popout after donating.
4. Using the approach of mobile first while working on responsive things.
5. In this scope, I covered 2 screen sizes: mobile and desktop.
6. Get rid of the old-fashioned style, self, to improve productivity when coding in the future.
7. Add fav icons and app icons. I hate when seeing a website without favicon, it seems like an undone website. App icons help out website look cool when user pin it on their own screen on mobile.
8. Upgrade webpack to the newest version.
9. Fix the spec, then I can run the test well.
10. Store `API_PATH` to a constant, maybe in future we might want to save it `config` file, to keep all components consistency.
11. A new donation cannot store in DB well, because content-type is missing when calling a request, I added it.
12. Add normalize.css to make sure that the website will be displayed the same across browsers.
13. This website has been tested on 3 browsers: Chrome, Safari and Brave.

Thank you for giving me an interesting test 🎉
