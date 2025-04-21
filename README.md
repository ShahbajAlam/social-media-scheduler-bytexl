### 1. **App.jsx**

The `App` component is the central hub of the application. It manages the main application state and orchestrates the logic for adding, deleting, and displaying posts.

-   **State Management**:
    
    -   `scheduledPosts`: Holds an array of posts that the user has scheduled. These posts are fetched from `localStorage` when the app loads, ensuring data persists across sessions.
        
    -   `toast`: This state is used to control the visibility of the toast notification, which provides feedback to the user (such as success messages for post scheduling or deletion).
        
-   **Effect Hooks**:
    
    -   **Loading posts**: When the app loads, it checks if there are any posts saved in `localStorage`. If so, it sets the state for `scheduledPosts`.
        
    -   **Saving posts**: Whenever the `scheduledPosts` state changes, it is immediately saved to `localStorage` to ensure persistence.
        
-   **Functions**:
    
    -   **addPost**: Adds a new post to the `scheduledPosts` state and shows a success message via the `toast` state.
        
    -   **deletePost**: Deletes a post by its ID, then shows a success message.
        
-   **Rendering**:
    
    -   Conditionally renders the `PostForm` and `PostList` components.
        
    -   The `Toast` component is displayed based on the `toast` state, providing feedback about the user's actions.
        

----------

### 2. **PostForm.jsx**

The `PostForm` component provides the user interface for creating and scheduling posts. It includes form fields for entering post details, such as the title, content, selected platforms, and scheduling date and time.

-   **State Management**:
    
    -   `title`, `content`: Track the text inputs for the title and content of the post.
        
    -   `date`, `time`: Store the date and time when the post is scheduled to go live.
        
    -   `platforms`: Tracks the selected platforms for the post (such as Twitter, Facebook, etc.). It allows the user to select multiple platforms.
        
    -   `imageData`: Stores the image data (if an image is uploaded), which is then displayed in the post.
        
-   **Default Date and Time**:
    
    -   The `getDefaultDate` function sets the default date to today’s date.
        
    -   The `getDefaultTime` function sets the default time to one hour from the current time, rounded to the nearest 15-minute increment.
        
-   **Event Handlers**:
    
    -   **togglePlatform**: Adds or removes a platform from the `platforms` state when the user clicks on a platform button.
        
    -   **handleSubmit**: Handles form submission, validating the inputs (title, content, platforms, date, time). It also checks that the post is not scheduled in the past.
        
-   **Image Upload**: The `ImageUpload` component is used to handle image file selection and preview before submission. It’s responsible for rendering the image and saving its data to `imageData`.
    

----------

### 3. **ImageUpload.jsx**

The `ImageUpload` component handles the logic for uploading and previewing images before the user submits the post.

-   **File Handling**: When the user selects an image file, the component reads the file using `FileReader` and converts it into a data URL, which is stored in the `imageData` state.
    
-   **Validation**: Only image files are accepted, and an error message is shown if the user tries to upload a non-image file.
    
-   **Image Preview**: If a valid image file is selected, a preview of the image is displayed before the user submits the form. This allows users to see what the image will look like in the post.
    

----------

### 4. **PostList.jsx**

The `PostList` component displays all the posts that have been scheduled. It renders each post's title, content, scheduled date and time, associated platforms, and image (if available). It also provides the ability to delete posts.

-   **Sorting Posts**: The posts are sorted by the `scheduledFor` date in ascending order to ensure they appear in the correct order.
    
-   **Delete Post**: Each post has a delete button that calls the `onDelete` function passed as a prop from the `App` component. This allows posts to be removed from the list.
    
-   **Platform Tags**: Each post displays the platforms it is scheduled for, along with icons representing each platform (Twitter, Facebook, Instagram, LinkedIn). These are displayed as tags below the post content.
    
-   **Empty Posts Message**: If there are no scheduled posts, the component displays a message prompting the user to create their first post.
    

----------

### 5. **Toast.jsx**

The `Toast` component provides a temporary notification that appears on the screen when certain actions are performed, such as scheduling or deleting a post. The notification auto-dismisses after a short period (3 seconds).

-   **Auto Dismissal**: Using the `useEffect` hook, the toast automatically disappears after 3 seconds, providing a smooth user experience.
    
-   **Dynamic Styling**: The `type` prop allows for different toast styles (e.g., "success" or "error"). This controls the appearance of the toast, such as its background color, and can be easily extended to support additional types (e.g., "warning").
    
-   **Callbacks**: The `onClose` prop is called after the toast disappears, allowing the parent component (in this case, `App`) to clear the toast state.
    

----------

### How These Components Work Together

-   **App.jsx**: The main orchestrator that manages the state of the entire application, including posts and notifications.
    
    -   It uses the `PostForm` component to allow users to create new posts and the `PostList` component to display existing posts.
        
    -   It passes the `addPost` and `deletePost` functions as props to the respective child components to handle adding and deleting posts.
        
-   **PostForm.jsx**: Provides the form for the user to input post details (title, content, platforms, date, time, and image). On form submission, it validates the input, creates a post object, and passes it back to the parent component using the `onSubmit` function.
    
-   **ImageUpload.jsx**: Handles the uploading and previewing of images. It is integrated into the `PostForm` to allow users to add images to their posts before submission.
    
-   **PostList.jsx**: Displays all the scheduled posts, showing their content, selected platforms, and scheduled time. It also allows posts to be deleted from the list.
    
-   **Toast.jsx**: Provides feedback to the user when an action (e.g., post creation or deletion) is successful. The toast is automatically dismissed after a short duration.
    

----------

### Summary

The **Social Media Scheduler** app uses React components to provide a clean, modular structure that handles user input, image uploads, platform selection, and post scheduling. State is managed centrally in the `App` component, while each smaller component handles specific tasks like form submission, image preview, post listing, and feedback notifications. By breaking down the app into reusable components, the code becomes easier to maintain and extend while ensuring that the user experience is intuitive and smooth.