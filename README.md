## Problems Before React

Before React, developers primarily used Vanilla JavaScript or jQuery to build web applications. However, they faced major challenges:

### **Inefficient DOM Updates**

**The Problem:**
In Vanilla JavaScript and jQuery, updating the UI meant manually modifying the DOM, which was slow and inefficient. Each change required direct manipulation of elements like:

```
document.getElementById('title').innerText = 'New Title';
```

As applications grew, keeping track of these changes became complex and error-prone.

**How React Solves It:**
Uses a Virtual DOM, which tracks changes and updates only the necessary parts of the UI efficiently.

**Example**: Instead of manually changing elements, React re-renders components when the state changes.

 <hr/>

### **Poor State Management**

**The Problem:**
Vanilla JavaScript required global variables or manually passing data between functions. jQuery had no built-in way to manage component-specific state. Keeping the UI and state in sync was challenging.

**How React Solves It:**
Introduces stateful components using the useState hook. Allows a centralized state, making data management easier.

**Example:**

```
import { useState } from 'react';

function Counter() {
const [count, setCount] = useState(0);

return (
	<button  onClick={()  => setCount(count + 1)}>
		Clicked {count} times
	</button>
 );
}
```

In Vanilla JavaScript, managing this logic would require manual DOM updates, leading to messy and unmanageable code.
