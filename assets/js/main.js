document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Management (Dark/Light)
    const initTheme = () => {
        const savedTheme = localStorage.getItem('sonic_theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    };

    const toggleTheme = (e) => {
        if (e) e.preventDefault();
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('sonic_theme', newTheme);
        updateThemeIcon(newTheme);
    };

    const updateThemeIcon = (theme) => {
        const btns = document.querySelectorAll('#theme-toggle, .theme-btn, #theme-toggle-mobile');
        btns.forEach(btn => {
            const isDark = theme === 'dark';
            const icon = isDark ? 'sun' : 'moon';
            const label = isDark ? 'Light Mode' : 'Dark Mode';

            if (btn.classList.contains('nav-item') || btn.classList.contains('admin-nav-item') || btn.classList.contains('mobile-only') || btn.id === 'theme-toggle-mobile') {
                btn.innerHTML = `<i data-lucide="${icon}"></i> ${label}`;
            } else {
                btn.innerHTML = `<i data-lucide="${icon}"></i>`;
            }
        });
        if (window.lucide) lucide.createIcons();
    };

    // 2. RTL Management
    const toggleRTL = (e) => {
        if (e) e.preventDefault();
        const currentDir = document.body.getAttribute('dir') || 'ltr';
        const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
        document.body.setAttribute('dir', newDir);
        localStorage.setItem('sonic_rtl', newDir);
        if (window.showToast) showToast(`Switched to ${newDir.toUpperCase()} mode`, 'info');
    };

    const initRTL = () => {
        const savedRTL = localStorage.getItem('sonic_rtl');
        if (savedRTL) document.body.setAttribute('dir', savedRTL);
    };

    // 3. Mobile Menu Logic
    const mobileToggle = document.getElementById('mobile-menu-toggle') ||
        document.getElementById('hamburger-menu') ||
        document.getElementById('sidebar-toggle');

    const closeMenu = document.getElementById('close-menu-btn') || document.querySelector('.close-menu');
    const navMenu = document.getElementById('nav-menu') || document.querySelector('.nav-links');
    const sidebar = document.querySelector('.sidebar') || document.getElementById('dashboard-sidebar');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            }
            if (sidebar) {
                sidebar.classList.toggle('active');
            }
            if (window.lucide) lucide.createIcons();
        });
    }

    if (closeMenu && navMenu) {
        closeMenu.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.style.overflow = ''; // Restore scroll
        });
    }

    // Close menu on link click
    if (navMenu) {
        const links = navMenu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 4. Toast Notification System
    const showToast = (message, type = 'success') => {
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        const icons = { success: 'check-circle', error: 'alert-circle', info: 'info', warning: 'alert-triangle' };
        toast.innerHTML = `<i data-lucide="${icons[type] || 'info'}"></i><span>${message}</span>`;
        toastContainer.appendChild(toast);
        if (window.lucide) lucide.createIcons();
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };
    window.showToast = showToast;

    // 5. Global Event Listeners
    const themeBtns = document.querySelectorAll('#theme-toggle, .theme-btn, #theme-toggle-mobile');
    themeBtns.forEach(btn => btn.addEventListener('click', toggleTheme));

    const rtlBtns = document.querySelectorAll('#rtl-toggle, .rtl-btn, #rtl-toggle-mobile');
    rtlBtns.forEach(btn => btn.addEventListener('click', toggleRTL));

    // Dashboard navigation helper
    const initDashboardNav = () => {
        const navItems = document.querySelectorAll('.nav-item[data-section], .admin-nav-item[data-section]');
        const sections = document.querySelectorAll('.dashboard-section');
        if (navItems.length > 0) {
            navItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    const targetId = item.getAttribute('data-section');
                    if (targetId) {
                        e.preventDefault();
                        navItems.forEach(i => i.classList.remove('active'));
                        item.classList.add('active');
                        sections.forEach(s => s.style.display = 'none');
                        const targetSection = document.getElementById(`${targetId}-section`);
                        if (targetSection) targetSection.style.display = 'block';
                        if (window.lucide) lucide.createIcons();
                    }
                });
            });
        }
    };

    // Logout Helper
    const logoutBtns = document.querySelectorAll('#logout-btn');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Logging out...', 'info');
            setTimeout(() => { window.location.href = '../index.html'; }, 800);
        });
    });

    // 6. Mobile Dropdown Accordion Logic
    const initMobileDropdowns = () => {
        const dropdowns = document.querySelectorAll('.nav-dropdown');
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.nav-dropdown-toggle');
            if (toggle) {
                toggle.addEventListener('click', (e) => {
                    if (window.innerWidth <= 1100) {
                        e.preventDefault();
                        e.stopPropagation();
                        dropdown.classList.toggle('active');
                        
                        // Close other dropdowns at the same level
                        dropdowns.forEach(other => {
                            if (other !== dropdown) other.classList.remove('active');
                        });
                    }
                });
            }
        });
    };

    // 7. Global Action Triggers (Demos)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn');
        if (!btn) return;

        const text = btn.innerText.toLowerCase();
        if (text.includes('donate')) {
            e.preventDefault();
            showToast('Thank you for your support!', 'success');
        } else if (text.includes('notify')) {
            e.preventDefault();
            showToast('Notification set for this show!', 'info');
        } else if (text.includes('signup') || text.includes('join')) {
            // Only toast if it's a dummy trigger (no href or #)
            if (btn.getAttribute('href') === '#' || !btn.getAttribute('href')) {
                e.preventDefault();
                showToast('Processing your request...', 'info');
            }
        }
    });

    // Handle all forms
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn ? btn.innerHTML : '';

            if (btn) {
                btn.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i> Sending...';
                if (window.lucide) lucide.createIcons();
            }

            setTimeout(() => {
                showToast('Message sent successfully!', 'success');
                form.reset();
                if (btn) btn.innerHTML = originalText;
                if (window.lucide) lucide.createIcons();
            }, 1500);
        });
    });

    // Initialize
    initTheme();
    initRTL();
    initDashboardNav();
    initMobileDropdowns();
    if (window.lucide) lucide.createIcons();
});
