// 이벤트 페이지 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    setupTabs();
    setupFilters();
    setupEventModal();
});

// 탭 기능 설정
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.events-section');

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
            
            filterEvents(filterType, filterValue);
        });
    });
}

// 이벤트 필터링
function filterEvents(filterType, filterValue) {
    const activeSection = document.querySelector('.events-section.active');
    if (!activeSection) return;

    const events = activeSection.querySelectorAll('.event-item');

    events.forEach(event => {
        let show = true;

        if (filterType === 'type' && filterValue !== 'all') {
            const eventType = event.getAttribute('data-type');
            show = eventType === filterValue;
        } else if (filterType === 'rarity' && filterValue !== 'all') {
            const eventRarity = event.getAttribute('data-rarity');
            show = eventRarity === filterValue;
        }

        if (show) {
            event.classList.remove('hidden');
        } else {
            event.classList.add('hidden');
        }
    });
}

// 이벤트 모달 기능 설정
function setupEventModal() {
    // 모달 HTML 생성
    const modalHTML = `
        <div class="event-modal" id="eventModal">
            <div class="modal-content">
                <button class="modal-close" id="modalClose">&times;</button>
                <div class="modal-event-image">
                    <!-- 이벤트 이미지 공간 -->
                </div>
                <div class="modal-event-details">
                    <h3 id="modalEventTitle">이벤트 이름</h3>
                    <div class="modal-event-stats" id="modalEventStats">
                        <!-- 이벤트 통계 -->
                    </div>
                    <p class="modal-event-description" id="modalEventDescription">이벤트 설명</p>
                    <div class="modal-event-choices" id="modalEventChoices">
                        <!-- 선택지 정보 -->
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('eventModal');
    const modalClose = document.getElementById('modalClose');
    const eventItems = document.querySelectorAll('.event-item');

    // 이벤트 클릭 시 모달 열기
    eventItems.forEach(event => {
        event.addEventListener('click', function() {
            openEventModal(this);
        });
    });

    // 닫기 버튼 클릭 시 모달 닫기
    modalClose.addEventListener('click', closeEventModal);

    // 모달 배경 클릭 시 모달 닫기
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeEventModal();
        }
    });

    // ESC 키 누를 시 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeEventModal();
        }
    });
}

// 이벤트 모달 열기
function openEventModal(eventElement) {
    const modal = document.getElementById('eventModal');
    const title = eventElement.querySelector('h3').textContent;
    const description = eventElement.querySelector('.event-description').textContent;
    
    // 통계 정보 수집
    const stats = eventElement.querySelectorAll('.event-stats span');
    let statsHTML = '';
    stats.forEach(stat => {
        statsHTML += `<span class="location">${stat.textContent}</span>`;
    });

    // 선택지 정보 수집
    const choices = eventElement.querySelectorAll('.choice');
    let choicesHTML = '<h4>선택지:</h4>';
    choices.forEach(choice => {
        const choiceText = choice.innerHTML;
        choicesHTML += `<div class="modal-choice">${choiceText}</div>`;
    });

    // 모달 내용 업데이트
    document.getElementById('modalEventTitle').textContent = title;
    document.getElementById('modalEventStats').innerHTML = statsHTML;
    document.getElementById('modalEventDescription').textContent = description;
    document.getElementById('modalEventChoices').innerHTML = choicesHTML;

    // 모달 표시
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // 스크롤 방지
}

// 이벤트 모달 닫기
function closeEventModal() {
    const modal = document.getElementById('eventModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // 스크롤 허용
}

// 이벤트 즐겨찾기 기능 (추가 예정)
function setupFavorites() {
    // TODO: 이벤트 즐겨찾기 기능 구현
}

// 이벤트 확률 계산기 (추가 예정)
function setupProbabilityCalculator() {
    // TODO: 이벤트 발생 확률 계산기 구현
}

// 이벤트 추천 시스템 (추가 예정)
function setupRecommendationSystem() {
    // TODO: 캐릭터별 이벤트 추천 시스템 구현
}

// 이벤트 검색 기능 (추가 예정)
function setupSearch() {
    // TODO: 이벤트 검색 기능 구현
}

// 이벤트 비교 기능 (추가 예정)
function setupComparison() {
    // TODO: 이벤트 선택지 비교 기능 구현
}
