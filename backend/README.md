# backend API documentation

## User Register Endpoint

Endpoint: `POST /user/register`

## Description

Registers a new user in the system. Accepts a JSON payload with the user's name, email and password. Basic validation is applied on the input fields.

## Request

- Content-Type: `application/json`
- Body (JSON):

```json
{
  "fullname": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john@example.com",
  "password": "secret123"
}
```

Field rules (as enforced by current route validators):

- `fullname.firstName` (string) — required, minimum 3 characters. Validation message: `first name must be at least 3 characters a long`.
- `fullname.lastName` (string) — optional, minimum 3 characters when provided.
- `email` (string) — required, must be a valid email. Validation message: `please enter a valid email`.
- `password` (string) — required, minimum 6 characters. Validation message: `password must be at least 6 characters a Long`.

> Note: The codebase contains some inconsistent naming (e.g., validators use `fullname.firstName` while the Mongoose schema stores `fullname.firstname` and the service expects `firstname`). Keep the `fullname.firstName` structure when sending requests to match the route validators.

## Response / Status Codes

- `201 Created` — User successfully created. Response typically includes the created user object (password omitted) or an auth token depending on controller behavior.
- `400 Bad Request` — Validation failed for one or more fields. Response commonly contains validation error details.
- `409 Conflict` — Email already exists (if the controller checks for duplicates before create).
- `500 Internal Server Error` — Unexpected server error.

## Example Success Response (illustrative)

```json
HTTP/1.1 201 Created
{
  "user": {
    "_id": "<id>",
    "fullname": { "firstName": "John", "lastName": "Doe" },
    "email": "john@example.com",
    "socketId": null
  },
  "message": "User created"
}
```

## Tips

- Send the JSON body exactly as shown (with `fullname.firstName`).
- Ensure `email` is unique; otherwise the request may fail with a conflict or DB error.
- If you change field names in code, update the validators, schema and service to remain consistent.

---
Created to document the `POST /user/register` endpoint.
