(() => {

    let yOffset = 0; // window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)

    const sceneInfo = [
        {   // 0
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageA: document.querySelector('#scroll-section-0 .main-message.b'),
                messageA: document.querySelector('#scroll-section-0 .main-message.c'),
                messageA: document.querySelector('#scroll-section-0 .main-message.d')
            },
            values: {
                messageA_opacity: [0, 1], // 투명도롤 0에서 1까지
            }
        },
        {   // 1
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
        },
        {   // 2
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2')
            }
        },
        {   // 3
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3')
            }
        }
    ];

    function setLayout() {
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        let totalScrollHeight = 0;

        yOffset = window.pageYOffset;
        for(let i = 0; i <sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }

        document.body.setAttribute('id', `show-scene-section-${currentScene}`)
    }

    // 각 씬에 해당하는 애니메이션 실행
    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        
        switch(currentScene) {
            case 0:
                let messageA_opacity_0 = values.messageA_opacity[0];
                let messageA_opacity_1 = values.messageA_opacity[1];
                console.log(values.messageA_opacity, currentYOffset)
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
        }
    }


    // 현재 얼마나 스크롤 되었는지에 따라 값을 계산하는 함수
    function calcValues(values, currentYOffset) {
        let rv;
        // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
        let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight; // 현재 얼마나 스크롤되었는지에 대한 비율
        return rv;
    }

    function scrollLoop() {
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
        }

        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            currentScene++;
            document.body.setAttribute('id', `show-scene-section-${currentScene}`)
        }

        if(yOffset < prevScrollHeight) {
            if(currentScene === 0) return; // 바운스 효과를 -취급하는 브라우저에서 대응
            currentScene--;
            document.body.setAttribute('id', `show-scene-section-${currentScene}`)
        }

        playAnimation();
    }

    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset; // 현재 스크롤 위치
        scrollLoop();
    })

})();