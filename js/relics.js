// 유물 페이지 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    setupTabs();
    setupFilters();
    setupRelicModal();
});

// 탭 기능 설정
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.relics-section');

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
            
            filterRelics(filterType, filterValue);
        });
    });
}

// 유물 필터링
function filterRelics(filterType, filterValue) {
    const activeSection = document.querySelector('.relics-section.active');
    if (!activeSection) return;

    const relics = activeSection.querySelectorAll('.relic-item');

    relics.forEach(relic => {
        let show = true;

        if (filterType === 'character' && filterValue !== 'all') {
            const relicCharacter = relic.getAttribute('data-character');
            show = relicCharacter === filterValue || relicCharacter === 'colorless';
        } else if (filterType === 'type' && filterValue !== 'all') {
            const relicType = relic.getAttribute('data-type');
            show = relicType === filterValue;
        }

        if (show) {
            relic.classList.remove('hidden');
        } else {
            relic.classList.add('hidden');
        }
    });
}

// 유물 모달 기능 설정
function setupRelicModal() {
    // 모달 HTML 생성
    const modalHTML = `
        <div class="relic-modal" id="relicModal">
            <div class="modal-content">
                <button class="modal-close" id="modalClose">&times;</button>
                <div class="modal-relic-image">
                    <!-- 유물 이미지 공간 -->
                </div>
                <div class="modal-relic-details">
                    <h3 id="modalRelicTitle">유물 이름</h3>
                    <div class="modal-relic-stats" id="modalRelicStats">
                        <!-- 유물 통계 -->
                    </div>
                    <p class="modal-relic-description" id="modalRelicDescription">유물 설명</p>
                    <div class="modal-relic-combo" id="modalRelicCombo">
                        <!-- 조합 정보 -->
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('relicModal');
    const modalClose = document.getElementById('modalClose');
    const relicItems = document.querySelectorAll('.relic-item');

    // 유물 클릭 시 모달 열기
    relicItems.forEach(relic => {
        relic.addEventListener('click', function() {
            openRelicModal(this);
        });
    });

    // 닫기 버튼 클릭 시 모달 닫기
    modalClose.addEventListener('click', closeRelicModal);

    // 모달 배경 클릭 시 모달 닫기
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeRelicModal();
        }
    });

    // ESC 키 누를 시 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeRelicModal();
        }
    });
}

// 유물 모달 열기
function openRelicModal(relicElement) {
    const modal = document.getElementById('relicModal');
    const title = relicElement.querySelector('h3').textContent;
    const description = relicElement.querySelector('.relic-description').textContent;
    const combo = relicElement.querySelector('.relic-combo').textContent;
    
    // 통계 정보 수집
    const stats = relicElement.querySelectorAll('.relic-stats span');
    let statsHTML = '';
    stats.forEach(stat => {
        statsHTML += `<span class="character">${stat.textContent}</span>`;
    });

    // 모달 내용 업데이트
    document.getElementById('modalRelicTitle').textContent = title;
    document.getElementById('modalRelicStats').innerHTML = statsHTML;
    document.getElementById('modalRelicDescription').textContent = description;
    document.getElementById('modalRelicCombo').innerHTML = combo;

    // 모달 표시
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // 스크롤 방지
}

// 유물 모달 닫기
function closeRelicModal() {
    const modal = document.getElementById('relicModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // 스크롤 허용
}

// 유물 즐겨찾기 기능 (추가 예정)
function setupFavorites() {
    // TODO: 유물 즐겨찾기 기능 구현
}

// 유물 조합 추천 기능 (추가 예정)
function setupCombinationRecommendations() {
    // TODO: 유물 조합 추천 시스템 구현
}

// 유물 검색 기능 (추가 예정)
function setupSearch() {
    // TODO: 유물 검색 기능 구현
}

// 유물 비교 기능 (추가 예정)
function setupComparison() {
    // TODO: 유물 비교 기능 구현
}
