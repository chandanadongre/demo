const blogPosts = [
    {
        title: "Lorem ipsum 1",
        description: "Praesent non ligula in eros ultrices.",
        image: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    },
    {
        title: "Lorem ipsum 2",
        description: "Praesent non ligula in eros ultrices.Praesent non ligula in eros ultrices.",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    },
    {
        title: "Lorem ipsum 3",
        description: "BPraesent non ligula in eros ultrices. applications.",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    },
    {
        title: "Lorem ipsum 4",
        description: "Praesent non ligula in eros ultrices.",
        image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    }
];

const blogGrid = document.getElementById('blog-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
let isLoading = false;

function createBlogCard(post, index) {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.style.transitionDelay = `${index * 150}ms`;
    
    card.innerHTML = `
        <div class="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <div class="overflow-hidden">
                <img src="${post.image}" alt="${post.title}" 
                     class="w-full h-60 object-cover transform hover:scale-105 transition-transform duration-700">
            </div>
            <div class="p-6">
                <h3 class="font-bold text-green-800 text-2xl mb-2">${post.title}</h3>
                <p class="text-gray-600 mb-4">${post.description}</p>
                <a href="#" class="inline-flex items-center text-green-700 font-semibold hover:underline group">
                    Read More 
                    <svg xmlns="http://www.w3.org/2000/svg" 
                         class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" 
                         viewBox="0 0 24 24" 
                         fill="none" 
                         stroke="currentColor" 
                         stroke-width="2" 
                         stroke-linecap="round" 
                         stroke-linejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                    </svg>
                </a>
            </div>
        </div>
    `;
    
    return card;
}

function showLoadingState() {
    loadMoreBtn.disabled = true;
    loadMoreBtn.classList.add('opacity-50', 'cursor-not-allowed');
    const span = loadMoreBtn.querySelector('span');
    span.innerHTML = `
        <div class="flex items-center">
            <div class="shimmer w-24 h-4 bg-white/20 rounded"></div>
        </div>
    `;
}

function hideLoadingState() {
    loadMoreBtn.disabled = false;
    loadMoreBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    loadMoreBtn.querySelector('span').textContent = 'Load More Blogs';
}

function loadPosts() {
    if (isLoading) return;
    isLoading = true;
    
    showLoadingState();
    
    const startIndex = blogGrid.children.length;
    const endIndex = Math.min(startIndex + 2, blogPosts.length);
    
    setTimeout(() => {
        const fragment = document.createDocumentFragment();
        
        for (let i = startIndex; i < endIndex; i++) {
            const card = createBlogCard(blogPosts[i], i - startIndex);
            fragment.appendChild(card);
        }
        
        blogGrid.appendChild(fragment);
        
        // Trigger reflow for animation
        blogGrid.offsetHeight;
        
        // Reveal new cards with staggered animation
        const newCards = Array.from(blogGrid.children).slice(startIndex);
        requestAnimationFrame(() => {
            newCards.forEach(card => card.classList.add('visible'));
        });
        
        hideLoadingState();
        isLoading = false;
        
        if (blogGrid.children.length >= blogPosts.length) {
            loadMoreBtn.style.display = 'none';
        }
    }, 800);
}

// Initial load
loadPosts();

// Event listener for load more button
loadMoreBtn.addEventListener('click', loadPosts);

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

// Observe initial cards
document.querySelectorAll('.blog-card').forEach(card => {
    observer.observe(card);
});