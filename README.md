# Face Authentication React App

A React application that implements face recognition-based authentication using image comparison. Users can register their face during signup and then use their face to log in.

## Features

- Traditional email/password signup (optional)
- Face capture registration
- Face recognition login
- Local storage-based authentication
- Responsive design
- Camera access handling
- Real-time face matching

## Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd face-auth-react
```

2. Install dependencies:
```bash
npm install
```

3. Required dependencies:
```bash
npm install react-router-dom
```

## Project Structure

```
src/
├── components/
│   ├── Login.js
│   ├── SignUp.js
│   ├── FaceCapture.js
│   ├── FaceLogin.js
│   └── Home.js
├── App.js
└── App.css
```

## Component Description

- `Login.js`: Traditional login form with option for face login
- `SignUp.js`: Registration form with optional fields
- `FaceCapture.js`: Camera interface for face registration
- `FaceLogin.js`: Camera interface for face recognition login
- `Home.js`: Protected home page after successful authentication

## Usage

1. Start the development server:
```bash
npm start
```

2. Open http://localhost:3000 in your browser

3. Flow:
   - Click "Sign Up"
   - Fill optional details
   - Capture face for registration
   - Use face login for subsequent logins

## Implementation Details

### Face Recognition

The app uses a simple pixel comparison algorithm to match faces:
- Captures current frame from webcam
- Compares it with stored face data
- Uses threshold-based matching
- Real-time scanning until match found

### Storage

Uses localStorage to store:
- User data (email, name if provided)
- Face data as base64 image string
- Session information

## Security Considerations

This is a demonstration project and has several security limitations:

- Face comparison is basic and not suitable for production
- Stores sensitive data in localStorage
- No server-side validation
- No proper session management

For production use, consider:
- Using proper face recognition APIs
- Implementing server-side authentication
- Adding rate limiting
- Using secure storage methods
- Adding proper error handling

## Browser Support

Requires browsers with:
- WebRTC support for camera access
- localStorage support
- Canvas API support

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
