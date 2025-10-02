const ADMIN_USERNAME = "shahid.hashemy.school@gmail.com";
const ADMIN_PASSWORD = "Hashemy_1362";

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        alert('✅ ورود موفقیت‌آمیز بود!');
    } else {
        alert('❌ نام کاربری یا رمز عبور اشتباه است!');
    }
}

function logout() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    alert('👋 با موفقیت خارج شدید!');
}

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function addAnnouncement() {
    const title = document.getElementById('announcementTitle').value;
    const content = document.getElementById('announcementContent').value;
    const category = document.getElementById('announcementCategory').value;
    
    if (title && content) {
        const announcements = loadFromLocalStorage('announcements');
        const newAnnouncement = {
            id: Date.now(),
            title: title,
            content: content,
            category: category,
            date: new Date().toLocaleDateString('fa-IR')
        };
        
        announcements.unshift(newAnnouncement);
        saveToLocalStorage('announcements', announcements);
        
        alert('✅ اطلاعیه با موفقیت اضافه شد!');
        document.getElementById('announcementTitle').value = '';
        document.getElementById('announcementContent').value = '';
    } else {
        alert('❌ لطفاً عنوان و متن اطلاعیه را وارد کنید.');
    }
}

function showAnnouncements() {
    const announcements = loadFromLocalStorage('announcements');
    if (announcements.length === 0) {
        alert('📝 هیچ اطلاعیه‌ای وجود ندارد.');
    } else {
        let message = '📢 اطلاعیه‌های موجود:\n\n';
        announcements.forEach((ann, index) => {
            message += `${index + 1}. ${ann.title} (${ann.category}) - ${ann.date}\n`;
            message += `   ${ann.content}\n\n`;
        });
        alert(message);
    }
}

function clearAll() {
    if (confirm('⚠️ آیا مطمئن هستید که می‌خواهید همه اطلاعات را پاک کنید؟')) {
        localStorage.clear();
        alert('✅ همه اطلاعات با موفقیت پاک شدند.');
    }
}

// اسکرول نرم برای لینک‌های منو
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// بارگذاری اطلاعات هنگام لود صفحه
window.addEventListener('load', function() {
    const announcements = loadFromLocalStorage('announcements');
    console.log('اطلاعیه‌های بارگذاری شده:', announcements);
});
