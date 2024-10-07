# Pets Tips & Stories (PETS) - Server

Pets Tips & Stories (PETS) is a social media platform specifically designed for pet lovers to share tips, stories, and care guides for their pets. This project includes premium membership features, where users can post premium content that is only accessible to other premium members. Users can interact with each other by following/unfollowing, upvoting/downvoting content, and commenting on posts. Admins have the ability to manage users and content publication. The server-side of the project is built with Node.js and other backend technologies.

## Features

### User Features

- **Post Tips & Stories**: Users can create and share tips or stories about their pets.
- **Profile Management**: Users can update their profile information, including profile pictures and bios.
- **Follow/Unfollow**: Users can follow or unfollow other authors.
- **Voting System**: Users can upvote or downvote tips and stories, promoting helpful content.
- **Commenting**: Users can write comments on posts, enabling interaction and discussions.
- **Premium Membership**:
  - **Exclusive Content**: Premium members can create and upload premium tips and stories, accessible only to other premium members.
  - **Nutrition PDF Generation**: Users can generate personalized nutrition PDFs for their pets based on health and dietary needs.

### Admin Features

- **User Management**: Admins can update user roles (such as promoting a user to premium membership) and delete users from the platform.
- **Content Management**: Admins can publish and unpublish user-generated content to maintain the quality of posts.

## Project Structure

### Backend Architecture

- **Node.js**: The core server runtime for handling requests and managing the API.
- **Express.js**: A web framework used to create a RESTful API to handle user interactions and database operations.
- **MongoDB**: A NoSQL database used for storing user data, posts, and other application data.
- **Mongoose**: An ODM (Object Data Modeling) library used for MongoDB to manage data models and schema validations.
- **JSON Web Token (JWT)**: For handling user authentication and secure routes for premium content.

### API Endpoints

#### User Endpoints

- **POST /register** - Register a new user.
- **POST /login** - User login with JWT authentication.
- **PUT /profile** - Update user profile.
- **POST /follow/:userId** - Follow another user.
- **POST /unfollow/:userId** - Unfollow another user.
- **GET /premium-content** - Access premium content (requires premium membership).

#### Post Endpoints

- **POST /posts** - Create a new post (tips or stories).
- **GET /posts** - Retrieve all posts (paginated).
- **PUT /posts/:postId** - Edit an existing post.
- **DELETE /posts/:postId** - Delete a post.
- **POST /posts/:postId/upvote** - Upvote a post.
- **POST /posts/:postId/downvote** - Downvote a post.
- **POST /posts/:postId/comment** - Comment on a post.

#### Admin Endpoints

- **PUT /admin/users/:userId/role** - Update a user’s role (e.g., make them a premium member).
- **DELETE /admin/users/:userId** - Delete a user.
- **PUT /admin/posts/:postId/publish** - Publish a post.
- **PUT /admin/posts/:postId/unpublish** - Unpublish a post.

### Database Models

#### User Model

```js
{
  username: String,
  email: String,
  password: String,
  role: { type: String, enum: ['user', 'premium', 'admin'], default: 'user' },
  profile: {
    bio: String,
    avatar: String
  },
  followers: [ObjectId],
  following: [ObjectId],
  premiumMember: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Post Model

```js
{
  author: ObjectId,  // Refers to the user who created the post
  title: String,
  content: String,
  isPremium: Boolean,  // Indicates if the content is premium-only
  votes: {
    upvotes: Number,
    downvotes: Number
  },
  comments: [{
    user: ObjectId,
    text: String,
    createdAt: Date
  }],
  published: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- Express.js
- MongoDB (Ensure you have a running MongoDB instance)

### Steps to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/pets-tips-stories-server.git
   cd pets-tips-stories-server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables. Create a `.env` file and add:

   ```bash
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-secret-key>
   ```

4. Run the server:
   ```bash
   npm start
   ```

The server will be running at `http://localhost:5000`.

## Future Enhancements

- **Notifications**: Users will receive notifications for new followers, upvotes, and comments.
- **Search and Filters**: Improve content discovery with advanced search and filtering options.
- **Push Notifications**: Real-time push notifications for new premium content or posts from followed users.
- **Payment Gateway Integration**: Automate the process for premium membership payment.

## License

This project is licensed under the MIT License.
