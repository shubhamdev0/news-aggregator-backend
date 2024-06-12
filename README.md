# News Aggregator Backend

This is the backend service for the News Aggregator application. It fetches news articles from various sources and provides endpoints for the frontend to access articles, user preferences, and other functionalities.

## Technologies Used

- Node.js
- Express.js
- MongoDB (via Mongoose)
- Axios

## Setup and Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/news-aggregator-backend.git
    cd news-aggregator-backend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add the following environment variables:
        ```
        PORT=8000
        MONGO_URI=mongodb://localhost:27017/news-aggregator
        NEWS_API_KEY=your_newsapi_key
        GUARDIAN_API_KEY=your_guardian_key
        NYT_API_KEY=your_nyt_key
        ```

4. Start the server:
    ```bash
    npm start
    ```

The backend server should now be running on `http://localhost:8000`.

## API Endpoints

### Articles

- `GET /api/articles`: Fetches all articles.
- `GET /api/articles/:id`: Fetches a specific article by ID.
- `GET /api/search`: Searches articles based on query parameters.
- `GET /api/options`: Fetches available options for sources, categories, and authors.

### User Preferences

- `GET /api/users/:id/preferences`: Fetches user preferences.
- `PUT /api/users/:id/preferences`: Updates user preferences.



## Contribution

Feel free to open issues or submit pull requests for any improvements or bug fixes.
