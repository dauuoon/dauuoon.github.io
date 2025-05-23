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

// About 메뉴 클릭 이벤트 수정
$('.menu_li_about').on('click', function(e) {
    e.preventDefault();
    console.log('About menu clicked'); // 디버깅용
    $('.about_menu').toggleClass('active');
    $(this).find('a').toggleClass('active');
    
    if ($('.about_menu').hasClass('active')) {
        var position = $(this).position();
        var width = $(this).width();
        $("#nav-1 .slide1").css({ opacity: 1, left: +position.left, width: width });
    } else {
        $("#nav-1 .slide1").css({ opacity: 0 });
    }
});

// Dawoon Kim 클릭 이벤트 수정
$('.header a').on('click', function(e) {
    e.preventDefault();
    console.log('Dawoon Kim clicked'); // 디버깅용
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

// About 닫기 버튼 클릭 이벤트 수정
$('.about_menu_icon').on('click', function() {
    console.log('Close button clicked'); // 디버깅용
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
        "IPLEX STUDIO PLATFORM": {
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
        // About 메뉴 클릭
        $('.menu_li_about a').click(function(e) {
            e.preventDefault();
            console.log('About clicked');
            $('.about_menu').addClass('active');
            $(this).addClass('active');
            
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
    });

    // 스크롤 위치에 따라 탑 버튼을 보여주거나 숨기는 함수
    // 이 함수는 이벤트 리스너 안에서 정의되거나 호출되어야 합니다.
    function toggleTopButtonVisibility() {
        const topButton = document.querySelector('.top-button');
        if (topButton) { // 탑 버튼 요소가 존재하는지 확인
            if (window.scrollY > 200) { // 200px 이상 스크롤했을 때
                topButton.classList.add('visible');
            } else {
                topButton.classList.remove('visible');
            }
        }
    }

    // 페이지의 DOM 트리가 완전히 로드되고 파싱되었을 때 실행
    window.addEventListener('DOMContentLoaded', function() {
        // 여기에 기존 script.js 파일의 모든 코드를 넣으세요.
        // 예시:
        // const navLinks = document.querySelectorAll('#nav-1 li a');
        // const slide1 = document.querySelector('#nav-1 .slide1');
        // 등등...

        // *************** 기존 script.js 코드 시작 ***************

        // 네비게이션 메뉴의 모든 링크
        const navLinks = document.querySelectorAll('#nav-1 li a');

        // 슬라이드 바 요소들
        const slide1 = document.querySelector('#nav-1 .slide1');
        const slide2 = document.querySelector('#nav-1 .slide2');

        // ABOUT 링크와 닫기 버튼
        const aboutLink = document.querySelector('.menu_li_about a');
        const closeButton = document.querySelector('.about_menu_icon');

        // !!! 여기에 765번째 줄 오류가 발생했던 코드 !!!
        if (aboutLink) { // aboutLink 요소가 존재하는지 확인하는 조건문 추가
            aboutLink.addEventListener('click', function() {
                navLinks.forEach(link => {
                    link.style.opacity = '60%';  // 모든 링크 opacity 초기화
                });
                // 슬라이드 바 위치 조정
                const position = this.parentElement.offsetLeft;
                const width = this.parentElement.offsetWidth;
                if (slide1 && slide2) { // 슬라이드 바 요소가 존재하는지 확인
                    slide1.style.left = position + 'px';
                    slide1.style.width = width + 'px';
                    slide2.style.left = position + 'px';
                    slide2.style.width = width + 'px';
                }
            });
        } else {
            console.error("ABOUT 링크 요소를 찾을 수 없습니다."); // 디버깅을 위해 콘솔에 로그 남김
        }

        // !!! 여기에 378번째 줄 오류가 발생했던 코드 !!!
        // 378번째 줄 근처 코드를 정확히 알려주시면 해당 부분도 수정해드릴 수 있습니다.
        // 임시로 오류 방지 조건문 추가
        // 예시: 어떤 요소를 찾아서 textContent를 읽으려 했다면...
        // const someElement = document.querySelector('.some-selector'); // 예시 선택자
        // if (someElement) {
        //     console.log(someElement.textContent); // 오류 발생했던 코드
        // } else {
        //     console.error(".some-selector 요소를 찾을 수 없습니다.");
        // }

        // 닫기 버튼 클릭 시 ABOUT 활성화 상태 초기화
        if (closeButton) { // closeButton 요소가 존재하는지 확인
            closeButton.addEventListener('click', function() {
                if (aboutLink) { // aboutLink가 존재하는 경우에만 opacity 변경
                     aboutLink.style.opacity = '60%';  // ABOUT 링크 opacity 초기화
                }

                // 현재 페이지에 따라 원래 활성화된 메뉴 상태로 복원
                navLinks.forEach(link => {
                    if ((currentPage === '' || currentPage === 'index.html') && link.textContent === 'PROJECT') {  // WORK를 PROJECT로 변경
                        activateMenu(link);
                    }
                    else if (currentPage === 'vault.html' && link.textContent === 'VAULT') {
                        activateMenu(link);
                    }
                });
            });
        } else {
            console.error("ABOUT 닫기 버튼 요소를 찾을 수 없습니다."); // 디버깅 로그
        }

        // 메뉴 활성화 함수 (DOM 조작 포함)
        function activateMenu(link) {
             if (link && slide1 && slide2) { // link 및 슬라이드 바 요소가 존재하는지 확인
                link.style.opacity = '1';
                const position = link.parentElement.offsetLeft;
                const width = link.parentElement.offsetWidth;
                slide1.style.opacity = '1';
                slide1.style.left = position + 'px';
                slide1.style.width = width + 'px';
                slide2.style.opacity = '1';
                slide2.style.left = position + 'px';
                slide2.style.width = width + 'px';
             }
        }

        // 페이지 로드 시 초기 메뉴 활성화 (DOM 조작 포함)
        navLinks.forEach(link => {
             if (link) { // link 요소가 존재하는지 확인
                if ((currentPage === '' || currentPage === 'index.html') && link.textContent === 'PROJECT') {
                    activateMenu(link);
                }
                else if (currentPage === 'vault.html' && link.textContent === 'VAULT') {
                    activateMenu(link);
                }
             }
        });

        // Vault 페이지 비밀번호 체크 (DOM 요소 접근)
        if (currentPage === 'vault.html') {
            const vaultContent = document.getElementById('vault-content');
            const popup = document.getElementById('vault-popup-container');
            const passwordInput = document.getElementById('vault-password-input');
            const submitButton = document.getElementById('vault-submit-password'); // 제출 버튼도 필요할 수 있습니다.

            // 팝업 관련 요소들이 모두 존재하는지 확인하는 조건문 추가
            if (vaultContent && popup && passwordInput && submitButton) {

                // 페이지 로드 시 팝업 표시
                popup.classList.remove('hidden'); // hidden 클래스가 있다면 제거
                popup.classList.add('active'); // active 클래스 추가
                passwordInput.focus(); // 입력 필드에 포커스

                // ESC 키로 팝업 닫기 (페이지 이동)
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                        // window.location.href = 'index.html'; // 이 두 줄은 vault.html에서 다른 페이지로 이동하는 것인지 확인 필요
                        // window.location.href = 'vault.html'; // 같은 페이지로 다시 이동하면 무한 루프나 오류 발생 가능성
                        // 보통은 팝업만 닫거나 (display: none), 이전 페이지로 이동합니다.
                        // 예: window.history.back(); 또는 window.location.href = 'index.html';
                        console.log("ESC 키 눌림 - 팝업 닫기 또는 페이지 이동 로직 실행 필요"); // 로그 추가
                         // 팝업만 닫으려면:
                         popup.classList.remove('active');
                         popup.classList.add('hidden'); // hidden 클래스가 있다면 추가
                    }
                });

                // 팝업 배경 클릭 시 페이지 이동
                popup.addEventListener('click', function(e) {
                    if (e.target === popup) {
                         // window.location.href = 'index.html'; // 이 두 줄은 동일한 문제
                         // window.location.href = 'vault.html';
                        console.log("팝업 배경 클릭 - 팝업 닫기 또는 페이지 이동 로직 실행 필요"); // 로그 추가
                        // 팝업만 닫으려면:
                        popup.classList.remove('active');
                        popup.classList.add('hidden'); // hidden 클래스가 있다면 추가
                    }
                });

                 // 비밀번호 제출 버튼 클릭 이벤트 (passwords.js 또는 script.js 내 로직)
                 // 이 부분은 passwords.js에 있을 가능성이 높지만, script.js에 있다면 이 블록 안에 있어야 합니다.
                 // 예시:
                 // submitButton.addEventListener('click', function() {
                 //     checkVaultAuthorization(passwordInput.value); // 비밀번호 확인 함수 호출
                 // });
                 // passwordInput.addEventListener('keypress', function(e) {
                 //     if (e.key === 'Enter') {
                 //          checkVaultAuthorization(passwordInput.value); // 비밀번호 확인 함수 호출
                 //     }
                 // });

            } else {
                 console.error("Vault 페이지 팝업 관련 요소를 찾을 수 없습니다."); // 로그 추가
            }
        }

        // *************** 기존 script.js 코드 끝 ***************

        // 스크롤 이벤트 리스너 (탑 버튼 관련)
        window.addEventListener('scroll', toggleTopButtonVisibility);

        // 페이지 로드 시 초기 탑 버튼 상태 설정 (스크롤 위치 확인)
        toggleTopButtonVisibility();

        // 다른 DOM 조작 및 이벤트 리스너 코드들도 모두 이 안에 넣습니다.
    }); // <-- DOMContentLoaded 이벤트 리스너 끝
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

// 현재 페이지에 따른 메뉴 활성화
document.addEventListener('DOMContentLoaded', function() {
    // 현재 페이지 URL 가져오기
    const currentPage = window.location.pathname.split('/').pop();
    
    // 네비게이션 메뉴의 모든 링크
    const navLinks = document.querySelectorAll('#nav-1 li a');
    
    // 슬라이드 바 요소들
    const slide1 = document.querySelector('#nav-1 .slide1');
    const slide2 = document.querySelector('#nav-1 .slide2');
    
    // ABOUT 링크와 닫기 버튼
    const aboutLink = document.querySelector('.menu_li_about a');
    const closeButton = document.querySelector('.about_menu_icon');
    
    // ABOUT 클릭 시 다른 활성화 상태 초기화
    aboutLink.addEventListener('click', function() {
        navLinks.forEach(link => {
            link.style.opacity = '60%';  // 모든 링크 opacity 초기화
        });
        // 슬라이드 바 위치 조정
        const position = this.parentElement.offsetLeft;
        const width = this.parentElement.offsetWidth;
        slide1.style.left = position + 'px';
        slide1.style.width = width + 'px';
        slide2.style.left = position + 'px';
        slide2.style.width = width + 'px';
    });

    // 닫기 버튼 클릭 시 ABOUT 활성화 상태 초기화
    closeButton.addEventListener('click', function() {
        aboutLink.style.opacity = '60%';  // ABOUT 링크 opacity 초기화
        
        // 현재 페이지에 따라 원래 활성화된 메뉴 상태로 복원
        navLinks.forEach(link => {
            if ((currentPage === '' || currentPage === 'index.html') && link.textContent === 'PROJECT') {  // WORK를 PROJECT로 변경
                activateMenu(link);
            }
            else if (currentPage === 'vault.html' && link.textContent === 'VAULT') {
                activateMenu(link);
            }
        });
    });

    // 메뉴 활성화 함수
    function activateMenu(link) {
        link.style.opacity = '1';
        const position = link.parentElement.offsetLeft;
        const width = link.parentElement.offsetWidth;
        slide1.style.opacity = '1';
        slide1.style.left = position + 'px';
        slide1.style.width = width + 'px';
        slide2.style.opacity = '1';
        slide2.style.left = position + 'px';
        slide2.style.width = width + 'px';
    }

    // 페이지 로드 시 초기 메뉴 활성화
    navLinks.forEach(link => {
        if ((currentPage === '' || currentPage === 'index.html') && link.textContent === 'PROJECT') {  // WORK를 PROJECT로 변경
            activateMenu(link);
        }
        else if (currentPage === 'vault.html' && link.textContent === 'VAULT') {
            activateMenu(link);
        }
    });

    // Vault 페이지 비밀번호 체크
    if (currentPage === 'vault.html') {
        const vaultContent = document.getElementById('vault-content');
        const popup = document.getElementById('vault-popup-container');
        const passwordInput = document.getElementById('vault-password-input');
        
        // 페이지 로드 시 팝업 표시
        popup.classList.remove('hidden');
        popup.classList.add('active');
        passwordInput.focus();

        // ESC 키로 팝업 닫기 (페이지 이동)
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                window.location.href = 'index.html';
                window.location.href = 'vault.html';
            }
        });

        // 팝업 배경 클릭 시 페이지 이동
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                window.location.href = 'index.html';
                window.location.href = 'vault.html';

            }
        });

        // 비밀번호 확인
        function checkVaultPassword() {
            const password = passwordInput.value;
            if (checkProjectPassword(password)) { // 프로젝트와 동일한 비밀번호 사용
                popup.classList.remove('active');
                popup.classList.add('hidden');
                vaultContent.style.display = 'block';
            } else {
                alert('❌ 비밀번호가 일치하지 않습니다. 다시 시도해주세요!');
                passwordInput.value = '';
                passwordInput.focus();
            }
        }

        // 확인 버튼 클릭 이벤트
        document.getElementById('vault-submit-password').onclick = checkVaultPassword;

        // Enter 키 이벤트
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkVaultPassword();
            }
        });
    }

    // 모든 study-item에 클릭 이벤트 추가
    const studyItems = document.querySelectorAll('.study-item');
    
    studyItems.forEach(item => {
        item.addEventListener('click', function() {
            const existingPopup = document.querySelector('.study-popup');
            if (existingPopup) {
                existingPopup.remove();
            }
            
            const popup = document.createElement('div');
            popup.className = 'study-popup';
            
            const content = document.createElement('div');
            content.className = 'study-popup-content';
            
            const img = document.createElement('img');
            img.src = this.dataset.fullImage;
            content.appendChild(img);
            
            const closeBtn = document.createElement('div');
            closeBtn.className = 'study-popup-close';
            
            popup.appendChild(content);
            popup.appendChild(closeBtn);
            document.body.appendChild(popup);
            
            // 강제 리플로우를 통해 트랜지션이 적용되도록 함
            popup.offsetHeight;
            requestAnimationFrame(() => popup.classList.add('active'));
            
            const closePopup = () => {
                popup.classList.remove('active');
                // 트랜지션이 끝난 후 요소 제거
                setTimeout(() => {
                    popup.remove();
                }, 300);  // 트랜지션 시간과 동일하게 설정
                
                document.removeEventListener('keydown', handleEsc);
                closeBtn.removeEventListener('click', closePopup);
                popup.removeEventListener('click', handleOutsideClick);
            };
            
            const handleEsc = (e) => {
                if (e.key === 'Escape') closePopup();
            };
            
            const handleOutsideClick = (e) => {
                if (e.target === popup) closePopup();
            };
            
            document.addEventListener('keydown', handleEsc);
            closeBtn.addEventListener('click', closePopup);
            popup.addEventListener('click', handleOutsideClick);
        });
    });

    // vault 페이지 진입 시 즉시 비밀번호 체크
    if (window.location.pathname.includes('vault.html')) {
        checkVaultAuthorization();
    }
});

function checkVaultAuthorization() {
    // 이미 인증된 상태인지 확인
    const isAuthorized = sessionStorage.getItem('vaultAuthorized');
    if (!isAuthorized) {
        // 인증되지 않은 경우 팝업 표시
        document.getElementById('vault-popup-container').classList.remove('hidden');
    } else {
        // 인증된 경우 컨텐츠 표시
        document.querySelector('.vault-content').classList.add('authorized');
    }
}

// 비밀번호 확인 후 처리
function handleVaultAuthorization() {
    // 비밀번호 확인 로직...
    if (passwordIsCorrect) {
        sessionStorage.setItem('vaultAuthorized', 'true');
        document.getElementById('vault-popup-container').classList.add('hidden');
        document.querySelector('.vault-content').classList.add('authorized');
    }
}

// 모달 열기
function openModal() {
    document.body.classList.add('modal-open');
    // ... 기존 모달 열기 코드 ...
}

// 모달 닫기
function closeModal() {
    document.body.classList.remove('modal-open');
    // ... 기존 모달 닫기 코드 ...
}

// 비밀번호 팝업 열 때
function showPasswordPopup() {
    document.body.classList.add('popup-open');
    // ... 기존 팝업 표시 코드 ...
}

// 비밀번호 팝업 닫을 때
function hidePasswordPopup() {
    document.body.classList.remove('popup-open');
    // ... 기존 팝업 숨김 코드 ...
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('vault.html')) {
        const isAuthorized = sessionStorage.getItem('vaultAuthorized');
        const popupContainer = document.getElementById('vault-popup-container');
        const vaultContent = document.querySelector('.vault-content');
        
        if (!isAuthorized) {
            // 비인증 상태
            vaultContent.style.display = 'none';
            document.body.classList.add('popup-open');
            
            // 페이지 표시 및 팝업 열기
            requestAnimationFrame(() => {
                document.documentElement.style.display = '';
                popupContainer.style.display = 'flex';
            });
        } else {
            // 인증 상태
            popupContainer.style.display = 'none';
            vaultContent.style.display = 'block';
        }
    }
});

// MD5 해시 함수 (외부 라이브러리 사용)
function md5(string) {
    return CryptoJS.MD5(string).toString();
}
// 비밀번호 체크 함수 확인
function checkProjectPassword(input) {
    // 입력값과 저장된 해시값 비교
    const hashedInput = CryptoJS.MD5(input).toString();
    console.log('Entered hash:', hashedInput); // 디버깅용
    console.log('Stored hash:', PASSWORDS.PROJECT); // 디버깅용
    return hashedInput === PASSWORDS.PROJECT;
}

function checkVaultPassword(input) {
    return md5(input) === PASSWORDS.VAULT;
}

