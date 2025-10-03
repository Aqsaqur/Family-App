// FamilyConnect - Main JavaScript File
// Handles all interactive functionality for the family social media app

// Sample data for demonstration
const samplePosts = [
    {
        id: 1,
        author: "اسمي",
        avatar: "images/muslim-family-1.jpg",
        content: "Had such a wonderful time at grandma's birthday party today! The kids loved the cake and we got some great family photos. Can't wait to share them with everyone! 🎂👨‍👩‍👧‍👦",
        image: "images/muslim-family-3.jpg",
        timestamp: "2 hours ago",
        likes: 8,
        comments: 3,
        type: "photos",
        liked: false
    },
    {
        id: 2,
        author: "Mike Chen",
        avatar: "images/muslim-family-2.png",
        content: "Reminder: Family game night this Friday at 7 PM! Bring your favorite board games and snacks. Looking forward to seeing everyone! 🎲🎯",
        timestamp: "4 hours ago",
        likes: 12,
        comments: 5,
        type: "events",
        liked: true
    },
    {
        id: 3,
        author: "Emma Wilson",
        avatar: "images/muslim-family-4.jpg",
        content: "Little Tommy took his first steps today! We're so proud of him. These moments are what make family so special. 👶💕",
        timestamp: "6 hours ago",
        likes: 15,
        comments: 7,
        type: "updates",
        liked: false
    }
];

const familyMembers = [
    { name: "Sarah Johnson", role: "Admin", avatar: "images/muslim-family-1.jpg", online: true },
    { name: "Mike Chen", role: "Member", avatar: "images/muslim-family-2.png", online: true },
    { name: "Emma Wilson", role: "Member", avatar: "images/muslim-family-4.jpg", online: false },
    { name: "David Martinez", role: "Member", avatar: "images/muslim-family-5.jpeg", online: true },
    { name: "Lisa Thompson", role: "Member", avatar: "images/muslim-family-6.jpg", online: false }
];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadPosts();
    setupEventListeners();
    
    // Load saved posts from localStorage
    const savedPosts = localStorage.getItem('familyPosts');
    if (savedPosts) {
        const posts = JSON.parse(savedPosts);
        renderPosts(posts);
    } else {
        // Save sample posts to localStorage
        localStorage.setItem('familyPosts', JSON.stringify(samplePosts));
        renderPosts(samplePosts);
    }
}

function setupEventListeners() {
    // Post creation
    const postBtn = document.getElementById('postBtn');
    const postInput = document.getElementById('postInput');
    
    if (postBtn && postInput) {
        postBtn.addEventListener('click', createPost);
        postInput.addEventListener('input', function() {
            postBtn.disabled = !this.value.trim();
        });
    }

    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            filterPosts(filter);
            
            // Update active state
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-warm-sage', 'text-white');
                b.classList.add('bg-white', 'text-deep-charcoal');
            });
            this.classList.add('active', 'bg-warm-sage', 'text-white');
            this.classList.remove('bg-white', 'text-deep-charcoal');
        });
    });

    // Floating action button
    const floatingBtn = document.getElementById('floatingBtn');
    if (floatingBtn) {
        floatingBtn.addEventListener('click', function() {
            const postInput = document.getElementById('postInput');
            if (postInput) {
                postInput.focus();
            }
        });
    }

    // Photo and privacy buttons (placeholder functionality)
    const photoBtn = document.getElementById('photoBtn');
    const privacyBtn = document.getElementById('privacyBtn');
    
    if (photoBtn) {
        photoBtn.addEventListener('click', function() {
            showNotification('Photo upload coming soon!');
        });
    }
    
    if (privacyBtn) {
        privacyBtn.addEventListener('click', function() {
            showNotification('Privacy settings: Family Only');
        });
    }
}

function loadPosts() {
    const savedPosts = localStorage.getItem('familyPosts');
    if (savedPosts) {
        const posts = JSON.parse(savedPosts);
        renderPosts(posts);
    } else {
        renderPosts(samplePosts);
    }
}

function renderPosts(posts) {
    const feed = document.getElementById('postsFeed');
    if (!feed) return;

    feed.innerHTML = '';
    
    posts.forEach((post, index) => {
        const postElement = createPostElement(post, index);
        feed.appendChild(postElement);
    });

    // Animate posts in if anime.js is available
    if (typeof anime !== 'undefined') {
        anime({
            targets: '.post-card',
            translateY: [50, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            duration: 600,
            easing: 'easeOutQuart'
        });
    }
}

function createPostElement(post, index) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post-card bg-white rounded-xl p-4 card-shadow';
    
    const hasImage = post.image ? 'mb-4' : '';
    
    postDiv.innerHTML = `
        <div class="flex items-start space-x-3 mb-3">
            <img src="${post.avatar}" alt="${post.author}" class="w-10 h-10 rounded-full object-cover">
            <div class="flex-1">
                <div class="flex items-center space-x-2">
                    <h3 class="font-semibold text-sm text-deep-charcoal">${post.author}</h3>
                    <span class="text-xs text-gray-500">${post.timestamp}</span>
                </div>
                <p class="text-sm text-gray-600 mt-1 leading-relaxed">${post.content}</p>
            </div>
        </div>
        
        ${post.image ? `
            <div class="${hasImage}">
                <img src="${post.image}" alt="Post image" class="w-full h-48 object-cover rounded-lg">
            </div>
        ` : ''}
        
        <div class="flex items-center justify-between pt-3 border-t border-gray-100">
            <div class="flex items-center space-x-6">
                <button class="like-btn flex items-center space-x-2 text-gray-500 hover:text-error-coral transition-colors like-animation ${post.liked ? 'liked text-error-coral' : ''}" data-post-id="${post.id}">
                    <svg class="w-5 h-5" fill="${post.liked ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    <span class="text-sm font-medium">${post.likes}</span>
                </button>
                
                <button class="comment-btn flex items-center space-x-2 text-gray-500 hover:text-warm-sage transition-colors" data-post-id="${post.id}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    <span class="text-sm font-medium">${post.comments}</span>
                </button>
                
                <button class="share-btn flex items-center space-x-2 text-gray-500 hover:text-muted-lavender transition-colors" data-post-id="${post.id}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                    </svg>
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners for post interactions
    const likeBtn = postDiv.querySelector('.like-btn');
    const commentBtn = postDiv.querySelector('.comment-btn');
    const shareBtn = postDiv.querySelector('.share-btn');
    
    if (likeBtn) {
        likeBtn.addEventListener('click', function() {
            toggleLike(post.id, this);
        });
    }
    
    if (commentBtn) {
        commentBtn.addEventListener('click', function() {
            showNotification('Comments feature coming soon!');
        });
    }
    
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            showNotification('Post shared with family!');
        });
    }
    
    return postDiv;
}

function createPost() {
    const postInput = document.getElementById('postInput');
    if (!postInput) return;
    
    const content = postInput.value.trim();
    
    if (!content) return;
    
    const newPost = {
        id: Date.now(),
        author: "You",
        avatar: "images/muslim-family-4.jpeg",
        content: content,
        timestamp: "Just now",
        likes: 0,
        comments: 0,
        type: "updates",
        liked: false
    };
    
    // Get existing posts and add new one
    const savedPosts = localStorage.getItem('familyPosts');
    let posts = savedPosts ? JSON.parse(savedPosts) : samplePosts;
    posts.unshift(newPost);
    
    // Save to localStorage
    localStorage.setItem('familyPosts', JSON.stringify(posts));
    
    // Clear input
    postInput.value = '';
    const postBtn = document.getElementById('postBtn');
    if (postBtn) {
        postBtn.disabled = true;
    }
    
    // Re-render posts
    renderPosts(posts);
    
    // Show success message
    showNotification('Post shared with your family!');
    
    // Animate new post if anime.js is available
    if (typeof anime !== 'undefined') {
        const firstPost = document.querySelector('.post-card');
        if (firstPost) {
            anime({
                targets: firstPost,
                scale: [0.9, 1],
                opacity: [0.7, 1],
                duration: 300,
                easing: 'easeOutQuart'
            });
        }
    }
}

function toggleLike(postId, button) {
    const savedPosts = localStorage.getItem('familyPosts');
    let posts = savedPosts ? JSON.parse(savedPosts) : samplePosts;
    
    const postIndex = posts.findIndex(p => p.id == postId);
    if (postIndex === -1) return;
    
    const post = posts[postIndex];
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    
    // Update UI
    const likeCount = button.querySelector('span');
    const heartIcon = button.querySelector('svg');
    
    if (likeCount) {
        likeCount.textContent = post.likes;
    }
    
    if (post.liked) {
        button.classList.add('liked', 'text-error-coral');
        if (heartIcon) {
            heartIcon.setAttribute('fill', 'currentColor');
        }
        
        // Animate like if anime.js is available
        if (typeof anime !== 'undefined') {
            anime({
                targets: button,
                scale: [1, 1.3, 1],
                duration: 300,
                easing: 'easeOutQuart'
            });
        }
    } else {
        button.classList.remove('liked', 'text-error-coral');
        if (heartIcon) {
            heartIcon.setAttribute('fill', 'none');
        }
    }
    
    // Save to localStorage
    localStorage.setItem('familyPosts', JSON.stringify(posts));
}

function filterPosts(filter) {
    const savedPosts = localStorage.getItem('familyPosts');
    let posts = savedPosts ? JSON.parse(savedPosts) : samplePosts;
    
    let filteredPosts = posts;
    
    if (filter !== 'all') {
        filteredPosts = posts.filter(post => post.type === filter);
    }
    
    renderPosts(filteredPosts);
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 left-4 right-4 bg-warm-sage text-white p-4 rounded-lg shadow-lg z-50 transform translate-y-[-100px] transition-transform duration-300';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-y-[-100px]');
        notification.classList.add('translate-y-0');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-y-[-100px]');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Export functions for use in other pages
window.FamilyConnect = {
    showNotification,
    familyMembers,
    samplePosts
};