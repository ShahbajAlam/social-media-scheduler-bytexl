## Key Changes

To successfully migrate the static HTML into a JSX-compatible React component, we made the following key adjustments:

1.  **Replaced HTML `class` with `className`**  
    JSX doesn't recognize the `class` attribute. All CSS classes must use `className`.
    
2.  **Self-closed tags**  
    Tags like `<input>`, `<img>`, and `<br>` were updated to use the correct self-closing format:  
     `<input />` instead of  `<input>`
    
3.  **Wrapped all content inside a single root element**  
    React components must return a single parent element. If needed, we used fragments:
    
	   `<> 
	    <div>...</div>
	    <div>...</div>
	   </>` 
    
4.  **Imported external CSS manually**  
    Since JSX doesn't carry over `<link>` tags from HTML, we explicitly imported our CSS file inside `main.jsx`:
    
    `import  './index.css';` 
    
5.  **Reorganized file structure for React project**  
    All logic was placed inside `App.jsx`, and we used `main.jsx` as the root render file.