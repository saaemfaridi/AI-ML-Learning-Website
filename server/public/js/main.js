/**
 * AI/ML Learning Hub - Enhanced JavaScript
 * Modern, interactive, and user-friendly features
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

/**
 * Initialize all application features
 */
const initializeApp = () => {
    // Core functionality
    // Theme toggle removed
    initializeNavigation();
    initializeAnimations();
    
    // Page-specific functionality
    if (isCurrentPage('resources')) {
        initializeResourcesPage();
    } else if (isCurrentPage('roadmap')) {
        initializeRoadmapPage();
    } else if (isCurrentPage('videos')) {
        initializeVideosPage();
    }
    
    // Common features
    initializeCodeHighlighting();
    initializeTooltips();
    initializeCopyButtons();
    // Progress tracking removed
    initializeLazyLoading();
    fixImageErrors();
    initializeBackToTop();
};

/**
 * Theme management
 */
const initializeTheme = () => {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeToggle(currentTheme === 'dark');

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeToggle(!isDark);
    });

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeToggle(e.matches);
        }
    });
};

const updateThemeToggle = (isDark) => {
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    
    if (sunIcon && moonIcon) {
        if (isDark) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }
};

/**
 * Navigation enhancements
 */
const initializeNavigation = () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    // Highlight current page
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            (currentPath === '/' && link.getAttribute('href') === '/')) {
            link.classList.add('active');
        }
    });

    // Navbar scroll behavior
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', () => {
            navbarCollapse.classList.toggle('show');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navbarCollapse.classList.contains('show') && 
                !navbarCollapse.contains(e.target) && 
                !navbarToggler.contains(e.target)) {
                navbarCollapse.classList.remove('show');
            }
        });
    }
};

/**
 * Animation initialization
 */
const initializeAnimations = () => {
    // Initialize AOS animations if library is loaded
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
    // Add fade-in animation to elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(element => {
        element.classList.add('animate-fade-in');
    });
    
    // Animate elements when they enter the viewport
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll:not(.animated)');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animated');
                element.classList.add('animate-fade-in');
            }
        });
    };
    
    window.addEventListener('scroll', debounce(animateOnScroll, 50));
    animateOnScroll(); // Run once on page load
};

/**
 * Resources page functionality
 */
const initializeResourcesPage = () => {
    const filterButtons = document.querySelectorAll('.resource-filter-btn');
    if (!filterButtons.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter resources
            const resources = document.querySelectorAll('.resource-card');
            resources.forEach(resource => {
                const resourceCategory = resource.getAttribute('data-category');
                if (category === 'all' || resourceCategory === category) {
                    resource.style.display = 'block';
                } else {
                    resource.style.display = 'none';
                }
            });
        });
    });
};

/**
 * Roadmap page functionality
 */
const initializeRoadmapPage = () => {
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    if (!roadmapItems.length) return;
    
    // Add animation classes to roadmap items
    roadmapItems.forEach((item, index) => {
        item.classList.add('animate-on-scroll');
        item.style.transitionDelay = `${index * 0.1}s`;
    });
};

/**
 * Videos page functionality
 */
const initializeVideosPage = () => {
    const videoCards = document.querySelectorAll('.video-card');
    if (!videoCards.length) return;
    
    videoCards.forEach(card => {
        const playButton = card.querySelector('.video-play-btn');
        const thumbnail = card.querySelector('.video-thumbnail');
        const videoContainer = card.querySelector('.video-container');
        const videoUrl = card.getAttribute('data-video-url');
        
        if (playButton && thumbnail && videoContainer && videoUrl) {
            playButton.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Create iframe
                const iframe = document.createElement('iframe');
                iframe.src = videoUrl.replace('watch?v=', 'embed/') + '?autoplay=1';
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                iframe.allowFullscreen = true;
                
                // Replace thumbnail with iframe
                videoContainer.innerHTML = '';
                videoContainer.appendChild(iframe);
            });
        }
    });
    
    // Initialize video filtering
    const filterButtons = document.querySelectorAll('.video-filter-btn');
    if (filterButtons.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter videos
                const videos = document.querySelectorAll('.video-card');
                videos.forEach(video => {
                    const videoCategory = video.getAttribute('data-category');
                    if (category === 'all' || videoCategory === category) {
                        video.style.display = 'block';
                    } else {
                        video.style.display = 'none';
                    }
                });
            });
        });
    }
};

/**
 * Code highlighting
 */
const initializeCodeHighlighting = () => {
    // Check if Prism.js is loaded
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
};

/**
 * Initialize tooltips
 */
const initializeTooltips = () => {
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    if (!tooltipTriggers.length) return;
    
    tooltipTriggers.forEach(trigger => {
        const tooltipText = trigger.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        
        trigger.appendChild(tooltip);
        
        trigger.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
        });
        
        trigger.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
        });
    });
};

/**
 * Initialize copy buttons for code blocks
 */
const initializeCopyButtons = () => {
    const codeBlocks = document.querySelectorAll('pre code');
    if (!codeBlocks.length) return;
    
    codeBlocks.forEach(codeBlock => {
        const container = codeBlock.parentElement;
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.setAttribute('aria-label', 'Copy code');
        
        container.style.position = 'relative';
        container.appendChild(copyButton);
        
        copyButton.addEventListener('click', () => {
            const code = codeBlock.textContent;
            navigator.clipboard.writeText(code).then(() => {
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy code: ', err);
                copyButton.innerHTML = '<i class="fas fa-times"></i>';
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            });
        });
    });
};

/**
 * Check if current page matches the given page name
 */
const isCurrentPage = (page) => {
    const path = window.location.pathname;
    return (path === `/${page}` || (path === '/' && page === 'home'));
};

/**
 * Debounce function to limit function calls
 */
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Initialize lazy loading for images
 */
const initializeLazyLoading = () => {
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyImages = document.querySelectorAll('img:not([loading])');
        
        if (!lazyImages.length) return;
        
        const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                observer.unobserve(img);
            }
        });
    });
    
        lazyImages.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                img.setAttribute('data-src', src);
                img.setAttribute('src', 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E');
                lazyLoadObserver.observe(img);
            }
        });
    }
};

/**
 * Fix broken images
 */
const fixImageErrors = () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', () => {
            img.classList.add('error');
            img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="%23ccc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Crect x="3" y="3" width="18" height="18" rx="2" ry="2"%3E%3C/rect%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"%3E%3C/circle%3E%3Cpolyline points="21 15 16 10 5 21"%3E%3C/polyline%3E%3C/svg%3E';
            img.alt = 'Image failed to load';
        });
    });
};

/**
 * Initialize back to top button
 */
const initializeBackToTop = () => {
    const backToTopButton = document.getElementById('backToTop');
    if (!backToTopButton) return;
    
    const toggleBackToTopButton = () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    };
    
    window.addEventListener('scroll', debounce(toggleBackToTopButton, 100));
    toggleBackToTopButton(); // Initialize on page load
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}; 