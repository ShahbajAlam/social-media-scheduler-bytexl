// Elements
const postForm = document.getElementById("postForm");
const postsList = document.getElementById("postsList");
const emptyPostsMessage = document.getElementById("emptyPostsMessage");
const imageUpload = document.getElementById("imageUpload");
const imagePreview = document.getElementById("imagePreview");
const platformButtons = document.querySelectorAll(".platform-button");
const scheduleDateInput = document.getElementById("scheduleDate");
const scheduleTimeInput = document.getElementById("scheduleTime");

// State management with Proxy
let state = {
    scheduledPosts: [],
    selectedPlatforms: [],
    imageData: null,
};

const proxyState = new Proxy(state, {
    set(target, property, value) {
        target[property] = value;
        if (property === "scheduledPosts") {
            updatePostsList();
        }
        return true;
    },
});

// Initialize
loadPostsFromStorage();
updatePostsList();
setDefaultDateAndTime();

// Event Listeners
postForm.addEventListener("submit", handleFormSubmit);
imageUpload.addEventListener("change", handleImageUpload);

platformButtons.forEach((button) => {
    button.addEventListener("click", () => togglePlatform(button));
});

postsList.addEventListener("click", function (e) {
    if (
        e.target.classList.contains("delete-post-button") ||
        e.target.parentNode.classList.contains("delete-post-button")
    ) {
        const postCard = e.target.closest(".post-card");
        if (postCard) {
            const postId = postCard.dataset.postId;
            deletePost(postId);
        }
    }
});

function deletePost(postId) {
    // Remove post from array
    proxyState.scheduledPosts = proxyState.scheduledPosts.filter(
        (post) => post.id !== postId
    );

    // Update storage and UI
    savePostsToStorage();

    // Show success message
    showToast("Post deleted successfully!");
}

function setDefaultDateAndTime() {
    // Set default date to today
    const today = new Date();
    const formattedDate = formatDateForInput(today);
    scheduleDateInput.value = formattedDate;

    // Set default time to current time + 1 hour, rounded to nearest 15 minutes
    const nextHour = new Date(today);
    nextHour.setHours(nextHour.getHours() + 1);
    nextHour.setMinutes(Math.ceil(nextHour.getMinutes() / 15) * 15);
    const formattedTime = formatTimeForInput(nextHour);
    scheduleTimeInput.value = formattedTime;
}

function formatDateForInput(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function formatTimeForInput(date) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
}

function handleFormSubmit(e) {
    e.preventDefault();

    // Validate form
    if (!validateForm()) return;

    // Get form values
    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").value;
    const dateValue = scheduleDateInput.value;
    const timeValue = scheduleTimeInput.value;

    // Combine date and time values into a single Date object
    const [year, month, day] = dateValue.split("-").map(Number);
    const [hours, minutes] = timeValue.split(":").map(Number);
    const scheduledFor = new Date(year, month - 1, day, hours, minutes);

    // Create new post
    const newPost = {
        id: generateId(),
        title: title,
        content: content,
        image: proxyState.imageData,
        platforms: [...proxyState.selectedPlatforms],
        scheduledFor: scheduledFor,
        created: new Date(),
    };

    // Add post to list
    proxyState.scheduledPosts.push(newPost);
    savePostsToStorage();
    updatePostsList();

    // Reset form
    postForm.reset();
    imagePreview.classList.remove("has-image");
    imagePreview.style.backgroundImage = "none";
    proxyState.imageData = null;
    proxyState.selectedPlatforms = [];
    platformButtons.forEach((btn) => btn.classList.remove("selected"));
    setDefaultDateAndTime();

    // Show success message
    showToast("Post scheduled successfully!");
}

function validateForm() {
    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").value;
    const dateValue = scheduleDateInput.value;
    const timeValue = scheduleTimeInput.value;

    if (!title.trim()) {
        showToast("Please enter a title for your post", "error");
        return false;
    }

    if (!content.trim()) {
        showToast("Please enter content for your post", "error");
        return false;
    }

    if (proxyState.selectedPlatforms.length === 0) {
        showToast("Please select at least one platform", "error");
        return false;
    }

    if (!dateValue || !timeValue) {
        showToast("Please select both date and time", "error");
        return false;
    }

    // Check if the scheduled date is in the past
    const [year, month, day] = dateValue.split("-").map(Number);
    const [hours, minutes] = timeValue.split(":").map(Number);
    const scheduledDate = new Date(year, month - 1, day, hours, minutes);

    if (scheduledDate.getTime() < Date.now()) {
        showToast("Cannot schedule posts in the past", "error");
        return false;
    }

    return true;
}

function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
        showToast("Please select an image file", "error");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        proxyState.imageData = event.target.result;
        imagePreview.style.backgroundImage = `url(${proxyState.imageData})`;
        imagePreview.classList.add("has-image");
    };
    reader.readAsDataURL(file);
}

function togglePlatform(button) {
    const platformId = button.dataset.platform;

    if (proxyState.selectedPlatforms.includes(platformId)) {
        // Remove platform
        proxyState.selectedPlatforms = proxyState.selectedPlatforms.filter(
            (id) => id !== platformId
        );
    } else {
        // Add platform
        proxyState.selectedPlatforms.push(platformId);
    }

    // Optional: Update button state
    updatePlatformButtonState(button);
}

function updatePlatformButtonState(button) {
    const platformId = button.dataset.platform;
    if (proxyState.selectedPlatforms.includes(platformId)) {
        button.classList.add("selected");
    } else {
        button.classList.remove("selected");
    }
}

function updatePostsList() {
    // Sort posts by scheduled date
    proxyState.scheduledPosts.sort(
        (a, b) => new Date(a.scheduledFor) - new Date(b.scheduledFor)
    );

    // Check if there are posts
    if (proxyState.scheduledPosts.length === 0) {
        postsList.innerHTML = "";
        emptyPostsMessage.style.display = "block";
        return;
    }

    // Hide empty message and show posts
    emptyPostsMessage.style.display = "none";

    // Clear current list
    postsList.innerHTML = "";

    // Add posts to list
    proxyState.scheduledPosts.forEach((post) => {
        const postElement = createPostElement(post);
        postsList.appendChild(postElement);
    });
}

function createPostElement(post) {
    const postCard = document.createElement("div");
    postCard.className = "post-card";
    postCard.dataset.postId = post.id;

    // Create post header
    const header = document.createElement("div");
    header.className = "post-header";

    const title = document.createElement("div");
    title.className = "post-title";
    title.textContent = post.title;

    const date = document.createElement("div");
    date.className = "post-date";
    date.textContent = formatDate(post.scheduledFor);

    header.appendChild(title);
    header.appendChild(date);

    // Create post content
    const content = document.createElement("div");
    content.className = "post-content";
    content.textContent = post.content;

    // Create post image if available
    let image;
    if (post.image) {
        image = document.createElement("div");
        image.className = "post-image";
        image.style.backgroundImage = `url(${post.image})`;
    }

    // Create platform tags
    const platforms = document.createElement("div");
    platforms.className = "post-platforms";

    post.platforms.forEach((platform) => {
        const tag = document.createElement("span");
        tag.className = "platform-tag";

        const icon = document.createElement("i");
        icon.className = getPlatformIcon(platform);

        tag.appendChild(icon);
        tag.appendChild(
            document.createTextNode(` ${getPlatformName(platform)}`)
        );

        platforms.appendChild(tag);
    });

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-post-button";
    deleteButton.title = "Delete post";

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash-alt";
    deleteButton.appendChild(deleteIcon);

    // Create actions container
    const actionsContainer = document.createElement("div");
    actionsContainer.className = "post-actions";
    actionsContainer.appendChild(deleteButton);

    // Assemble post card
    postCard.appendChild(header);
    postCard.appendChild(content);
    if (image) postCard.appendChild(image);
    postCard.appendChild(platforms);
    postCard.appendChild(actionsContainer);

    return postCard;
}

function getPlatformIcon(platformId) {
    const icons = {
        twitter: "fab fa-twitter",
        facebook: "fab fa-facebook-f",
        instagram: "fab fa-instagram",
        linkedin: "fab fa-linkedin-in",
    };
    return icons[platformId] || "fas fa-globe";
}

function getPlatformName(platformId) {
    const names = {
        twitter: "Twitter/X",
        facebook: "Facebook",
        instagram: "Instagram",
        linkedin: "LinkedIn",
    };
    return names[platformId] || platformId;
}

function formatDate(date) {
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    return new Date(date).toLocaleDateString("en-US", options);
}

function generateId() {
    return `post-${Math.random().toString(36).substr(2, 9)}`;
}

function savePostsToStorage() {
    localStorage.setItem(
        "scheduledPosts",
        JSON.stringify(proxyState.scheduledPosts)
    );
}

function loadPostsFromStorage() {
    const savedPosts = localStorage.getItem("scheduledPosts");
    if (savedPosts) {
        proxyState.scheduledPosts = JSON.parse(savedPosts);
    }
}

function showToast(message, type = "success") {
    // Create toast message
    const toast = document.createElement("div");
    toast.className = `toast show toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Auto-hide toast
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
