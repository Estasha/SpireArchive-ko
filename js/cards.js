// 카드 페이지 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    setupTabs();
    setupFilters();
    setupCardModal();
});

// 탭 기능 설정
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.character-cards-section');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetCharacter = this.getAttribute('data-character');

            // 모든 탭과 섹션에서 active 클래스 제거
            tabButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            // 현재 탭과 섹션에 active 클래스 추가
            this.classList.add('active');
            const targetSection = document.getElementById(targetCharacter);
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
            
            filterCards(filterType, filterValue);
        });
    });
}

// 카드 필터링
function filterCards(filterType, filterValue) {
    const activeSection = document.querySelector('.character-cards-section.active');
    if (!activeSection) return;

    const cards = activeSection.querySelectorAll('.card-item');

    cards.forEach(card => {
        let show = true;

        if (filterType === 'character' && filterValue !== 'all') {
            // 특정 캐릭터 선택 시 해당 캐릭터 섹션으로 전환
            showCharacterSection(filterValue);
            return; // 다른 카드들은 숨기지 않음
        } else if (filterType === 'type' && filterValue !== 'all') {
            const cardType = card.getAttribute('data-type');
            show = cardType === filterValue;
        } else if (filterType === 'cost' && filterValue !== 'all') {
            const cardCost = card.getAttribute('data-cost');
            if (filterValue === '3+') {
                show = parseInt(cardCost) >= 3;
            } else {
                show = cardCost === filterValue;
            }
        }

        if (show) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// 카드 모달 기능 설정
function setupCardModal() {
    // 모달 HTML 생성
    const modalHTML = `
        <div class="card-modal" id="cardModal">
            <div class="modal-content">
                <button class="modal-close" id="modalClose">&times;</button>
                <div class="modal-card-image">
                    <!-- 카드 이미지 공간 -->
                </div>
                <div class="modal-card-details">
                    <h3 id="modalCardTitle">카드 이름</h3>
                    <div class="modal-card-stats" id="modalCardStats">
                        <!-- 카드 통계 -->
                    </div>
                    <p class="modal-card-description" id="modalCardDescription">카드 설명</p>
                    <div class="modal-card-rarity" id="modalCardRarity">희귀도</div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('cardModal');
    const modalClose = document.getElementById('modalClose');
    const cardItems = document.querySelectorAll('.card-item');

    // 카드 클릭 시 모달 열기
    cardItems.forEach(card => {
        card.addEventListener('click', function() {
            openCardModal(this);
        });
    });

    // 닫기 버튼 클릭 시 모달 닫기
    modalClose.addEventListener('click', closeCardModal);

    // 모달 배경 클릭 시 모달 닫기
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCardModal();
        }
    });

    // ESC 키 누를 시 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCardModal();
        }
    });
}

// 카드 모달 열기
function openCardModal(cardElement) {
    const modal = document.getElementById('cardModal');
    const title = cardElement.querySelector('h3').textContent;
    const description = cardElement.querySelector('.card-description').textContent;
    const rarity = cardElement.querySelector('.card-rarity').textContent;
    
    // 통계 정보 수집
    const stats = cardElement.querySelectorAll('.card-stats span');
    let statsHTML = '';
    stats.forEach(stat => {
        statsHTML += `<span class="cost">${stat.textContent}</span>`;
    });

    // 모달 내용 업데이트
    document.getElementById('modalCardTitle').textContent = title;
    document.getElementById('modalCardStats').innerHTML = statsHTML;
    document.getElementById('modalCardDescription').textContent = description;
    document.getElementById('modalCardRarity').textContent = rarity;

    // 모달 표시
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // 스크롤 방지
}

// 카드 모달 닫기
function closeCardModal() {
    const modal = document.getElementById('cardModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // 스크롤 허용
}

// 캐릭터 섹션 전환 기능
function showCharacterSection(characterName) {
    // 모든 탭과 섹션에서 active 클래스 제거
    const tabButtons = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.character-cards-section');
    
    tabButtons.forEach(btn => btn.classList.remove('active'));
    sections.forEach(section => section.classList.remove('active'));
    
    // 선택된 캐릭터 탭과 섹션에 active 클래스 추가
    const targetTab = document.querySelector(`[data-character="${characterName}"]`);
    const targetSection = document.getElementById(characterName);
    
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // 모든 필터를 '모든 캐릭터'와 '모든 타입'으로 리셋
    const characterFilter = document.querySelector('[data-filter="character"]');
    const typeFilter = document.querySelector('[data-filter="type"]');
    
    if (characterFilter) {
        characterFilter.value = 'all';
    }
    
    if (typeFilter) {
        typeFilter.value = 'all';
    }
}

// 정렬 기능 (추가 예정)
function setupSorting() {
    // TODO: 카드 정렬 기능 구현 (비용, 이름, 희귀도 등)
}

// 카드 즐겨찾기 기능 (추가 예정)
function setupFavorites() {
    // TODO: 카드 즐겨찾기 기능 구현
}

// 카드 덱 빌더 기능 (추가 예정)
function setupDeckBuilder() {
    // TODO: 카드 덱 빌더 기능 구현
}
