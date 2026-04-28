// 포션 페이지 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    setupTabs();
    setupFilters();
    setupPotionModal();
});

// 탭 기능 설정
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.potions-section');

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
            
            filterPotions(filterType, filterValue);
        });
    });
}

// 포션 필터링
function filterPotions(filterType, filterValue) {
    const activeSection = document.querySelector('.potions-section.active');
    if (!activeSection) return;

    const potions = activeSection.querySelectorAll('.potion-item');

    potions.forEach(potion => {
        let show = true;

        if (filterType === 'effect' && filterValue !== 'all') {
            const potionEffect = potion.getAttribute('data-effect');
            show = potionEffect === filterValue;
        } else if (filterType === 'target' && filterValue !== 'all') {
            const potionTarget = potion.getAttribute('data-target');
            show = potionTarget === filterValue;
        }

        if (show) {
            potion.classList.remove('hidden');
        } else {
            potion.classList.add('hidden');
        }
    });
}

// 포션 모달 기능 설정
function setupPotionModal() {
    // 모달 HTML 생성
    const modalHTML = `
        <div class="potion-modal" id="potionModal">
            <div class="modal-content">
                <button class="modal-close" id="modalClose">&times;</button>
                <div class="modal-potion-image">
                    <!-- 포션 이미지 공간 -->
                </div>
                <div class="modal-potion-details">
                    <h3 id="modalPotionTitle">포션 이름</h3>
                    <p class="modal-potion-description" id="modalPotionDescription">포션 설명</p>
                    <div class="modal-potion-stats" id="modalPotionStats">
                        <!-- 포션 통계 -->
                    </div>
                    <div class="modal-potion-usage" id="modalPotionUsage">
                        <!-- 사용법 -->
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('potionModal');
    const modalClose = document.getElementById('modalClose');
    const potionItems = document.querySelectorAll('.potion-item');

    // 포션 클릭 시 모달 열기
    potionItems.forEach(potion => {
        potion.addEventListener('click', function() {
            openPotionModal(this);
        });
    });

    // 닫기 버튼 클릭 시 모달 닫기
    modalClose.addEventListener('click', closePotionModal);

    // 모달 배경 클릭 시 모달 닫기
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closePotionModal();
        }
    });

    // ESC 키 누를 시 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePotionModal();
        }
    });
}

// 포션 모달 열기
function openPotionModal(potionElement) {
    const modal = document.getElementById('potionModal');
    const title = potionElement.querySelector('h3').textContent;
    const description = potionElement.querySelector('.potion-description').textContent;
    const usage = potionElement.querySelector('.potion-usage').textContent;
    
    // 통계 정보 수집
    const stats = potionElement.querySelectorAll('.potion-stats span');
    let statsHTML = '';
    stats.forEach(stat => {
        statsHTML += `<span>${stat.textContent}</span>`;
    });

    // 모달 내용 업데이트
    document.getElementById('modalPotionTitle').textContent = title;
    document.getElementById('modalPotionDescription').textContent = description;
    document.getElementById('modalPotionStats').innerHTML = statsHTML;
    document.getElementById('modalPotionUsage').innerHTML = `<strong>추천 상황:</strong> ${usage.replace('추천 상황: ', '')}`;

    // 모달 표시
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // 스크롤 방지
}

// 포션 모달 닫기
function closePotionModal() {
    const modal = document.getElementById('potionModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // 스크롤 허용
}

// 검색 기능 (추가 예정)
function setupSearch() {
    // TODO: 포션 검색 기능 구현
}

// 정렬 기능 (추가 예정)
function setupSorting() {
    // TODO: 포션 정렬 기능 구현 (이름, 효과, 희귀도 등)
}

// 포션 즐겨찾기 기능 (추가 예정)
function setupFavorites() {
    // TODO: 포션 즐겨찾기 기능 구현
}

// 포션 비교 기능 (추가 예정)
function setupComparison() {
    // TODO: 포션 비교 기능 구현
}

// 포션 추천 시스템 (추가 예정)
function setupRecommendations() {
    // TODO: 캐릭터별 포션 추천 시스템 구현
}
