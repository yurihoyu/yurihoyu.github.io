'use strict';
{
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');
    const mv_ul = document.getElementById('mv_ul');


    //スライド全体の要素を取得
    const slides = mv_ul.children;
    let currentIndex = 0;

    function updateButtons() {
        prev.classList.remove('hidden');
        next.classList.remove('hidden');

        if (currentIndex === 0) {
            prev.classList.add('hidden');

        }
        // if(currentIndex === 2){
        if (currentIndex === slides.length - 1) {
            next.classList.add('hidden');
            // currentIndex =0;

        }
    }

    function moveSlides() {
        const slideWidth = slides[0].getBoundingClientRect().width;
        mv_ul.style.transform = `translateX(${-1 * slideWidth * currentIndex}px)`;
    }
    //indexをカウントしながらスライドさせる　function slideShow()
    let slideShow = function slideShow() {

        updateButtons();
        moveSlides();
        // console.log(currentIndex);
        // console.log(slides);



    }

    updateButtons();

    // slideShow()を連続して行う
    let id = setInterval(function () {

        currentIndex++;
        // indexがスライドの数-1以上なら0に戻す
        if (slides.length-1 < currentIndex) {
            currentIndex = 0;
        }
        slideShow();

        // indexが2以上ならストップ
        // if(2 < currentIndex){
        // clearInterval(id)}}, 3000);
    }, 3000);



    next.addEventListener('click', () => {
        currentIndex++;
        slideShow();
    });

    prev.addEventListener('click', () => {
        currentIndex--;
        slideShow();
    });

    //ここからIntersectionObserver


    const targets = document.querySelectorAll('.photo');



    function callback(entries, obs) {
        console.log(entries);

        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return
            }

            entry.target.classList.add('appear');
            obs.unobserve(entry.target);
        });


    }

    const options = {
        threshold: 0.2,

    }

    const observer = new IntersectionObserver(callback, options);
    targets.forEach(target => {
        observer.observe(target);

    });

    //ここからモバイルメニュー
    const btn = document.querySelector('.mobile-menu__btn');
    const icon = document.querySelector('.material-icons');
    const cover = document.getElementById('mobile-menu__cover');
    const con = document.getElementById('container');
    const items = document.querySelectorAll('.mobile-menu__item');


    btn.addEventListener('click', () => {
        btn.classList.toggle('menu-open');
        cover.classList.toggle('menu-open');
        con.classList.toggle('menu-open');

        if (btn.classList.contains('menu-open')) {
            icon.id = 'close';
            icon.innerHTML = 'close';
        } else {
            icon.id = 'open';
            icon.innerHTML = 'menu';

        }

        // items.forEach((item) => {
        //     item.classList.add('menu-open');
        // });  

        for (let i = 0; i < items.length; i++) {
            items[i].classList.toggle('menu-open');
        }

    });

    // open.classList.add('hide');



}