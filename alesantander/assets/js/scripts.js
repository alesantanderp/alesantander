// GSAP animations
gsap.registerPlugin(ScrollTrigger);

gsap.from("header", {
    duration: 0.5,
    y: -50,
    opacity: 0,
    ease: "power2.out"
});

gsap.from("#about .left-fixed", {
    duration: 1.5,
    y: 50,
    opacity: 0,
    delay: 0.2,
    ease: "power2.out"
});

gsap.from("#about .right-scrollable", {
    scrollTrigger: {
        trigger: "#about",
        start: "top 95%",
        end: "bottom top",
        scrub: true,
    },
    duration: 2,
    x: 200,
    opacity: 0.8,
    ease: "power2.out",
});

gsap.from(".profile", {
    duration: 1.5,
    y: 50,
    opacity: 0.8,
    ease: "power2.out",
});

gsap.utils.toArray("#experience .item-experience").forEach(item => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom top",
            scrub: true,
        },
        duration: 2,
        y: 50,
        opacity: 0.8,
        ease: "power2.out",
    });
});

gsap.utils.toArray("#work .work-item").forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom top",
            scrub: true,
        },
        duration: 1.5,
        y: 50,
        opacity: 0,
        delay: index * 0.2,
        ease: "power2.out",
    });
});

ScrollTrigger.create({
    trigger: "#about",
    start: "top 10%",
    end: "bottom top",
    onEnter: () => lenis.update(),
    onLeaveBack: () => lenis.update(),
});

document.querySelector('.back-to-top a').addEventListener('click', function(event) {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

gsap.to(".pin", {
    scrollTrigger: {
        trigger: "#about",
        start: "top 30%",
        end: "bottom bottom",
        pin: ".pin",
        pinSpacing: false
    }
});

document.querySelectorAll('.work-item').forEach(item => {
    item.addEventListener('click', () => {
        const url = item.getAttribute('data-url');
        window.location.href = url;
    });
});

document.addEventListener('mousemove', function (e) {
    const about = document.getElementById('about');
    const experience = document.getElementById('experience');
    const effectElements = [about, experience];
    
    effectElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        el.style.setProperty('--x', `${x}px`);
        el.style.setProperty('--y', `${y}px`);
    });
});

const blob = document.querySelector('.blob');
blob.style.position = 'fixed';
window.addEventListener('mousemove', moveBlob);

function moveBlob(e) {
    const { clientX, clientY } = e;
    gsap.to(blob, {
        top: clientY,
        left: clientX,
        duration: 2,
        ease: "power2.out"
    });
}

document.querySelectorAll('header nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav ul li a");

sections.forEach(section => {
    ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveNav(section.id),
        onEnterBack: () => setActiveNav(section.id),
    });
});

function setActiveNav(sectionId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.querySelector(`header nav ul li a[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

const lenis = new Lenis()

lenis.on('scroll', (e) => {
  console.log(e)
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

const mobileBreakpoint = 1024;

function updateAnimation() {
    if (window.innerWidth <= mobileBreakpoint) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        gsap.set(".left-fixed", { clearProps: "all" });
        gsap.set("#about .right-scrollable", { clearProps: "all" });
        gsap.set("#about .right-scrollable", { x: 0 });
        gsap.set(".work-item", { opacity: 0.8 });
    } else {
        gsap.utils.toArray("#about .right-scrollable").forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: "#about",
                    start: "top 95%",
                    end: "bottom top",
                    scrub: true,
                }
            });
        });
    }
}

window.addEventListener("load", updateAnimation);
window.addEventListener("resize", updateAnimation);
