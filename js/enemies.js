// 적 페이지 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    setupTabs();
    setupFilters();
    setupEnemyModal();
});

// 탭 기능 설정
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.enemies-section');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');

            // 모든 탭과 섹션에서 active 클래스 제거
            tabButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            // 현재 탭과 섹션에 active 클래스 추가
            this.classList.add('active');
            const targetSection = document.getElementById(targetCategory);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
}

// 필터 기능 설정
function setupFilters() {
    const filterSelects = document.querySelectorAll('.filter-select');

    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            const filterType = this.getAttribute('data-filter');
            const filterValue = this.value;
            
            filterEnemies(filterType, filterValue);
        });
    });
}

// 적 필터링
function filterEnemies(filterType, filterValue) {
    const activeSection = document.querySelector('.enemies-section.active');
    if (!activeSection) return;

    const enemies = activeSection.querySelectorAll('.enemy-item');

    enemies.forEach(enemy => {
        let show = true;

        if (filterType === 'type' && filterValue !== 'all') {
            const enemyType = enemy.getAttribute('data-type');
            show = enemyType === filterValue;
        } else if (filterType === 'difficulty' && filterValue !== 'all') {
            const enemyDifficulty = enemy.getAttribute('data-difficulty');
            show = enemyDifficulty === filterValue;
        }

        if (show) {
            enemy.classList.remove('hidden');
        } else {
            enemy.classList.add('hidden');
        }
    });
}

// 적 모달 기능 설정
function setupEnemyModal() {
    // 모달 HTML 생성
    const modalHTML = `
        <div class="enemy-modal" id="enemyModal">
            <div class="modal-content">
                <button class="modal-close" id="modalClose">&times;</button>
                <div class="modal-enemy-image">
                    <!-- 적 이미지 공간 -->
                </div>
                <div class="modal-enemy-details">
                    <h3 id="modalEnemyTitle">적 이름</h3>
                    <div class="modal-enemy-stats" id="modalEnemyStats">
                        <!-- 적 통계 -->
                    </div>
                    <p class="modal-enemy-description" id="modalEnemyDescription">적 설명</p>
                    <div class="modal-enemy-patterns" id="modalEnemyPatterns">
                        <!-- 공격 패턴 정보 -->
                    </div>
                    <div class="modal-enemy-strategy" id="modalEnemyStrategy">
                        <!-- 대처 전략 정보 -->
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('enemyModal');
    const modalClose = document.getElementById('modalClose');
    const enemyItems = document.querySelectorAll('.enemy-item');

    // 적 클릭 시 모달 열기
    enemyItems.forEach(enemy => {
        enemy.addEventListener('click', function() {
            openEnemyModal(this);
        });
    });

    // 닫기 버튼 클릭 시 모달 닫기
    modalClose.addEventListener('click', closeEnemyModal);

    // 모달 배경 클릭 시 모달 닫기
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeEnemyModal();
        }
    });

    // ESC 키 누를 시 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeEnemyModal();
        }
    });
}

// 적 모달 열기
function openEnemyModal(enemyElement) {
    const modal = document.getElementById('enemyModal');
    const title = enemyElement.querySelector('h3').textContent;
    const description = enemyElement.querySelector('.enemy-description').textContent;
    
    // 통계 정보 수집
    const stats = enemyElement.querySelectorAll('.enemy-stats span');
    let statsHTML = '';
    stats.forEach(stat => {
        const statText = stat.textContent;
        const statClass = stat.className;
        statsHTML += `<span class="${statClass}">${statText}</span>`;
    });

    // 공격 패턴 정보 수집
    const patterns = enemyElement.querySelectorAll('.pattern');
    let patternsHTML = '<h4>공격 패턴:</h4>';
    patterns.forEach(pattern => {
        const patternText = pattern.innerHTML;
        patternsHTML += `<div class="modal-pattern">${patternText}</div>`;
    });

    // 대처 전략 정보 수집
    const strategyElement = enemyElement.querySelector('.enemy-strategy');
    const strategyTitle = strategyElement.querySelector('h4').textContent;
    const strategyText = strategyElement.querySelector('p').textContent;
    const strategyHTML = `
        <h4>${strategyTitle}</h4>
        <p>${strategyText}</p>
    `;

    // 모달 내용 업데이트
    document.getElementById('modalEnemyTitle').textContent = title;
    document.getElementById('modalEnemyStats').innerHTML = statsHTML;
    document.getElementById('modalEnemyDescription').textContent = description;
    document.getElementById('modalEnemyPatterns').innerHTML = patternsHTML;
    document.getElementById('modalEnemyStrategy').innerHTML = strategyHTML;

    // 모달 표시
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // 스크롤 방지
}

// 적 모달 닫기
function closeEnemyModal() {
    const modal = document.getElementById('enemyModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // 스크롤 허용
}

// 적 즐겨찾기 기능 (추가 예정)
function setupFavorites() {
    // TODO: 적 즐겨찾기 기능 구현
}

// 적 추천 시스템 (추가 예정)
function setupRecommendationSystem() {
    // TODO: 캐릭터별 적 추천 시스템 구현
}

// 적 비교 기능 (추가 예정)
function setupComparison() {
    // TODO: 적 비교 기능 구현
}

// 적 검색 기능 (추가 예정)
function setupSearch() {
    // TODO: 적 검색 기능 구현
}

// 적 난이도 계산기 (추가 예정)
function setupDifficultyCalculator() {
    // TODO: 적 난이도 계산기 구현
}
