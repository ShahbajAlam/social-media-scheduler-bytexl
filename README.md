## **Explanation of Important Files**

Let us now understand about the important files -

-   **index.html (Public Entry Point)**

    ```
    <body>
      <div id="root"></div>
      <script  type="module"  src="/src/main.jsx"></script>
     </body>
    ```

    **Key Points**:

    -   The React app is injected inside the \<div id="root">.
    -   \<script type="module" src="/src/main.jsx"> loads the React application.

<hr/>
  
-   **src/main.jsx (Mounts React to the DOM)**
    
    ```
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App'; 	
    
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
	      <App />
	  </React.StrictMode>
	);
    ```
    
    **Key Points**:
    
    -   ReactDOM.createRoot() creates the root of the React application.
    -   App.jsx is imported and rendered inside
        
<hr/>

-   **src/App.jsx (Main Component)**  
    This is the main component where we build our UI.

    ```
    function App() {
       return <h1>Hello, React!</h1>
    }
    export  default App;
    ```

    **Key Points**:

    -   Defines a functional component App().
    -   Exports it so that main.jsx can use it.

  <hr/>

-   **package.json (Project Configuration & Dependencies)**  
    This file manages project dependencies and scripts.

    ```
    {
     "dependencies": {
    	 "react": "^18.2.0",
    	 "react-dom": "^18.2.0"
    	},
     "devDependencies": {
    	 "vite": "^4.0.0"
    	},
     "scripts": {
    	 "dev": "vite",
    	 "build": "vite build",
    	 "preview": "vite preview"
    	}
    }
    ```

    **Key Points**:

    -   "dependencies": Lists required packages (React, ReactDOM).
    -   "devDependencies": Contains development tools (Vite).
    -   "scripts":
        -   "dev": Starts the development server (npm run dev).
        -   "build": Bundles the project for production.
        -   "preview": Previews the built app.

  <hr/>

-   **vite.config.js (Vite Configuration)**  
    It configures how Vite handles the build process.

    ```
    import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';

    export  default defineConfig(
        { plugins: [react()] }
    );
    ```

    **Key Points**:

    -   Imports Vite’s React plugin.
    -   Exports the configuration to enable React support.

  <hr/>

-   **.gitignore (Ignoring Unwanted Files)**  
    This file tells Git which files to ignore for version control.

    ```
    node_modules/
    dist/
    .env
    ```

    **Key Points**:

    -   node_modules/ is ignored to prevent unnecessary uploads.
    -   dist/ is ignored since it's a build output.
    -   .env is ignored as it contains API keys, Database credentials, and other secrets.
