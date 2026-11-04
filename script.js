/**
 * DHVANIT VANPARIYA - PORTFOLIO INTERACTION LOGIC
 * Senior Laravel Developer (Rajkot, India)
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // MOBILE NAVIGATION MENU
    // ----------------------------------------------------
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // Header scroll background change
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ----------------------------------------------------
    // SCROLL REVEAL ANIMATION (Intersection Observer)
    // ----------------------------------------------------
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animates only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // ----------------------------------------------------
    // TECH SKILLS PROGRESS BAR ANIMATION
    // ----------------------------------------------------
    const skillSection = document.getElementById('skills');
    const progressFills = document.querySelectorAll('.skill-progress-fill');
    
    if (skillSection && progressFills.length > 0) {
        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressFills.forEach(fill => {
                        const pct = fill.getAttribute('data-pct');
                        fill.style.width = pct + '%';
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        skillObserver.observe(skillSection);
    }

    // ----------------------------------------------------
    // STATS COUNT-UP ANIMATION
    // ----------------------------------------------------
    const statsSection = document.getElementById('about');
    const statNums = document.querySelectorAll('.metric-num');
    
    if (statsSection && statNums.length > 0) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statNums.forEach(numElement => {
                        const target = parseInt(numElement.getAttribute('data-target'), 10);
                        const duration = 1500; // ms
                        const startTime = performance.now();
                        const startValue = 0;
                        const isDecimal = numElement.getAttribute('data-decimal') === 'true';

                        function updateCount(currentTime) {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            
                            // Ease out quad
                            const easeProgress = progress * (2 - progress);
                            let currentValue = startValue + easeProgress * target;

                            if (isDecimal) {
                                numElement.textContent = currentValue.toFixed(1);
                            } else {
                                numElement.textContent = Math.floor(currentValue);
                            }

                            // Append suffix (e.g. "+" or "%") if provided
                            const suffix = numElement.getAttribute('data-suffix') || '';
                            numElement.textContent += suffix;

                            if (progress < 1) {
                                requestAnimationFrame(updateCount);
                            } else {
                                // Guarantee final value is accurate
                                numElement.textContent = target + suffix;
                            }
                        }
                        
                        requestAnimationFrame(updateCount);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });
        statsObserver.observe(statsSection);
    }

    // ----------------------------------------------------
    // PORTFOLIO PROJECTS MODAL & FILTERING DATA
    // ----------------------------------------------------
    const projectsData = {
        sanskruti: {
            title: "Sanskruti Hostel Management ERP",
            category: "Laravel / ZKTeco Biometrics / MySQL",
            desc: "A custom all-in-one ERP system built to manage girls' hostel operations, featuring real-time biometric student check-in/out tracking, automated billing, and a custom food voting engine.",
            problem: "The girls' hostel had manual processes for tracking student leaves and attendance, which posed security concerns. Additionally, lack of meal planning resulted in heavy daily food waste and chaotic manual fee ledger collections.",
            solution: "Created a full-stack Laravel ERP system. Integrated ZKTeco biometric fingerprint readers using device APIs for automated check-ins and check-outs with automated SMS log notifications to parents. Engineered a student food voting system for meal planning, and automated billing with PDF receipts.",
            impact: [
                "Deployed a Student Food Voting System where students pre-vote for meals, allowing precise cooking plans that minimized daily kitchen food waste.",
                "Integrated physical ZKTeco biometric devices with API layers to register student leaves, attendance, and instant parent check-in alerts.",
                "Developed automated finance modules for fee ledger allocations, slip generation, and receipt history logs."
            ],
            tech: ["Laravel", "ZKTeco SDK / API", "MySQL", "Tailwind CSS", "SMS API Integrations", "PHPUnit"],
            linkText: "View Project Details",
            linkUrl: "#"
        },
        om: {
            title: "OM Manufactures E-Commerce",
            category: "Laravel / Vue.js / Bootstrap",
            desc: "A custom bulk-order e-commerce portal and product catalog built specifically for a mechanical parts manufacturer, featuring fast attribute-based filtering.",
            problem: "The client needed a digital store catalog to display thousands of mechanical parts categorized by thickness, thread, size, and material, supporting large wholesale bulk pricing and checkout flows.",
            solution: "Built a optimized catalog system utilizing Laravel Eloquent with indexes for high-speed multi-attribute filtering. Added custom cart pricing calculation models that apply discounts based on volume, and designed a robust admin dashboard for order tracking.",
            impact: [
                "Built an interactive, responsive catalog with complex product attributes, size, and category filter operations.",
                "Implemented secure wholesale cart checkouts and invoice generations for commercial clients.",
                "Engineered a custom admin control panel to manage product categories, bulk prices, and order fulfillments."
            ],
            tech: ["Laravel", "Vue.js", "MySQL", "Eloquent ORM", "Bootstrap", "Payment Gateway"],
            linkText: "View Project Details",
            linkUrl: "#"
        },
        erp: {
            title: "Enterprise ERP System Modules",
            category: "Laravel / REST APIs / Device Integrations",
            desc: "Designed and engineered enterprise-level ERP modules for major automobile brands and properties (including KIA Motors, Mahindra Motors, and Gujarat Motors). Modules cover inventory tracking, shift attendance, CMMS, and hotel bookings.",
            problem: "Corporate client operations had highly fragmented databases and struggled with real-time tracking of heavy assets, room bookings, and automated shift allocations.",
            solution: "Built unified modular packages integrated within a central Laravel framework. Designed robust REST APIs for device communications, configured Spatie RBAC structures, and implemented queued database imports via Laravel Horizon.",
            impact: [
                "Built and maintained core operations modules for live corporate client ERPs (Mahindra Motors, KIA Motors, Gujarat Motors, CMMS).",
                "Created highly secure, rate-limited REST APIs connecting hardware device logs with central cloud databases.",
                "Integrated Spatie permission controls, SMS authentication loops, and Redis queue workers to run data updates asynchronously."
            ],
            tech: ["Laravel", "REST APIs", "Spatie Permission", "Redis Caching", "PostgreSQL", "Docker"],
            linkText: "View Project Details",
            linkUrl: "#"
        }
    };

    // Filter projects
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active from all
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add to current
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    // Trigger tiny reflow for fade-in transition
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ----------------------------------------------------
    // POPUP MODAL DYNAMICS
    // ----------------------------------------------------
    const modalOverlay = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');

    function openModal(projectId) {
        const data = projectsData[projectId];
        if (!data || !modalOverlay) return;

        // Populate modal fields
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalCategory').textContent = data.category;
        document.getElementById('modalDesc').textContent = data.desc;
        document.getElementById('modalProblem').textContent = data.problem;
        document.getElementById('modalSolution').textContent = data.solution;

        // Populate impact list
        const impactContainer = document.getElementById('modalImpact');
        impactContainer.innerHTML = '';
        data.impact.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            impactContainer.appendChild(li);
        });

        // Populate tech tags
        const techContainer = document.getElementById('modalTech');
        techContainer.innerHTML = '';
        data.tech.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'modal-tech-tag';
            span.textContent = tag;
            techContainer.appendChild(span);
        });

        // Populate CTA link
        const modalLink = document.getElementById('modalLink');
        modalLink.href = data.linkUrl;
        modalLink.innerHTML = `${data.linkText} 
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>`;

        // Open modal
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    }

    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('open');
            document.body.style.overflow = ''; // Restore scroll
        }
    }

    // Attach click events to project cards
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            openModal(id);
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Handle escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // ----------------------------------------------------
    // CONTACT FORM INTERACTIVE VALIDATION
    // ----------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Clear previous feedback
            formFeedback.className = 'form-feedback';
            formFeedback.style.display = 'none';

            // Gather values
            const name = document.getElementById('formName').value.trim();
            const email = document.getElementById('formEmail').value.trim();
            const message = document.getElementById('formMessage').value.trim();
            
            // Check if radio option selected
            const selectedService = document.querySelector('input[name="project_type"]:checked');

            // Basic validation
            if (!name || !email || !message || !selectedService) {
                formFeedback.textContent = 'Please fill out all fields and select a project type.';
                formFeedback.classList.add('error');
                formFeedback.style.display = 'block';
                return;
            }

            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formFeedback.textContent = 'Please enter a valid email address.';
                formFeedback.classList.add('error');
                formFeedback.style.display = 'block';
                return;
            }

            // Self-Hosted PHP Email Submission Integration
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending Message...';

            const formData = {
                name: name,
                email: email,
                project_type: selectedService.value,
                message: message
            };

            fetch('send-email.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(async (response) => {
                const json = await response.json();
                if (response.ok && json.success) {
                    formFeedback.textContent = `Thank you, ${name}! Your inquiry has been sent successfully. I will get back to you soon.`;
                    formFeedback.className = 'form-feedback success';
                    formFeedback.style.display = 'block';
                    contactForm.reset();
                } else {
                    formFeedback.textContent = json.message || 'Something went wrong. Please try again.';
                    formFeedback.className = 'form-feedback error';
                    formFeedback.style.display = 'block';
                }
            })
            .catch(error => {
                console.error(error);
                formFeedback.textContent = 'Server connection issue. Please check if your server is running and try again.';
                formFeedback.className = 'form-feedback error';
                formFeedback.style.display = 'block';
            })
            .then(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });
        });
    }
});
