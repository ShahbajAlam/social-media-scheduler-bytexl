// Elements
const postForm = document.getElementById("postForm");
const postsList = document.getElementById("postsList");
const emptyPostsMessage = document.getElementById("emptyPostsMessage");
const imageUpload = document.getElementById("imageUpload");
const imagePreview = document.getElementById("imagePreview");
const platformButtons = document.querySelectorAll(".platform-button");
const scheduleDateInput = document.getElementById("scheduleDate");
const scheduleTimeInput = document.getElementById("scheduleTime");

// State
let scheduledPosts = [];
let selectedPlatforms = [];
let imageData = null;

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

// Function to delete post
function deletePost(postId) {
    // Remove post from array
    scheduledPosts = scheduledPosts.filter((post) => post.id !== postId);

    // Update storage and UI
    savePostsToStorage();
    updatePostsList();

    // Show success message
    showToast("Post deleted successfully!");
}

// Function to set default date and time
function setDefaultDateAndTime() {
    const today = new Date();
    const formattedDate = formatDateForInput(today);
    scheduleDateInput.value = formattedDate;

    const nextHour = new Date(today);
    nextHour.setHours(nextHour.getHours() + 1);
    nextHour.setMinutes(Math.ceil(nextHour.getMinutes() / 15) * 15);
    const formattedTime = formatTimeForInput(nextHour);
    scheduleTimeInput.value = formattedTime;
}

// Function to format date for input
function formatDateForInput(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
}

// Function to format time for input
function formatTimeForInput(date) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();

    // Validate form
    if (!validateForm()) return;

    // Get form values
    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").value;
    const dateValue = scheduleDateInput.value;
    const timeValue = scheduleTimeInput.value;

    const [year, month, day] = dateValue.split("-").map(Number);
    const [hours, minutes] = timeValue.split(":").map(Number);
    const scheduledFor = new Date(year, month - 1, day, hours, minutes);

    // Create new post
    const newPost = {
        id: generateId(),
        title: title,
        content: content,
        image: imageData,
        platforms: [...selectedPlatforms],
        scheduledFor: scheduledFor,
        created: new Date(),
    };

    // Add post to list
    scheduledPosts.push(newPost);
    savePostsToStorage();
    updatePostsList();

    // Reset form
    postForm.reset();
    imagePreview.classList.remove("has-image");
    imagePreview.style.backgroundImage = "none";
    imageData = null;
    selectedPlatforms = [];
    platformButtons.forEach((btn) => btn.classList.remove("selected"));
    setDefaultDateAndTime();

    // Show success message
    showToast("Post scheduled successfully!");
}

// Function to validate form
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

    if (selectedPlatforms.length === 0) {
        showToast("Please select at least one platform", "error");
        return false;
    }

    if (!dateValue || !timeValue) {
        showToast("Please select both date and time", "error");
        return false;
    }

    const [year, month, day] = dateValue.split("-").map(Number);
    const [hours, minutes] = timeValue.split(":").map(Number);
    const scheduledDate = new Date(year, month - 1, day, hours, minutes);

    if (scheduledDate.getTime() < Date.now()) {
        showToast("Cannot schedule posts in the past", "error");
        return false;
    }

    return true;
}

// Handle image upload
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
        showToast("Please select an image file", "error");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        imageData = event.target.result;
        imagePreview.style.backgroundImage = `url(${imageData})`;
        imagePreview.classList.add("has-image");
    };
    reader.readAsDataURL(file);
}

// Toggle platform selection
function togglePlatform(button) {
    const platformId = button.dataset.platform;

    if (selectedPlatforms.includes(platformId)) {
        selectedPlatforms = selectedPlatforms.filter((id) => id !== platformId);
        button.classList.remove("selected");
    } else {
        selectedPlatforms.push(platformId);
        button.classList.add("selected");
    }
}

// Function to update the posts list
function updatePostsList() {
    if (scheduledPosts.length === 0) {
        renderEmptyPostsMessage();
        return;
    }

    emptyPostsMessage.style.display = "none";

    postsList.innerHTML = "";
    scheduledPosts
        .sort((a, b) => new Date(a.scheduledFor) - new Date(b.scheduledFor))
        .forEach((post) => {
            renderPost(post);
        });
}

// Function to render a single post
function renderPost(post) {
    const postElement = createPostElement(post);
    postsList.appendChild(postElement);
}

// Function to render the empty posts message
function renderEmptyPostsMessage() {
    postsList.innerHTML = "";
    emptyPostsMessage.style.display = "block";
}

// Create a post element
function createPostElement(post) {
    const postCard = document.createElement("div");
    postCard.className = "post-card";
    postCard.dataset.postId = post.id;

    // Assemble post card
    postCard.innerHTML = `
        <div class="post-header">
            <div class="post-title">${post.title}</div>
            <div class="post-date">${formatDate(post.scheduledFor)}</div>
        </div>
        <div class="post-content">${post.content}</div>
        ${
            post.image
                ? `<div class="post-image" style="background-image: url(${post.image})"></div>`
                : ""
        }
        <div class="post-platforms">
            ${post.platforms
                .map(
                    (platform) => `
                <span class="platform-tag">
                    <i class="${getPlatformIcon(
                        platform
                    )}"></i> ${getPlatformName(platform)}
                </span>
            `
                )
                .join("")}
        </div>
        <div class="post-actions">
            <button class="delete-post-button" title="Delete post">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `;

    return postCard;
}

// Function to show toast notifications
function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}

// Save posts to storage
function savePostsToStorage() {
    localStorage.setItem("scheduledPosts", JSON.stringify(scheduledPosts));
}

// Load posts from storage
function loadPostsFromStorage() {
    const savedPosts = localStorage.getItem("scheduledPosts");
    if (savedPosts) {
        try {
            const parsedPosts = JSON.parse(savedPosts);
            scheduledPosts = parsedPosts.map((post) => ({
                ...post,
                scheduledFor: new Date(post.scheduledFor),
                created: new Date(post.created),
            }));
        } catch (error) {
            console.error("Error loading saved posts:", error);
        }
    }
}

// Helper functions for platform icons and names
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

function generateId() {
    return Math.random().toString(36).substring(2, 9);
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
