/* 메뉴 스크립트 */
console.log('hi')
$("#nav-1 a").on("click", function() {
  var position = $(this)
    .parent().position();
  var width = $(this)
    .parent().width();
  $("#nav-1 .slide1").css({ opacity: 1, left: +position.left, width: width });
});

$("#nav-1 a").on("mouseover", function() {
  var position = $(this)
    .parent().position();
  var width = $(this)
    .parent().width();
  $("#nav-1 .slide1").css({ opacity: 1, left: +position.left, width: width });
});

$("#nav-1 li:not(.menu_li_about)").on("mouseleave", function() {
  if (!$('.about_menu').hasClass('active')) {
    $("#nav-1 .slide1").css({ opacity: 0 });
  }
});

// About 메뉴 클릭 이벤트
$(document).ready(function() {
    // 모든 About 링크에 대한 이벤트 처리
    $(document).on('click', '.about a, .menu_li_about a', function(e) {
        e.preventDefault();
        
        // 네비게이션 링크 opacity 조정
        $('nav a, .nav-right a').css('opacity', '60%');
        
        // 슬라이드 바 위치 조정
        var position = $(this).parent().offset().left;
        var width = $(this).parent().width();
        
        $('.slide1, .slide2').css({
            'left': position + 'px',
            'width': width + 'px'
        });
        
        console.log('About clicked:', {
            position: position,
            width: width
        });
    });
});

// Dawoon Kim 클릭 이벤트
$('.header a').on('click', function(e) {
  e.preventDefault();
  $('.about_menu').toggleClass('active');
  $('.menu_li_about a').toggleClass('active');
  
  if ($('.about_menu').hasClass('active')) {
    var position = $('.menu_li_about').position();
    var width = $('.menu_li_about').width();
    $("#nav-1 .slide1").css({ opacity: 1, left: +position.left, width: width });
  } else {
    $("#nav-1 .slide1").css({ opacity: 0 });
  }
});

// About 닫기 버튼 클릭 이벤트
$('.about_menu_icon').on('click', function() {
  $('.about_menu').removeClass('active');
  $('.menu_li_about a').removeClass('active');
  $("#nav-1 .slide1").css({ opacity: 0 });
});

// ESC 키로 About 패널 닫기
$(document).on('keydown', function(e) {
  if (e.key === 'Escape' && $('.about_menu').hasClass('active')) {
    $('.about_menu').removeClass('active');
    $('.menu_li_about a').removeClass('active');
    $("#nav-1 .slide1").css({ opacity: 0 });
  }
});

// 초기 슬라이드 위치 설정
if ($('.about_menu').hasClass('active')) {
  var position = $('.menu_li_about').position();
  var width = $('.menu_li_about').width();
  $("#nav-1 .slide1").css({ opacity: 1, left: +position.left, width: width });
}

/* 어바웃 메뉴 시간 스크립트 */
function updateClock() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  
  const dateString = `${year}.${month}.${day}`;
  const timeString = `${hours}:${minutes}:${seconds}`;
  const fullString = `${dateString} ${timeString}`;
  document.getElementById('clock').textContent = fullString;
}
// 매 초마다 시계 업데이트
setInterval(updateClock, 1000);
// 페이지 로드 시에도 시계 업데이트
updateClock();


//* 메인 년도 시계
function updateClock2() {
  const now = new Date();
  const year = now.getFullYear();
  
  const dateString = `© ${year}`;
  const fullString = `${dateString}`;
  document.getElementById('clock2').textContent = fullString;
}
// 매 초마다 시계 업데이트
setInterval(updateClock2, 1000);
// 페이지 로드 시에도 시계 업데이트
updateClock2();


//* 어바웃 년도 시계
function updateClock3() {
  const now = new Date();
  const year = now.getFullYear();
  
  const dateString = `© ${year}`;
  const fullString = `${dateString}`;
  document.getElementById('clock3').textContent = fullString;
}
// 매 초마다 시계 업데이트
setInterval(updateClock3, 1000);
// 페이지 로드 시에도 시계 업데이트
updateClock3();

document.addEventListener("DOMContentLoaded", function () {
  const { Engine, Render, World, Bodies, Mouse, MouseConstraint } = Matter;

  // ✅ Matter.js 엔진 생성
  const engine = Engine.create({
      gravity: {
          x: 0,
          y: 2.2, // 기본값 1에서 증가 (더 빠른 낙하)
          scale: 0.0006 // 미세 조정 가능
      }
  });
  const render = Render.create({
      canvas: document.getElementById("matterCanvas"),
      engine: engine,
      options: {
          width: window.innerWidth,
          height: window.innerHeight,
          wireframes: false,
          background: "transparent"
      }
  });

  // ✅ 개체 초기 위치 설정 (랜덤)
  const objects = [
      { texture: "img/image1.png", x: Math.random() * window.innerWidth, y: -185, width: 180, height: 90 },
      { texture: "img/image2.png", x: Math.random() * window.innerWidth, y: -220, width: 200, height: 100 },
      { texture: "img/image3.png", x: Math.random() * window.innerWidth, y: -280, width: 220, height: 110 },
      { texture: "img/image4.png", x: Math.random() * window.innerWidth, y: -330, width: 200, height: 100 },
      { texture: "img/image5.png", x: Math.random() * window.innerWidth, y: -370, width: 180, height: 90 }
  ];

  const scaleFactor = 0.7;

  // ✅ Matter.js 개체 생성
  const bodies = objects.map(obj => {
      return Bodies.rectangle(obj.x, obj.y, obj.width * scaleFactor, obj.height * scaleFactor, {
          density: 0.005,
          restitution: 1.2,
          friction: 0.6,
          frictionAir: 0.06,
          render: {
              sprite: {
                  texture: obj.texture,
                  xScale: scaleFactor,
                  yScale: scaleFactor
              }
          }
      });
  });

  // ✅ 바닥 & 벽 생성
  const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 10, { isStatic: true, render: { fillStyle: "transparent" } });
  const leftWall = Bodies.rectangle(0, window.innerHeight / 2, 10, window.innerHeight, { isStatic: true, render: { fillStyle: "transparent" } });
  const rightWall = Bodies.rectangle(window.innerWidth, window.innerHeight / 2, 10, window.innerHeight, { isStatic: true, render: { fillStyle: "transparent" } });

  // ✅ 개체를 시간차를 두고 추가
  function addBodiesWithDelay(bodies, delay) {
      bodies.forEach((body, index) => {
          setTimeout(() => {
              World.add(engine.world, body);
          }, index * delay);
      });
  }
  addBodiesWithDelay(bodies, 500);

  // ✅ 벽과 바닥 추가
  World.add(engine.world, [ground, leftWall, rightWall]);

  // ✅ 마우스 컨트롤 추가
  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
          stiffness: 0.3,
          render: { visible: false }
      }
  });

  World.add(engine.world, mouseConstraint);
  render.mouse = mouse;

  // ✅ Matter.js 엔진 실행
  Matter.Runner.run(engine);
  Render.run(render);

  // ✅ 스크롤 시 중력 조정
  window.addEventListener("scroll", () => {
      let scrollY = window.scrollY;
      let newGravity = 0.8 + scrollY / 250;
      engine.world.gravity.y = Math.min(newGravity, 5);
  });

    // ✅ 창 크기 변경 시 반응형 조정
    window.addEventListener("resize", () => {
        render.canvas.width = window.innerWidth;
        render.canvas.height = window.innerHeight;
        render.options.width = window.innerWidth;
        render.options.height = window.innerHeight;
    });

    // 프로젝트 데이터 객체
    const projectData = {
        'IPLEX STUDIO PLATFORM': {
            title: 'IPLEX STUDIO PLATFORM',
            subtitle: '함께 만들어가는 IP 콘텐츠, 아이플렉스 스튜디오',
            type: '[Company Project]',
            date: 'Date : 2023.10',
            part: 'BX DESIGN (100%) GUI DESIGN (90%)',  // 추가
            client: 'Client : EmoticBox Inc.',
            color: '#622BF7',
            images: [
                'img/projects/iplex/img1.png',
                'img/projects/iplex/img2.png',
                'img/projects/iplex/img3.png',
                'img/projects/iplex/img4.gif',
                'img/projects/iplex/img5.png',
                'img/projects/iplex/img6.gif',
                'img/projects/iplex/img7.gif', 
                'img/projects/iplex/img8.png',
                'img/projects/iplex/img9.png',
                'img/projects/iplex/img10.png',
                'img/projects/iplex/img11.png',
                'img/projects/iplex/img12.png',
                'img/projects/iplex/img13.png',
                'img/projects/iplex/img14.png',
                'img/projects/iplex/img15.png',
                'img/projects/iplex/img16.png',
                'img/projects/iplex/img17.png',
                'img/projects/iplex/img18.png',
                'img/projects/iplex/img19.png',
                'img/projects/iplex/img20.png', 
                'img/projects/iplex/img21.png'                
            ]
        },
        
        "99DAS PLATFORM": {
            title: "99DAS PLATFORM WEB · APP",
            subtitle: "인플루언서 마케팅 플랫폼, 구구다스 웹 · 앱",
            type: "[Company Project]",
            date: "Date : 2020.09",
            part: 'UI · GUI DESIGN (100%)', 
            client: "Client : Amazing E&M",
            color: "#F5BCBC",
            images: [
              'img/projects/99das/img1.png',
              'img/projects/99das/img2.gif',
              'img/projects/99das/img3.png',
              'img/projects/99das/img4.png',
              'img/projects/99das/img5.png',
              'img/projects/99das/img6.png',
              'img/projects/99das/img7.png',
              'img/projects/99das/img8.png',
              'img/projects/99das/img9.png',
              'img/projects/99das/img10.png',
              'img/projects/99das/img11.png',
              'img/projects/99das/img12.png',
              'img/projects/99das/img13.png',
              'img/projects/99das/img14.png'
            ]   
        },

        "RIDP CMF ARCHIVE": {
            title: "RIDP CMF ARCHIVE",
            subtitle: "인플루언서 마케팅 플랫폼, 구구다스 웹 · 앱",
            type: "[Company Project]",
            date: "Date : 2022.05",
            part: 'UIUX DESIGN (70%)', 
            client: "Client : 대구경북디자인진흥원",
            color: "#BAE14C",
            images: [
              'img/projects/ridp/img1.png',
              'img/projects/ridp/img2.png',
              'img/projects/ridp/img3.png',
              'img/projects/ridp/img4.png',
              'img/projects/ridp/img5.png',
              'img/projects/ridp/img6.png',
              'img/projects/ridp/img7.png', 
              'img/projects/ridp/img8.png',
              'img/projects/ridp/img9.png',
              'img/projects/ridp/img10.png',
              'img/projects/ridp/img11.png',
              'img/projects/ridp/img12.png',
              'img/projects/ridp/img13.png',
              'img/projects/ridp/img14.png',   
              'img/projects/ridp/img15.png',    
              'img/projects/ridp/img16.png',    
              'img/projects/ridp/img17.png',    
              'img/projects/ridp/img18.png'   
            ]   
        },

        "PALETUNE": {
            title: "PALETUNE",
            subtitle: "설명...",
            type: "WEB · APP",
            date: "2024",
            client: "Client Name",
            color: "#5EB6CA",
            isLocked: false
        }
    };

    // 프로젝트 호버 효과
    document.querySelectorAll('.project li').forEach(project => {
        project.addEventListener('mouseover', function () {
            let color = this.getAttribute('data-color');
            this.style.setProperty('--hover-color', color);
            
            // 상단 텍스트만 색상 변경
            const elements = [
                '#clock2',
                '#main-title',
                '#main-title a',
                '.header h1',
                '.header h2'
            ].map(selector => document.querySelector(selector));

            elements.forEach(el => {
                if (el) el.style.color = color;
            });

            // 현재 프로젝트의 텍스트만 색상 변경
            this.querySelector('.project_title_blur, .project_title').style.color = color;
        });

        project.addEventListener('mouseleave', function () {
            this.style.removeProperty('--hover-color');
            
            const elements = [
                '#clock2',
                '#main-title',
                '#main-title a',
                '.header h1',
                '.header h2'
            ].map(selector => document.querySelector(selector));

            elements.forEach(el => {
                if (el) el.style.color = '#E3C1B0';
            });

            this.querySelector('.project_title_blur, .project_title').style.color = '';
        });
    });

    // 프로젝트 클릭 이벤트 수정
    document.querySelectorAll('.project li').forEach(project => {
        project.addEventListener('click', function() {
            const projectTitle = this.querySelector('.project_title_blur').textContent.trim();
            const isLocked = this.querySelector('img[src="img/lock.svg"]') !== null;
            
            if (isLocked) {
                const popup = document.getElementById('popup-container');
                popup.classList.remove('hidden');
                popup.classList.add('active');
                
                const passwordInput = document.getElementById('password-input');
                passwordInput.value = '';
                passwordInput.focus();

                // ESC 키로 팝업 닫기
                const escHandler = (e) => {
                    if (e.key === 'Escape') {
                        closePasswordPopup();
                    }
                };
                document.addEventListener('keydown', escHandler);

                // 팝업 배경 클릭으로 닫기
                popup.addEventListener('click', function(e) {
                    if (e.target === popup) {
                        closePasswordPopup();
                    }
                });

                // 팝업 닫기 함수
                function closePasswordPopup() {
                    popup.classList.remove('active');
                    popup.classList.add('hidden');
                    document.removeEventListener('keydown', escHandler);
                }

                // 비밀번호 확인 함수
                const checkPassword = () => {
                    const password = passwordInput.value;
                    if (checkProjectPassword(password)) {
                        alert('✅ 비밀번호 확인 완료! 프로젝트를 엽니다...');
                        closePasswordPopup();
                        setTimeout(() => {
                            showProjectContent(projectTitle);
                        }, 500);
                    } else {
                        alert('❌ 비밀번호가 일치하지 않습니다. 다시 시도해주세요!');
                        passwordInput.value = '';
                        passwordInput.focus();
                    }
                };

                // 확인 버튼 클릭 이벤트
                document.getElementById('submit-password').onclick = checkPassword;

                // Enter 키 이벤트
                passwordInput.onkeypress = function(e) {
                    if (e.key === 'Enter') {
                        checkPassword();
                    }
                };
            } else {
                showProjectContent(projectTitle);
            }
        });
    });

    // 이미지 캐시 저장소
    const imageCache = new Map();

    function showProjectContent(projectId) {
        const project = projectData[projectId];
        const modal = document.querySelector('.project-modal');
        
        // 기본 정보 업데이트
        document.documentElement.style.setProperty('--project-color', project.color);
        
        // 프로젝트 정보 업데이트
        modal.querySelector('.project-title').textContent = project.title;
        modal.querySelector('.project-subtitle').textContent = project.subtitle;
        modal.querySelector('.project-type').textContent = project.type;
        modal.querySelector('.project-part').textContent = project.part;  // 추가
        modal.querySelector('.project-date').textContent = project.date;
        modal.querySelector('.project-client').textContent = project.client;
        
        const modalBody = modal.querySelector('.modal-body');
        
        // 캐시된 이미지가 있는지 확인
        if (imageCache.has(projectId)) {
            modalBody.innerHTML = '';
            modalBody.appendChild(imageCache.get(projectId));
            modal.style.display = 'block';
            requestAnimationFrame(() => {
                modal.classList.add('active');
            });
            document.body.style.overflow = 'hidden';
            return;
        }
        
        // 로딩 인디케이터 표시
        modalBody.innerHTML = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <div class="loading-text">Loading Images... <span class="loading-progress">0%</span></div>
            </div>
        `;
        
        // 모달 표시
        modal.style.display = 'block';
        requestAnimationFrame(() => {
            modal.classList.add('active');
        });
        document.body.style.overflow = 'hidden';
        
        // 이미지 프리로딩
        const imagePromises = project.images.map((src, index) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                
                // 이미지 최적화 설정
                img.loading = 'eager'; // 즉시 로딩으로 변경
                img.decoding = 'async';
                img.setAttribute('importance', 'high');
                
                img.onload = () => {
                    const progress = Math.round(((index + 1) / project.images.length) * 100);
                    modal.querySelector('.loading-progress').textContent = `${progress}%`;
                    resolve(img);
                };
                
                img.onerror = reject;
                img.src = src;
                img.alt = `${project.title} - image ${index + 1}`;
            });
        });
        
        Promise.all(imagePromises)
            .then(loadedImages => {
                const imageContainer = document.createElement('div');
                imageContainer.className = 'project-images';
                
                loadedImages.forEach(img => {
                    // 이미지 복제본 생성 및 속성 복사
                    const imgClone = img.cloneNode(true);
                    imgClone.style.display = 'block';
                    imgClone.style.width = '100%';
                    imageContainer.appendChild(imgClone);
                });
                
                // 캐시에 저장
                imageCache.set(projectId, imageContainer.cloneNode(true));
                
                modalBody.style.opacity = '0';
                setTimeout(() => {
                    modalBody.innerHTML = '';
                    modalBody.appendChild(imageContainer);
                    modalBody.style.opacity = '1';
                }, 300);
            })
            .catch(error => {
                console.error('이미지 로딩 실패:', error);
                modalBody.innerHTML = '<div class="error-message">이미지를 불러오는데 실패했습니다.</div>';
            });
    }

    // 스크롤 최적화 함수
    function optimizeScroll() {
        const modalContent = document.querySelector('.modal-content');
        let ticking = false;
        
        modalContent.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    // 현재 보이는 이미지만 높은 품질로 유지
                    const images = document.querySelectorAll('.project-images img');
                    images.forEach(img => {
                        const rect = img.getBoundingClientRect();
                        const isVisible = (
                            rect.top >= -rect.height &&
                            rect.bottom <= window.innerHeight + rect.height
                        );
                        
                        if (isVisible) {
                            img.style.willChange = 'transform';  // 성능 최적화
                        } else {
                            img.style.willChange = 'auto';
                        }
                    });
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        }, { passive: true });  // 스크롤 성능 향상
    }

    // 이미지 인터섹션 옵저버 설정
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // 이미지가 뷰포트에 들어올 때 고품질 유지
                img.style.willChange = 'transform';
            } else {
                const img = entry.target;
                // 이미지가 뷰포트를 벗어날 때 최적화
                img.style.willChange = 'auto';
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });

    // 모달 닫기 시 애니메이션
    document.querySelector('.modal-close').addEventListener('click', function() {
        const modal = document.querySelector('.project-modal');
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            // 모달 내용은 유지
        }, 800);
    });

    // About 메뉴 관련 코드 (jQuery 사용)
    $(document).ready(function() {
        try {
            // About 메뉴 클릭
            $('.menu_li_about a, .about a').on('click', function(e) {
                e.preventDefault();
                console.log('About clicked');
                
                $('.about_menu').addClass('active');
                $(this).addClass('active');
                
                // 네비게이션 링크 opacity 조정
                $('nav a, .nav-right a').css('opacity', '60%');
                
                // 슬라이드 바 위치 조정
                var position = $(this).parent().position();
                var width = $(this).parent().width();
                
                $('#nav-1 .slide1').css({
                    opacity: 1,
                    left: position.left,
                    width: width
                });
            });

            // Dawoon Kim 클릭
            $('.header a').click(function(e) {
                e.preventDefault();
                console.log('Dawoon Kim clicked');
                $('.about_menu').addClass('active');
                $('.menu_li_about a').addClass('active');
                
                // 슬라이드 바 위치 조정
                var position = $('.menu_li_about').position();
                var width = $('.menu_li_about').width();
                $('#nav-1 .slide1').css({
                    opacity: 1,
                    left: position.left,
                    width: width
                });
            });

            // About 메뉴 닫기
            $('.about_menu_icon').click(function() {
                console.log('Close clicked');
                $('.about_menu').removeClass('active');
                $('.menu_li_about a').removeClass('active');
                $('#nav-1 .slide1').css({ opacity: 0 });
            });

            // ESC 키로 About 메뉴 닫기
            $(document).keydown(function(e) {
                if (e.key === 'Escape' && $('.about_menu').hasClass('active')) {
                    $('.about_menu').removeClass('active');
                    $('.menu_li_about a').removeClass('active');
                    $('#nav-1 .slide1').css({ opacity: 0 });
                }
            });

            // 메뉴 호버 효과
            $('#nav-1 a').hover(
                function() {
                    var position = $(this).parent().position();
                    var width = $(this).parent().width();
                    $('#nav-1 .slide1').css({
                        opacity: 1,
                        left: position.left,
                        width: width
                    });
                },
                function() {
                    if (!$('.about_menu').hasClass('active')) {
                        $('#nav-1 .slide1').css({ opacity: 0 });
                    }
                }
            );
        } catch (error) {
            console.log('About menu setup error:', error);
        }
    });

    // 탑 버튼 기능
    const modalContent = document.querySelector('.modal-content');
    const topButton = document.querySelector('.top-button');

    if (modalContent && topButton) {
        // 스크롤 이벤트
        modalContent.addEventListener('scroll', function() {
            if (this.scrollTop > 300) { // 300px 이상 스크롤 시
                topButton.classList.add('visible');
            } else {
                topButton.classList.remove('visible');
            }
        });

        // 탑 버튼 클릭
        topButton.addEventListener('click', function() {
            modalContent.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

function showPasswordPrompt(projectId) {
    const passwordPrompt = document.querySelector('.password-prompt');
    const passwordInput = passwordPrompt.querySelector('input[type="password"]');
    
    // 입력창 초기화
    passwordInput.value = '';
    
    // 모달 표시 전에 포커스 준비
    passwordInput.readOnly = false;
    passwordInput.tabIndex = 1;
    
    // 모달 표시
    passwordPrompt.style.display = 'flex';
    
    // 즉시 포커스 시도
    passwordInput.focus();
    
    // DOM 업데이트 후 포커스
    requestAnimationFrame(() => {
        passwordInput.focus();
        // 마지막 포커스 시도
        setTimeout(() => {
            passwordInput.click();
            passwordInput.focus();
        }, 100);
    });

    // 비밀번호 확인 이벤트
    function checkPassword(e) {
        if (e.key === 'Enter' || e.type === 'click') {
            const password = passwordInput.value;
            if (password === projectData[projectId].password) {
                passwordPrompt.style.display = 'none';
                showProjectContent(projectId);
                // 이벤트 리스너 제거
                passwordInput.removeEventListener('keyup', checkPassword);
                passwordPrompt.querySelector('button').removeEventListener('click', checkPassword);
            } else {
                alert('비밀번호가 일치하지 않습니다.');
                passwordInput.value = '';
                passwordInput.focus();
            }
        }
    }

    // 이벤트 리스너 설정
    passwordInput.addEventListener('keyup', checkPassword);
    passwordPrompt.querySelector('button').addEventListener('click', checkPassword);
}

function showPasswordPopup() {
    document.body.classList.add('popup-open');
    // ... 기존 팝업 표시 코드 ...
}

function hidePasswordPopup() {
    document.body.classList.remove('popup-open');
    // ... 기존 팝업 숨김 코드 ...
}

// Vault 페이지 관련 코드
document.addEventListener('DOMContentLoaded', function() {
    // 현재 페이지가 vault.html인지 확인
    if (location.pathname.endsWith('vault.html')) {
        console.log('Vault page detected'); // 디버깅용

        // 필요한 요소들 가져오기
        const vaultPopup = document.getElementById('vault-popup-container');
        const vaultContent = document.querySelector('.vault-content');
        const passwordInput = document.getElementById('vault-password-input');
        
        // 요소 존재 확인
        console.log('Elements found:', { // 디버깅용
            popup: !!vaultPopup,
            content: !!vaultContent,
            input: !!passwordInput
        });

        // 초기 상태 설정
        if (vaultContent) vaultContent.style.display = 'none';
        if (vaultPopup) vaultPopup.style.display = 'flex';
        
        // 비밀번호 입력 이벤트
        if (passwordInput) {
            passwordInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    checkVaultPassword(this.value);
                }
            });
        }
    }
});

// 비밀번호 확인 함수
function checkVaultPassword(input) {
    console.log('Password check initiated'); // 디버깅용
    
    try {
        if (!PASSWORDS || !PASSWORDS.VAULT) {
            console.error('Password configuration not found');
            return false;
        }

        const hashedInput = CryptoJS.MD5(input).toString();
        console.log('Password check:', { // 디버깅용
            inputLength: input.length,
            hashLength: hashedInput.length
        });

        if (hashedInput === PASSWORDS.VAULT) {
            const popup = document.getElementById('vault-popup-container');
            const content = document.querySelector('.vault-content');
            
            if (popup) popup.style.display = 'none';
            if (content) content.style.display = 'block';
            
            return true;
        } else {
            alert('Invalid password');
            return false;
        }
    } catch (error) {
        console.error('Password check error:', error);
        return false;
    }
}