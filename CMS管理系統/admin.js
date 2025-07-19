// CMS管理系統功能 (重構與增強版)
class AdminPanel {
    constructor() {
        this.currentSection = 'dashboard';
        // 將 DOM 元素查詢集中管理
        this.dom = {
            sidebar: document.querySelector('.admin-sidebar'),
            sidebarToggle: document.querySelector('.sidebar-toggle'),
            navItems: document.querySelectorAll('.nav-item'),
            sections: document.querySelectorAll('.content-section'),
            pageTitle: document.getElementById('page-title'),
            modal: document.getElementById('modal'),
            modalTitle: document.getElementById('modal-title'),
            modalClose: document.querySelector('.modal-close'),
            modalCancel: document.getElementById('modal-cancel'),
            contentForm: document.getElementById('content-form'),
            contentList: document.querySelector('.content-list'), // 假設只有一個 .content-list
            adminContent: document.querySelector('.admin-content'), // 用於事件委派
            logoutBtn: document.querySelector('.logout-btn'),
        };
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadInitialData();
        this.setupCustomModals();
        // 預設顯示儀表板
        this.switchSection('dashboard', false); // 初始加載時不寫入歷史
    }

    bindEvents() {
        // 使用箭頭函數確保 this 指向 AdminPanel 實例
        this.dom.sidebarToggle?.addEventListener('click', () => this.toggleSidebar());

        this.dom.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.getAttribute('data-section');
                this.switchSection(section);
            });
        });

        this.dom.logoutBtn?.addEventListener('click', () => this.logout());

        // 使用事件委派處理動態內容和多個相似按鈕
        this.dom.adminContent?.addEventListener('click', (e) => {
            const target = e.target;
            const actionBtn = target.closest('[data-action]');
            const addBtn = target.closest('.btn-add');
            const editBtn = target.closest('.btn-edit');
            const deleteBtn = target.closest('.btn-delete');
            const tabBtn = target.closest('.tab-btn');

            if (actionBtn) this.handleQuickAction(actionBtn.dataset.action);
            if (addBtn) this.openContentModal('add', addBtn.dataset.type);
            if (editBtn) this.openContentModal('edit', editBtn.dataset.type, editBtn.dataset.id);
            if (deleteBtn) this.confirmDelete(deleteBtn.dataset.id);
            if (tabBtn) this.switchTab(tabBtn.dataset.tab);
        });

        // 模態框事件
        this.dom.modal?.addEventListener('click', (e) => {
            if (e.target === this.dom.modal) this.closeModal();
        });
        this.dom.modalClose?.addEventListener('click', () => this.closeModal());
        this.dom.modalCancel?.addEventListener('click', () => this.closeModal());
        this.dom.contentForm?.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }

    toggleSidebar() {
        this.dom.sidebar?.classList.toggle('open');
    }

    switchSection(section, addToHistory = true) {
        this.dom.sections.forEach(s => s.classList.remove('active'));
        const targetSection = document.getElementById(section);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        this.dom.navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === section) {
                item.classList.add('active');
            }
        });

        if (this.dom.pageTitle) {
            const activeNavItem = document.querySelector(`.nav-item[data-section="${section}"]`);
            this.dom.pageTitle.textContent = activeNavItem?.textContent || '儀表板';
        }

        if (addToHistory) {
            // 可選：更新 URL hash，實現瀏覽器歷史記錄
            // history.pushState({ section }, ``, `#${section}`);
        }
        this.currentSection = section;
    }

    switchTab(tab) {
        const tabContainer = document.querySelector(`[data-tab="${tab}"]`).closest('.content-tabs');
        
        tabContainer.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        tabContainer.querySelector(`[data-tab="${tab}"]`).classList.add('active');

        const panelContainer = tabContainer.nextElementSibling;
        panelContainer.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
        panelContainer.querySelector(`#${tab}-tab`)?.classList.add('active');
    }

    handleQuickAction(action) {
        switch (action) {
            case 'new-page':
                this.openContentModal('add', 'page');
                break;
            case 'new-news':
                this.openContentModal('add', 'news');
                break;
            case 'upload-media':
                this.openMediaUpload();
                break;
            default:
                console.warn('未知操作:', action);
        }
    }

    // --- Modal Logic ---
    openContentModal(type, contentType = '', id = null) {
        const modalTitleText = type === 'add' ? '新增內容' : '編輯內容';
        this.dom.modalTitle.textContent = modalTitleText;
        
        this.dom.contentForm.reset();
        this.dom.contentForm.dataset.mode = type;
        this.dom.contentForm.dataset.id = id || '';

        const contentTypeSelect = this.dom.contentForm.querySelector('#content-type');
        if (contentType) {
            contentTypeSelect.value = contentType;
        }

        if (type === 'edit' && id) {
            const content = this.getContentById(id);
            if (content) {
                this.dom.contentForm.querySelector('#content-title').value = content['content-title'];
                contentTypeSelect.value = content['content-type'];
                this.dom.contentForm.querySelector('#content-body').value = content['content-body'];
            }
        }
        
        this.dom.modal.hidden = false;
        this.dom.contentForm.querySelector('input, textarea, select')?.focus();
    }

    closeModal() {
        this.dom.modal.hidden = true;
        this.dom.contentForm.reset();
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const mode = form.dataset.mode;
        const id = form.dataset.id;

        if (!this.validateForm(data)) return;

        this.saveContent(data, mode, id);
        this.closeModal();
        this.showNotification('內容已成功保存！', 'success');
        this.loadAndRenderContent();
    }

    validateForm(data) {
        if (!data['content-title']?.trim() || !data['content-type'] || !data['content-body']?.trim()) {
            this.showNotification('請填寫所有必填欄位。', 'error');
            return false;
        }
        return true;
    }

    // --- Data Persistence (localStorage) ---
    loadInitialData() {
        this.loadAndRenderContent();
        // 載入其他數據，例如用戶、設定等
    }

    loadAndRenderContent() {
        try {
            const contents = JSON.parse(localStorage.getItem('cms-contents') || '[]');
            this.renderContentList(contents);
        } catch (e) {
            console.error("無法從 localStorage 讀取或解析內容:", e);
            this.showNotification("讀取資料時發生錯誤。", "error");
            this.renderContentList([]); // 顯示空列表
        }
    }
    
    renderContentList(contents) {
        if (!this.dom.contentList) return;

        if (contents.length === 0) {
            this.dom.contentList.innerHTML = '<p class="no-content">暫無內容，請點擊「新增內容」按鈕來新增第一筆資料。</p>';
            return;
        }

        // 使用 DocumentFragment 提高性能並避免 XSS
        const fragment = document.createDocumentFragment();
        contents.forEach(content => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'content-item';
            
            // 安全地創建內容，避免使用 innerHTML
            itemDiv.innerHTML = `
                <div class="content-info">
                    <h4></h4>
                    <p></p>
                </div>
                <div class="content-actions">
                    <button class="btn btn-sm btn-secondary btn-edit" data-type="${content['content-type']}" data-id="${content.id}">編輯</button>
                    <button class="btn btn-sm btn-danger btn-delete" data-id="${content.id}">刪除</button>
                </div>
            `;
            itemDiv.querySelector('h4').textContent = content['content-title'];
            itemDiv.querySelector('p').textContent = `類型：${content['content-type']} • 最後更新：${new Date(content.updatedAt).toLocaleString()}`;
            
            fragment.appendChild(itemDiv);
        });

        this.dom.contentList.innerHTML = ''; // 清空舊內容
        this.dom.contentList.appendChild(fragment);
    }

    saveContent(data, mode, id) {
        try {
            const contents = JSON.parse(localStorage.getItem('cms-contents') || '[]');
            if (mode === 'add') {
                const newContent = {
                    id: Date.now(),
                    ...data,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                contents.push(newContent);
            } else if (mode === 'edit' && id) {
                const index = contents.findIndex(c => c.id == id);
                if (index !== -1) {
                    contents[index] = { ...contents[index], ...data, updatedAt: new Date().toISOString() };
                }
            }
            localStorage.setItem('cms-contents', JSON.stringify(contents));
        } catch (e) {
            console.error("無法保存內容到 localStorage:", e);
            this.showNotification("保存資料時發生錯誤。", "error");
        }
    }

    getContentById(id) {
        try {
            const contents = JSON.parse(localStorage.getItem('cms-contents') || '[]');
            return contents.find(c => c.id == id);
        } catch {
            return null;
        }
    }

    confirmDelete(id) {
        this.showConfirmModal('確定要刪除此內容嗎？此操作無法復原。', () => {
            try {
                let contents = JSON.parse(localStorage.getItem('cms-contents') || '[]');
                contents = contents.filter(c => c.id != id);
                localStorage.setItem('cms-contents', JSON.stringify(contents));
                this.showNotification('內容已刪除。', 'success');
                this.loadAndRenderContent();
            } catch (e) {
                console.error("刪除內容時出錯:", e);
                this.showNotification("刪除失敗。", "error");
            }
        });
    }

    logout() {
        this.showConfirmModal('您確定要登出嗎？', () => {
            this.showNotification('正在登出...', 'info');
            // 模擬登出延遲
            setTimeout(() => {
                // 實際應用中會清除 token 或 session
                // window.location.href = '/login.html'; // 導向登入頁
                alert("已登出！(實際應用中會跳轉頁面)");
            }, 1000);
        });
    }

    openMediaUpload() {
        this.showNotification("此功能正在開發中。", "info");
    }

    // --- UI Feedback ---
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('fade-out');
            notification.addEventListener('transitionend', () => notification.remove());
        }, duration);
    }
    
    setupCustomModals() {
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 12px 20px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 10001;
                background-color: #3b82f6;
                transition: opacity 0.3s ease, transform 0.3s ease;
                transform: translateX(20px);
                opacity: 0;
                animation: slideIn 0.3s ease forwards;
            }
            .notification.notification-success { background-color: #10b981; }
            .notification.notification-error { background-color: #ef4444; }
            .notification.notification-warning { background-color: #f59e0b; }
            .notification.fade-out { opacity: 0; transform: translateX(100%); }

            @keyframes slideIn {
                to { transform: translateX(0); opacity: 1; }
            }

            .confirm-modal-overlay {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background-color: rgba(0, 0, 0, 0.6);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.2s ease;
            }
            .confirm-modal-overlay.visible { opacity: 1; }
            .confirm-modal {
                background: white;
                padding: 2rem;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                width: 90%;
                max-width: 400px;
                text-align: center;
                transform: scale(0.9);
                transition: transform 0.2s ease;
            }
            .confirm-modal-overlay.visible .confirm-modal { transform: scale(1); }
            .confirm-modal h4 { margin-top: 0; font-size: 1.25rem; color: #1f2937; }
            .confirm-modal p { color: #4b5563; margin: 1rem 0 2rem; }
            .confirm-modal-actions { display: flex; gap: 1rem; justify-content: center; }
        `;
        document.head.appendChild(style);
    }

    showConfirmModal(message, onConfirm) {
        const overlay = document.createElement('div');
        overlay.className = 'confirm-modal-overlay';
        
        const modal = document.createElement('div');
        modal.className = 'confirm-modal';
        modal.innerHTML = `
            <h4>確認操作</h4>
            <p>${message}</p>
            <div class="confirm-modal-actions">
                <button class="btn btn-secondary" id="confirm-cancel">取消</button>
                <button class="btn btn-danger" id="confirm-ok">確定</button>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // 讓動畫效果生效
        setTimeout(() => overlay.classList.add('visible'), 10);

        const close = () => {
            overlay.classList.remove('visible');
            overlay.addEventListener('transitionend', () => overlay.remove());
        };

        modal.querySelector('#confirm-ok').onclick = () => {
            onConfirm();
            close();
        };
        modal.querySelector('#confirm-cancel').onclick = close;
        overlay.onclick = (e) => {
            if (e.target === overlay) close();
        };
    }
}

// 初始化管理面板
document.addEventListener('DOMContentLoaded', function() {
    window.adminPanel = new AdminPanel();
});
