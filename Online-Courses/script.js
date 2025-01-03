// Course Data
const courses = [
    {
        id: 1,
        name: "Complete Web Development Bootcamp",
        duration: "12 weeks",
        price: 499.99,
        level: "Beginner to Advanced",
        technologies: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Python Programming Masterclass",
        duration: "10 weeks",
        price: 399.99,
        level: "Intermediate",
        technologies: ["Python", "Django", "Flask", "Data Science"],
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Mobile App Development",
        duration: "14 weeks",
        price: 599.99,
        level: "Advanced",
        technologies: ["React Native", "Flutter", "iOS", "Android"],
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
];

// Roadmap Data
const roadmaps = {
    frontend: [
        { name: "HTML & CSS Basics", duration: "2 weeks" },
        { name: "JavaScript Fundamentals", duration: "3 weeks" },
        { name: "React.js", duration: "4 weeks" },
        { name: "Advanced Frontend Concepts", duration: "3 weeks" }
    ],
    backend: [
        { name: "Python Basics", duration: "2 weeks" },
        { name: "Database Design", duration: "2 weeks" },
        { name: "API Development", duration: "3 weeks" },
        { name: "Server Architecture", duration: "3 weeks" }
    ],
    fullstack: [
        { name: "Web Fundamentals", duration: "3 weeks" },
        { name: "Frontend Development", duration: "4 weeks" },
        { name: "Backend Development", duration: "4 weeks" },
        { name: "Full Stack Integration", duration: "3 weeks" }
    ]
};

// DOM Elements
const courseGrid = document.querySelector('.course-grid');
const roadmapNodes = {
    frontend: document.querySelector('#frontend-track .roadmap-nodes'),
    backend: document.querySelector('#backend-track .roadmap-nodes'),
    fullstack: document.querySelector('#fullstack-track .roadmap-nodes')
};

// Three.js Scene Setup
let scene, camera, renderer, cube;

function init3DScene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    const container = document.getElementById('hero-3d-animation');
    renderer.setSize(500, 500);
    container.appendChild(renderer.domElement);

    // Create animated cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const materials = [
        new THREE.MeshBasicMaterial({ color: 0x2563eb }),
        new THREE.MeshBasicMaterial({ color: 0x3b82f6 }),
        new THREE.MeshBasicMaterial({ color: 0x60a5fa }),
        new THREE.MeshBasicMaterial({ color: 0x93c5fd }),
        new THREE.MeshBasicMaterial({ color: 0x2563eb }),
        new THREE.MeshBasicMaterial({ color: 0x3b82f6 })
    ];
    
    cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    camera.position.z = 5;

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

// Initialize Courses
function initializeCourses() {
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <div class="course-image">
                <img src="${course.image}" alt="${course.name}">
                <div class="course-overlay"></div>
            </div>
            <div class="course-content">
                <h3>${course.name}</h3>
                <p class="duration"><i class="fas fa-clock"></i> ${course.duration}</p>
                <p class="level"><i class="fas fa-layer-group"></i> ${course.level}</p>
                <div class="technologies">
                    ${course.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <p class="price">$${course.price.toFixed(2)}</p>
                <button class="enroll-btn" onclick="enrollCourse(${course.id})">
                    <span>Enroll Now</span>
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
        courseGrid.appendChild(courseCard);
    });
}

// Initialize Roadmaps
function initializeRoadmaps() {
    Object.entries(roadmaps).forEach(([track, nodes]) => {
        const roadmapTrack = roadmapNodes[track];
        nodes.forEach((node, index) => {
            const nodeElement = document.createElement('div');
            nodeElement.className = 'roadmap-node';
            nodeElement.innerHTML = `
                <div class="node-content">
                    <span class="node-number">${index + 1}</span>
                    <h4>${node.name}</h4>
                    <p>${node.duration}</p>
                </div>
                ${index < nodes.length - 1 ? '<div class="node-connector"></div>' : ''}
            `;
            roadmapTrack.appendChild(nodeElement);
        });
    });
}

// Course Enrollment
function enrollCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        const courseCard = document.querySelector(`[onclick="enrollCourse(${courseId})"]`).parentElement.parentElement;
        courseCard.style.transform = 'scale(1.05) rotateX(10deg)';
        setTimeout(() => {
            courseCard.style.transform = 'scale(1) rotateX(0)';
            alert(`Successfully enrolled in ${course.name}!`);
        }, 300);
    }
}

// 3D Card Effect
function init3DCardEffect() {
    const cards = document.querySelectorAll('.course-card, .roadmap-track, .price-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Scroll Animation
function initScrollAnimation() {
    const elements = document.querySelectorAll('.course-card, .roadmap-track, .price-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
}

// Auth Modal Handling
function showAuthModal(type) {
    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    modal.innerHTML = `
        <div class="auth-content">
            <button class="close-btn" onclick="closeAuthModal(this)">×</button>
            <h2>${type === 'login' ? 'Login' : 'Sign Up'}</h2>
            <form class="auth-form" onsubmit="handleAuth(event, '${type}')">
                ${type === 'signup' ? `
                    <div class="form-group">
                        <input type="text" required placeholder="Full Name">
                        <i class="fas fa-user"></i>
                    </div>
                ` : ''}
                <div class="form-group">
                    <input type="email" required placeholder="Email Address">
                    <i class="fas fa-envelope"></i>
                </div>
                <div class="form-group">
                    <input type="password" required placeholder="Password">
                    <i class="fas fa-lock"></i>
                </div>
                ${type === 'signup' ? `
                    <div class="form-group">
                        <input type="password" required placeholder="Confirm Password">
                        <i class="fas fa-lock"></i>
                    </div>
                ` : ''}
                <button type="submit" class="auth-submit">
                    ${type === 'login' ? 'Login' : 'Sign Up'}
                </button>
            </form>
            <p class="auth-switch">
                ${type === 'login' 
                    ? 'Don\'t have an account? <a href="#" onclick="showAuthModal(\'signup\')">Sign Up</a>' 
                    : 'Already have an account? <a href="#" onclick="showAuthModal(\'login\')">Login</a>'}
            </p>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeAuthModal(btn) {
    const modal = btn.closest('.auth-modal');
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
}

function handleAuth(event, type) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Here you would typically handle the authentication
    console.log(`Handling ${type}:`, Object.fromEntries(formData));
    
    // Show success message
    alert(`${type === 'login' ? 'Login' : 'Sign up'} successful!`);
    closeAuthModal(form);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init3DScene();
    initializeCourses();
    initializeRoadmaps();
    init3DCardEffect();
    initScrollAnimation();
    
    // Add event listeners for auth buttons
    document.querySelector('.login-btn').addEventListener('click', () => showAuthModal('login'));
    document.querySelector('.signup-btn').addEventListener('click', () => showAuthModal('signup'));
    
    // Responsive design handler
    window.addEventListener('resize', () => {
        if (renderer) {
            const container = document.getElementById('hero-3d-animation');
            const width = Math.min(500, container.clientWidth);
            const height = width;
            
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }
    });
});
