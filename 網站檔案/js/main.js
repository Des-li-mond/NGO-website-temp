// 主要JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    // 移動端選單切換
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            // 切換漢堡選單圖標
            const hamburger = this.querySelector('.hamburger');
            if (hamburger) {
                hamburger.classList.toggle('active');
            }
        });
    }
    
    // 下拉選單無障礙功能
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            // 鍵盤導航
            toggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleDropdown(dropdown);
                }
            });
            
            // 點擊切換
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                toggleDropdown(dropdown);
            });
            
            // 點擊外部關閉
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    closeDropdown(dropdown);
                }
            });
        }
    });
    
    // 統計數字動畫
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumber(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    // 平滑滾動
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // 圖片懶加載
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // 表單驗證
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });
    
    // 無障礙功能增強
    enhanceAccessibility();
});

// 下拉選單切換函數
function toggleDropdown(dropdown) {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
        closeDropdown(dropdown);
    } else {
        openDropdown(dropdown);
    }
}

function openDropdown(dropdown) {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    // 關閉其他下拉選單
    document.querySelectorAll('.dropdown').forEach(other => {
        if (other !== dropdown) {
            closeDropdown(other);
        }
    });
    
    toggle.setAttribute('aria-expanded', 'true');
    menu.style.opacity = '1';
    menu.style.visibility = 'visible';
    menu.style.transform = 'translateY(0)';
    
    // 聚焦到第一個選單項目
    const firstItem = menu.querySelector('a');
    if (firstItem) {
        firstItem.focus();
    }
}

function closeDropdown(dropdown) {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    toggle.setAttribute('aria-expanded', 'false');
    menu.style.opacity = '0';
    menu.style.visibility = 'hidden';
    menu.style.transform = 'translateY(-10px)';
}

// 數字動畫函數
function animateNumber(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2秒
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// 表單驗證函數
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, '此欄位為必填項目');
            isValid = false;
        } else {
            clearFieldError(field);
        }
        
        // 電子郵件驗證
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                showFieldError(field, '請輸入有效的電子郵件地址');
                isValid = false;
            }
        }
        
        // 電話號碼驗證
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(field.value)) {
                showFieldError(field, '請輸入有效的電話號碼');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.setAttribute('role', 'alert');
    
    field.parentNode.appendChild(errorDiv);
    field.setAttribute('aria-invalid', 'true');
    field.classList.add('error');
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.removeAttribute('aria-invalid');
    field.classList.remove('error');
}

// 無障礙功能增強
function enhanceAccessibility() {
    // 添加跳過連結功能
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
            }
        });
    }
    
    // 添加鍵盤導航支持
    document.addEventListener('keydown', function(e) {
        // ESC鍵關閉下拉選單
        if (e.key === 'Escape') {
            const openDropdowns = document.querySelectorAll('.dropdown-toggle[aria-expanded="true"]');
            openDropdowns.forEach(toggle => {
                const dropdown = toggle.closest('.dropdown');
                if (dropdown) {
                    closeDropdown(dropdown);
                }
            });
            
            // 關閉移動端選單
            const mobileMenu = document.querySelector('.nav-menu.active');
            if (mobileMenu) {
                const toggle = document.querySelector('.mobile-menu-toggle');
                if (toggle) {
                    toggle.click();
                }
            }
        }
    });
    
    // 添加焦點管理
    const focusableElements = document.querySelectorAll(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });
    
    // 添加ARIA標籤
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (!button.textContent.trim()) {
            button.setAttribute('aria-label', '按鈕');
        }
    });
    
    // 添加圖片alt屬性檢查
    const images = document.querySelectorAll('img:not([alt])');
    images.forEach(img => {
        if (!img.hasAttribute('alt')) {
            img.setAttribute('alt', '圖片');
        }
    });
}

// 工具函數
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 導出函數供其他模組使用
window.WTSDHC = {
    toggleDropdown,
    openDropdown,
    closeDropdown,
    animateNumber,
    validateForm,
    showFieldError,
    clearFieldError,
    debounce,
    throttle
};
