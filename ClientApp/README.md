# EstoqueApp

StockApp is a fullstack inventory management application built with ReactJS and ASP.NET Core Web API.

## Technical Overview

- **Frontend:** ReactJS
- **Backend:** ASP.NET Core Web API (C#)
- **Database:** SQLite (via Entity Framework Core)
- **Styling:** Manual dark mode using custom CSS
- **Localization:** React Context API + JSON
- **Language Persistence:** localStorage

## Features

- Product registration: name, price (with decimal precision), category, quantity
- Inline editing per item
- Instant deletion with live update
- Responsive UI for desktop/mobile
- Validation:
  - All fields required
  - Positive quantity
  - Price must be greater than zero
- Multilingual UI:
  - Portuguese
  - English
  - Russian
  - Georgian
  - Armenian

## Project Goal

To deliver a simple and intuitive stock control system, fully functional and ready for international environments.  
Perfect for internal use or as a fullstack portfolio showcase.

## Live Demo

Soon on Vercel...

## License

MIT
