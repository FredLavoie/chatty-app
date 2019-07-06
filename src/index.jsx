// Application entrypoint.

// Load up the application styles
require('../styles/application.scss');

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

// Append html rendered from app.jsx to document tag in 'index.html'
ReactDOM.render(<App />, document.getElementById('react-root'));
