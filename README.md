# Movies+ Web Application

### Description
Movies+ is a web application built using React and Next.js. This application is a movie catalog that encompasses a wide variety of movies provided by The Movie Database (TMDB) API. It can display information about most movies available in the market and includes a search functionality. The application features a responsive design based on UI/UX principles.

## Technologies
[![Next][Next.js]][Next-url]
[![React][React.js]][React-url]
[![TypeScript][TypeScript-badge]][TypeScript-url]
[![Bootstrap][Bootstrap.com]][Bootstrap-url]
[![Node.js][Node.js-badge]][Node.js-url]
[![MUI][MUI-badge]][MUI-url]


## Installation
1. Get a free API Key at [https://themoviedb.org](https://developer.themoviedb.org/docs/getting-started)
2. Clone the repo
   ```sh
   git clone https://github.com/josephr04/movie-app.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `.env.local`
   ```
   NEXT_PUBLIC_TMDB_API_KEY = 'ENTER YOUR API';
   ```
5. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```

## Acknowledgments
* [Next.js](https://nextjs.org)
* [PrimeReact](https://primereact.org)
* [Material UI](https://mui.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[TypeScript-badge]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white  
[TypeScript-url]: https://www.typescriptlang.org/
[Node.js-badge]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white  
[Node.js-url]: https://nodejs.org/
[MUI-badge]: https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white  
[MUI-url]: https://mui.com/
