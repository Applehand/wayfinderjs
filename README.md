# wayfinderjs

## Description

`wayfinderjs` is a tool designed to assist with parsing, analyzing, and presenting website SEO audit data from Sitebulb, Google Search Console, and various other sources.

## Installation

### Prerequisites

- **Node.js**: Make sure you have Node.js installed. You can download it from [Node.js official website](https://nodejs.org/).
- **git**: You'll need git too! [Git it](https://git-scm.com/).

**NOTE**: Sitebulb ZIP export file is required to use the tool. Authenticating with a Google Search Console domain is preferred.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/wayfinderjs.git
   ```

2. Navigate to project directory:

   ```bash
   cd wayfinderjs
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Development
To start both the front and backend development servers concurrently, run:
```bash
npm run dev
```

#### Configuration

1. **Google OAuth2 and API Console Setup:**
   - To use Google Search Console data, you'll need to configure OAuth2 credentials in the [Google API Console](https://console.developers.google.com/). 
   - Create an OAuth 2.0 Client ID for a "Web application" and obtain your `CLIENT_ID` and `CLIENT_SECRET`.
   - Set the **Authorized Redirect URI** to `http://localhost:3000/oauth2callback` to handle the OAuth2 callback after user authentication.

2. **Environment Variables:**
   - Create a `.env` file in the root of your project and add the following environment variables to enable OAuth2 authentication:

     ```plaintext
     GOOGLE_CLIENT_ID=your-client-id-from-google-api-console
     GOOGLE_CLIENT_SECRET=your-client-secret-from-google-api-console
     GOOGLE_REDIRECT_URI=http://localhost:3000/oauth2callback
     ```
   - These variables are required for securely interacting with Google APIs.

3. **OAuth2 Flow:**
   - The application will redirect users to the Google sign-in page.
   - After authentication, users will be redirected back to `http://localhost:3000/oauth2callback` with an authorization code.
   - The server will exchange this code for an access token, which can be used to interact with Google APIs.


