# 📚 Blog API Reference

This document outlines all available endpoints for the Blog Post API, including parameters for CRUD, pagination, filtering, and sorting.

## Base URL

`http://localhost:3000/api/posts`

---

## 1. Create Post

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/posts` | Creates a new blog post. |

**Request Body (JSON):**

```json
{
  "title": "My First Blog Post",
  "body": "This is the content of the post.",
  "author": "Alice Doe",
  "tags": ["typescript", "mongodb", "tutorial"]
}
Response (201 Created): Returns the created post object.

2. Retrieve Posts (List, Pagination, Filtering, Sorting)
Method	Endpoint	Description
GET	/api/posts	Retrieves a list of posts with advanced query options.


Query Parameters
Parameter	Type	Default	Description
limit	number	10	The maximum number of posts to return per page.
skip	number	0	The number of posts to skip (for offset-based pagination).
tag	string	N/A	Filter posts that include the specified tag.
author	string	N/A	Filter posts by author name (case-insensitive).
startDate	date (ISO 8601)	N/A	Filter posts created on or after this date.
sortBy	string	newest	Sort order: newest (descending createdAt) or oldest (ascending createdAt).


Example Request: GET /api/posts?limit=5&skip=10&tag=tutorial&sortBy=oldest

Response (200 OK):

JSON

{
  "total": 50,
  "limit": 5,
  "skip": 10,
  "data": [
    { /* Post object 11 */ },
    { /* Post object 12 */ },
    // ... 
  ]
}
3. Retrieve Single Post
Method	Endpoint	Description
GET	/api/posts/:id	Retrieves a single post by its MongoDB ID.


Example Request: GET /api/posts/60f7e4b9c1d3c80015f8a4e3

4. Update Post
Method	Endpoint	Description
PUT	/api/posts/:id	Updates an existing blog post by ID.


Request Body (JSON): Supports partial updates (e.g., only update title).

JSON

{
  "title": "Revised Title",
  "body": "Updated content."
}
5. Delete Post
Method	Endpoint	Description
DELETE	/api/posts/:id	Deletes a post by ID.


Response (204 No Content): Successful deletion.