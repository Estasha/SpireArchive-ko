// 메인 JavaScript 파일

// DOM 로드 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 부드러운 스크롤
    setupSmoothScrolling();
    
    // 네비게이션 활성화
    setupNavigation();
    
    // 애니메이션 효과
    setupAnimations();
});

// 부드러운 스크롤 설정
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // 헤더 높이 고려
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 네비게이션 활성화
function setupNavigation() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// 애니메이션 효과
function setupAnimations() {
    // 캐릭터 카드 애니메이션
    const characterCards = document.querySelectorAll('.character-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    characterCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// 검색 기능 (추가 예정)
function setupSearch() {
    // TODO: 검색 기능 구현
}

// 테마 전환 기능 (추가 예정)
function setupThemeToggle() {
    // TODO: 다크/라이트 테마 전환 기능
}

// 데이터 로드 (추가 예정)
function loadData() {
    // TODO: 외부 데이터 파일에서 카드, 유물 등 정보 로드
}
