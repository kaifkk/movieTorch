const sections = gsap.utils.toArray('.page');

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.main',
    pin: true,
    scrub: 0.5,
    snap: 1 / (sections.length - 1),
    start: 'top top',
    end: 2000,
  },
});

let flag = 0;

$('.fotter').click(function() {
  if (flag == 0) {
    $('.second-fotter').hide();
    flag = 1;
  } else {
    $('.second-fotter').show();
    flag = 0;
  }
});

