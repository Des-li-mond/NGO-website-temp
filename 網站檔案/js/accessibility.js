// 無障礙功能增強 (WCAG 2.x 標準)
class AccessibilityEnhancer {
    constructor() {
        this.fontSize = 100; // 基礎字體大小百分比
        this.highContrast = false;
        this.reducedMotion = false;
        this.init();
    }
    
    init() {
        this.createAccessibilityPanel();
        this.bindEvents();
        this.loadUserPreferences();
        this.applyAccessibilitySettings();
        this.enhanceKeyboardNavigation();
        this.addSkipLinks();
        this.enhanceFormAccessibility();
        this.addLiveRegions();
        this.enhanceImageAccessibility();
        this.addFocusIndicators();
    }
    
    createAccessibilityPanel() {
        const panel = document.createElement('div');
        panel.className = 'accessibility-panel';
        panel.setAttribute('role', 'region');
        panel.setAttribute('aria-label', '無障礙功能設定');
        
        panel.innerHTML = `
            <button class="accessibility-toggle" aria-expanded="false" aria-controls="accessibility-menu">
                <span class="sr-only">無障礙功能設定</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
            </button>
            <div id="accessibility-menu" class="accessibility-menu" hidden>
                <h3>無障礙功能設定</h3>
                <div class="accessibility-controls">
                    <div class="control-group">
                        <label for="font-size">字體大小</label>
                        <div class="font-size-controls">
                            <button id="decrease-font" aria-label="減小字體">A-</button>
                            <span id="font-size-display">100%</span>
                            <button id="increase-font" aria-label="增大字體">A+</button>
                        </div>
                    </div>
                    <div class="control-group">
                        <label for="high-contrast">
                            <input type="checkbox" id="high-contrast">
                            高對比度模式
                        </label>
                    </div>
                    <div class="control-group">
                        <label for="reduced-motion">
                            <input type="checkbox" id="reduced-motion">
                            減少動畫
                        </label>
                    </div>
                    <div class="control-group">
                        <button id="reset-accessibility">重置設定</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
    }
    
    bindEvents() {
        // 無障礙面板切換
        const toggle = document.querySelector('.accessibility-toggle');
        const menu = document.querySelector('#accessibility-menu');
        
        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                toggle.setAttribute('aria-expanded', !isExpanded);
                menu.hidden = isExpanded;
            });
        }
        
        // 字體大小控制
        const decreaseBtn = document.getElementById('decrease-font');
        const increaseBtn = document.getElementById('increase-font');
        
        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', () => this.changeFontSize(-10));
        }
        if (increaseBtn) {
            increaseBtn.addEventListener('click', () => this.changeFontSize(10));
        }
        
        // 高對比度模式
        const highContrastCheckbox = document.getElementById('high-contrast');
        if (highContrastCheckbox) {
            highContrastCheckbox.addEventListener('change', (e) => {
                this.highContrast = e.target.checked;
                this.applyAccessibilitySettings();
                this.saveUserPreferences();
            });
        }
        
        // 減少動畫
        const reducedMotionCheckbox = document.getElementById('reduced-motion');
        if (reducedMotionCheckbox) {
            reducedMotionCheckbox.addEventListener('change', (e) => {
                this.reducedMotion = e.target.checked;
                this.applyAccessibilitySettings();
                this.saveUserPreferences();
            });
        }
        
        // 重置設定
        const resetBtn = document.getElementById('reset-accessibility');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetSettings());
        }
        
        // 鍵盤快捷鍵
        document.addEventListener('keydown', (e) => {
            // Ctrl + '+' 增大字體
            if (e.ctrlKey && e.key === '=') {
                e.preventDefault();
                this.changeFontSize(10);
            }
            // Ctrl + '-' 減小字體
            if (e.ctrlKey && e.key === '-') {
                e.preventDefault();
                this.changeFontSize(-10);
            }
            // Ctrl + 0 重置字體
            if (e.ctrlKey && e.key === '0') {
                e.preventDefault();
                this.resetFontSize();
            }
        });
    }
    
    changeFontSize(delta) {
        this.fontSize = Math.max(50, Math.min(200, this.fontSize + delta));
        this.applyAccessibilitySettings();
        this.updateFontSizeDisplay();
        this.saveUserPreferences();
    }
    
    resetFontSize() {
        this.fontSize = 100;
        this.applyAccessibilitySettings();
        this.updateFontSizeDisplay();
        this.saveUserPreferences();
    }
    
    updateFontSizeDisplay() {
        const display = document.getElementById('font-size-display');
        if (display) {
            display.textContent = `${this.fontSize}%`;
        }
    }
    
    applyAccessibilitySettings() {
        const root = document.documentElement;
        
        // 字體大小
        root.style.fontSize = `${this.fontSize}%`;
        
        // 高對比度模式
        if (this.highContrast) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
        
        // 減少動畫
        if (this.reducedMotion) {
            document.body.classList.add('reduced-motion');
        } else {
            document.body.classList.remove('reduced-motion');
        }
        
        // 更新檢查框狀態
        const highContrastCheckbox = document.getElementById('high-contrast');
        const reducedMotionCheckbox = document.getElementById('reduced-motion');
        
        if (highContrastCheckbox) {
            highContrastCheckbox.checked = this.highContrast;
        }
        if (reducedMotionCheckbox) {
            reducedMotionCheckbox.checked = this.reducedMotion;
        }
    }
    
    enhanceKeyboardNavigation() {
        // 添加鍵盤導航支持
        const focusableElements = document.querySelectorAll(
            'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        focusableElements.forEach(element => {
            // 添加焦點樣式
            element.addEventListener('focus', () => {
                element.classList.add('keyboard-focus');
            });
            
            element.addEventListener('blur', () => {
                element.classList.remove('keyboard-focus');
            });
        });
        
        // 模態對話框焦點管理
        const modals = document.querySelectorAll('[role="dialog"]');
        modals.forEach(modal => {
            const focusableInModal = modal.querySelectorAll(
                'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableInModal.length > 0) {
                const firstElement = focusableInModal[0];
                const lastElement = focusableInModal[focusableInModal.length - 1];
                
                // 陷阱焦點在模態對話框內
                lastElement.addEventListener('keydown', (e) => {
                    if (e.key === 'Tab' && !e.shiftKey) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                });
                
                firstElement.addEventListener('keydown', (e) => {
                    if (e.key === 'Tab' && e.shiftKey) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                });
            }
        });
    }
    
    addSkipLinks() {
        // 檢查是否已有跳過連結
        if (!document.querySelector('.skip-link')) {
            const skipLink = document.createElement('a');
            skipLink.href = '#main-content';
            skipLink.className = 'skip-link';
            skipLink.textContent = '跳至主要內容';
            document.body.insertBefore(skipLink, document.body.firstChild);
        }
    }
    
    enhanceFormAccessibility() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            // 添加表單標籤
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                if (!input.id && !input.getAttribute('aria-label')) {
                    const label = input.previousElementSibling;
                    if (label && label.tagName === 'LABEL') {
                        input.id = `input-${Math.random().toString(36).substr(2, 9)}`;
                        label.setAttribute('for', input.id);
                    }
                }
            });
            
            // 添加錯誤處理
            form.addEventListener('invalid', (e) => {
                e.preventDefault();
                this.announceError('表單驗證錯誤，請檢查輸入內容');
            }, true);
        });
    }
    
    addLiveRegions() {
        // 添加動態內容區域
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
    }
    
    enhanceImageAccessibility() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // 檢查alt屬性
            if (!img.hasAttribute('alt')) {
                img.setAttribute('alt', '圖片');
            }
            
            // 添加長描述支持
            if (img.hasAttribute('data-longdesc')) {
                const longDescLink = document.createElement('a');
                longDescLink.href = img.getAttribute('data-longdesc');
                longDescLink.className = 'longdesc-link';
                longDescLink.textContent = '查看詳細描述';
                longDescLink.setAttribute('aria-label', `查看 ${img.alt} 的詳細描述`);
                img.parentNode.insertBefore(longDescLink, img.nextSibling);
            }
        });
    }
    
    addFocusIndicators() {
        // 添加焦點指示器樣式
        const style = document.createElement('style');
        style.textContent = `
            .keyboard-focus {
                outline: 3px solid #007acc !important;
                outline-offset: 2px !important;
            }
            
            .high-contrast .keyboard-focus {
                outline: 3px solid #ffff00 !important;
            }
            
            .reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    announceError(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 3000);
        }
    }
    
    saveUserPreferences() {
        try {
            const preferences = {
                fontSize: this.fontSize,
                highContrast: this.highContrast,
                reducedMotion: this.reducedMotion
            };
            localStorage.setItem('wtsdhc-accessibility', JSON.stringify(preferences));
        } catch (e) {
            console.warn('無法保存無障礙設定');
        }
    }
    
    loadUserPreferences() {
        try {
            const saved = localStorage.getItem('wtsdhc-accessibility');
            if (saved) {
                const preferences = JSON.parse(saved);
                this.fontSize = preferences.fontSize || 100;
                this.highContrast = preferences.highContrast || false;
                this.reducedMotion = preferences.reducedMotion || false;
            }
        } catch (e) {
            console.warn('無法讀取無障礙設定');
        }
    }
    
    resetSettings() {
        this.fontSize = 100;
        this.highContrast = false;
        this.reducedMotion = false;
        this.applyAccessibilitySettings();
        this.updateFontSizeDisplay();
        this.saveUserPreferences();
        this.announceError('無障礙設定已重置');
    }
}

// 初始化無障礙功能
document.addEventListener('DOMContentLoaded', function() {
    window.accessibilityEnhancer = new AccessibilityEnhancer();
});

// 導出供其他模組使用
window.AccessibilityEnhancer = AccessibilityEnhancer; 