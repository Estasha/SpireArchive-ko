// 고대의 존재 페이지 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    setupTabs();
    setupFilters();
    setupAncientModal();
});

// 탭 기능 설정
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.ancients-section');

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
            
            filterAncients(filterType, filterValue);
        });
    });
}

// 고대의 존재 필터링
function filterAncients(filterType, filterValue) {
    const activeSection = document.querySelector('.ancients-section.active');
    if (!activeSection) return;

    const ancients = activeSection.querySelectorAll('.ancient-item');

    ancients.forEach(ancient => {
        let show = true;

        if (filterType === 'character' && filterValue !== 'all') {
            const ancientCharacter = ancient.getAttribute('data-character');
            show = ancientCharacter === filterValue;
        } else if (filterType === 'cost' && filterValue !== 'all') {
            const ancientCost = ancient.getAttribute('data-cost');
            if (filterValue === '4+') {
                show = parseInt(ancientCost) >= 4;
            } else {
                show = ancientCost === filterValue;
            }
        } else if (filterType === 'rarity' && filterValue !== 'all') {
            const ancientRarity = ancient.getAttribute('data-rarity');
            show = ancientRarity === filterValue;
        }

        if (show) {
            ancient.classList.remove('hidden');
        } else {
            ancient.classList.add('hidden');
        }
    });
}

// 고대의 존재 모달 기능 설정
function setupAncientModal() {
    // 모달 HTML 생성
    const modalHTML = `
        <div class="ancient-modal" id="ancientModal">
            <div class="modal-content">
                <button class="modal-close" id="modalClose">&times;</button>
                <div class="modal-ancient-image">
                    <!-- 고대의 존재 이미지 공간 -->
                </div>
                <div class="modal-ancient-details">
                    <h3 id="modalAncientTitle">고대의 존재 이름</h3>
                    <p class="modal-ancient-description" id="modalAncientDescription">고대의 존재 설명</p>
                    <div class="modal-ancient-stats" id="modalAncientStats">
                        <!-- 고대의 존재 통계 -->
                    </div>
                    <div class="modal-ancient-combo" id="modalAncientCombo">
                        <!-- 조합 정보 -->
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('ancientModal');
    const modalClose = document.getElementById('modalClose');
    const ancientItems = document.querySelectorAll('.ancient-item');

    // 고대의 존재 클릭 시 모달 열기
    ancientItems.forEach(ancient => {
        ancient.addEventListener('click', function() {
            openAncientModal(this);
        });
    });

    // 닫기 버튼 클릭 시 모달 닫기
    modalClose.addEventListener('click', closeAncientModal);

    // 모달 배경 클릭 시 모달 닫기
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeAncientModal();
        }
    });

    // ESC 키 누를 시 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAncientModal();
        }
    });
}

// 고대의 존재 모달 열기
function openAncientModal(ancientElement) {
    const modal = document.getElementById('ancientModal');
    const title = ancientElement.querySelector('h3').textContent;
    const description = ancientElement.querySelector('.ancient-description').textContent;
    const combo = ancientElement.querySelector('.ancient-combo').textContent;
    
    // 통계 정보 수집
    const stats = ancientElement.querySelectorAll('.ancient-stats span');
    let statsHTML = '';
    stats.forEach(stat => {
        const statClass = stat.classList.contains('rarity') ? `rarity ${stat.textContent}` : '';
        statsHTML += `<span class="${statClass}">${stat.textContent}</span>`;
    });

    // 모달 내용 업데이트
    document.getElementById('modalAncientTitle').textContent = title;
    document.getElementById('modalAncientDescription').textContent = description;
    document.getElementById('modalAncientStats').innerHTML = statsHTML;
    document.getElementById('modalAncientCombo').innerHTML = `<strong>추천 조합:</strong> ${combo.replace('추천 조합: ', '')}`;

    // 모달 표시
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // 스크롤 방지
}

// 고대의 존재 모달 닫기
function closeAncientModal() {
    const modal = document.getElementById('ancientModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // 스크롤 허용
}

// 검색 기능 (추가 예정)
function setupSearch() {
    // TODO: 고대의 존재 검색 기능 구현
}

// 정렬 기능 (추가 예정)
function setupSorting() {
    // TODO: 고대의 존재 정렬 기능 구현 (이름, 비용, 희귀도 등)
}

// 고대의 존재 즐겨찾기 기능 (추가 예정)
function setupFavorites() {
    // TODO: 고대의 존재 즐겨찾기 기능 구현
}

// 고대의 존재 비교 기능 (추가 예정)
function setupComparison() {
    // TODO: 고대의 존재 비교 기능 구현
}

// 고대의 존재 추천 시스템 (추가 예정)
function setupRecommendations() {
    // TODO: 캐릭터별 고대의 존재 추천 시스템 구현
}

// 고대의 존재 획득 조건 정보 (추가 예정)
function setupAcquisitionInfo() {
    // TODO: 고대의 존재 획득 조건과 위치 정보 구현
}

// 고대의 존재 시너지 분석 (추가 예정)
function setupSynergyAnalysis() {
    // TODO: 고대의 존재와 다른 카드의 시너지 분석 기능 구현
}
