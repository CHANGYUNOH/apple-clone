(() => {

    let yOffset = 0; // window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화된(눈 앞에 보고 있는) 씬(scroll-section)
    let enterNewScene = false; // 새로운 scene이 시작된 순간

    const sceneInfo = [
        {
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d'),
            },
            values: {
                messageA_opactiy: [0, 1, { start: 0.1, end: 0.2 }],
                messageA_opactiy: [0, 1, { start: 0.3, end: 0.4 }],

            }
        },
        {
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
        },
        {
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2')
            }
        },
        {
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3')
            }
        }
    ];

    function setLayout() {
        // 각 스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }

        document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    function calcValues(values, currentYOffset) {
        let rv;
        // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;
        
        if(values.length === 3) {
            // start ~ end 사이에 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;
            
            rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
        } else {
            rv = scrollRatio * (values[1] - values[0]) + values[0];
        }

        return rv;
    }

    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;

        switch (currentScene) {
            case 0:
                //console.log('0 play')
                let messageA_opacity_in = calcValues(values.messageA_opactiy, currentYOffset);
                objs.messageA.style.opacity = messageA_opacity_in;
                
                break;
            case 1:
                //console.log('1 play')
                break;
            case 2:
                //console.log('2 play')
                break;
            case 3:
                //console.log('3 play')
                break;
        }
    }

    function scrollLoop() {
        enterNewScene = false;
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
        }

        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if(yOffset < prevScrollHeight) {
            enterNewScene = true;
            if(currentScene === 0) return; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if(enterNewScene) return;
        playAnimation();

    }

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    })

    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);

})();