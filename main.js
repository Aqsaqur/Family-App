// FamilyConnect - Main JavaScript File
// Handles all interactive functionality for the family social media app

// Sample data for demonstration
const samplePosts = [
    {
        id: 1,
        author: "اسمي",
        avatar: "https://kimi-web-img.moonshot.cn/img/images.squarespace-cdn.com/f843dd68f7a3896749d740d3ba86b751ffbd1c41",
        content: "Had such a wonderful time at grandma's birthday party today! The kids loved the cake and we got some great family photos. Can't wait to share them with everyone! 🎂👨‍👩‍👧‍👦",
        image: "https://kimi-web-img.moonshot.cn/img/cbx-prod.b-cdn.net/5f9a173b3b3a8768dfbe2f6237e789eb116a822a.jpg",
        timestamp: "2 hours ago",
        likes: 8,
        comments: 3,
        type: "photos",
        liked: false
    },
    {
        id: 2,
        author: "Mike Chen",
        avatar: "https://kimi-web-img.moonshot.cn/img/images.squarespace-cdn.com/794ba1d9a952dd738ce740ab7ee77b33bff8458d.jpg",
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
        avatar: "https://kimi-web-img.moonshot.cn/img/images.squarespace-cdn.com/dc0339388f194f09df80fc60eb5a22b47571b58f",
        content: "Little Tommy took his first steps today! We're so proud of him. These moments are what make family so special. 👶💕",
        timestamp: "6 hours ago",
        likes: 15,
        comments: 7,
        type: "updates",
        liked: false
    },
    {
        id: 4,
        author: "David Martinez",
        avatar: "https://kimi-web-img.moonshot.cn/img/davidquisenberry.com/d02d792af7069ad7e063335c5d5e59a3d9c41d67.jpg",
        content: "Beautiful sunset family walk in the park. Sometimes it's the simple moments that mean the most. 🌅👨‍👩‍👧‍👦",
        image: "https://kimi-web-img.moonshot.cn/img/www.mthoodrentals.com/cf440351bb646599f3442a89861bdaf62930b1f8.jpg",
        timestamp: "1 day ago",
        likes: 10,
        comments: 2,
        type: "photos",
        liked: true
    },
    {
        id: 5,
        author: "Lisa Thompson",
        avatar: "https://kimi-web-img.moonshot.cn/img/www.katielister.co.uk/e3c94f5a4a28a3d5a8a744d2af01b9d6ef0bd28f.jpg",
        content: "Cooking dinner together as a family tonight. Grandma's special recipe is being passed down to the next generation! 👩‍🍳👨‍🍳",
        image: "https://kimi-web-img.moonshot.cn/img/easypeasie.com/26db45a69414e680df0edd318113c2683cdff057.jpg",
        timestamp: "1 day ago",
        likes: 9,
        comments: 4,
        type: "photos",
        liked: false
    }
];

const familyMembers = [
    { name: "Sarah Johnson", role: "Admin", avatar: "https://kimi-web-img.moonshot.cn/img/images.squarespace-cdn.com/f843dd68f7a3896749d740d3ba86b751ffbd1c41", online: true },
    { name: "Mike Chen", role: "Member", avatar: "https://kimi-web-img.moonshot.cn/img/images.squarespace-cdn.com/794ba1d9a952dd738ce740ab7ee77b33bff8458d.jpg", online: true },
    { name: "Emma Wilson", role: "Member", avatar: "https://kimi-web-img.moonshot.cn/img/images.squarespace-cdn.com/dc0339388f194f09df80fc60eb5a22b47571b58f", online: false },
    { name: "David Martinez", role: "Member", avatar: "https://kimi-web-img.moonshot.cn/img/davidquisenberry.com/d02d792af7069ad7e063335c5d5e59a3d9c41d67.jpg", online: true },
    { name: "Lisa Thompson", role: "Member", avatar: "https://kimi-web-img.moonshot.cn/img/www.katielister.co.uk/e3c94f5a4a28a3d5a8a744d2af01b9d6ef0bd28f.jpg", online: false }
];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadPosts();
    setupEventListeners();
    initializeAnimations();
    
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
            filterBtns.forEach(b => b.classList.remove('active', 'bg-warm-sage', 'text-white'));
            filterBtns.forEach(b => b.classList.add('bg-white', 'text-deep-charcoal'));
            this.classList.add('active', 'bg-warm-sage', 'text-white');
            this.classList.remove('bg-white', 'text-deep-charcoal');
        });
    });

    // Floating action button
    const floatingBtn = document.getElementById('floatingBtn');
    if (floatingBtn) {
        floatingBtn.addEventListener('click', function() {
            document.getElementById('postInput').focus();
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
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

    // Animate posts in
    anime({
        targets: '.post-card',
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 600,
        easing: 'easeOutQuart'
    });
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
    
    likeBtn.addEventListener('click', function() {
        toggleLike(post.id, this);
    });
    
    commentBtn.addEventListener('click', function() {
        showNotification('Comments feature coming soon!');
    });
    
    shareBtn.addEventListener('click', function() {
        showNotification('Post shared with family!');
    });
    
    return postDiv;
}

function createPost() {
    const postInput = document.getElementById('postInput');
    const content = postInput.value.trim();
    
    if (!content) return;
    
    const newPost = {
        id: Date.now(),
        author: "You",
        avatar: "https://kimi-web-img.moonshot.cn/img/images.squarespace-cdn.com/69f2c0bea4aa2f462d788f299dfc2a1568dd4298.jpg",
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
    document.getElementById('postBtn').disabled = true;
    
    // Re-render posts
    renderPosts(posts);
    
    // Show success message
    showNotification('Post shared with your family!');
    
    // Animate new post
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
    
    likeCount.textContent = post.likes;
    
    if (post.liked) {
        button.classList.add('liked', 'text-error-coral');
        heartIcon.setAttribute('fill', 'currentColor');
        
        // Animate like
        anime({
            targets: button,
            scale: [1, 1.3, 1],
            duration: 300,
            easing: 'easeOutQuart'
        });
    } else {
        button.classList.remove('liked', 'text-error-coral');
        heartIcon.setAttribute('fill', 'none');
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

function initializeAnimations() {
    // Animate hero stats on load
    anime({
        targets: '.hero-bg .grid > div',
        translateY: [30, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutQuart'
    });
    
    // Floating button pulse animation
    const floatingBtn = document.getElementById('floatingBtn');
    if (floatingBtn) {
        setInterval(() => {
            anime({
                targets: floatingBtn,
                scale: [1, 1.05, 1],
                duration: 2000,
                easing: 'easeInOutSine'
            });
        }, 5000);
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 left-4 right-4 bg-success-green text-white p-3 rounded-lg shadow-lg z-50 text-sm font-medium';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuart'
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            translateY: [0, -50],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInQuart',
            complete: () => {
                document.body.removeChild(notification);
            }
        });
    }, 3000);
}

// Export functions for use in other pages
window.FamilyConnect = {
    showNotification,
    initializeAnimations,
    familyMembers,
    samplePosts
};