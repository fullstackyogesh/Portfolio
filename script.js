// <!-- ======= PRELOADER START ======= -->
// <!-- ======= PRELOADER START ======= -->
// <!-- ======= PRELOADER START ======= -->
document.addEventListener("DOMContentLoaded", () => {
    // Get elements
    const counter = document.getElementById("counter");
    const progress = document.querySelector(".progress");
    const messages = document.querySelectorAll(".message");
    const markers = document.querySelectorAll(".marker");
    const blocks = document.querySelectorAll(".block");

    // Get connector lines
    const line0to25 = document.getElementById("line-0-25");
    const line25to50 = document.getElementById("line-25-50");
    const line50to75 = document.getElementById("line-50-75");
    const line75to100 = document.getElementById("line-75-100");

    // Get grid elements
    const topRow = document.getElementById("top-row");
    const bottomRow = document.getElementById("bottom-row");
    const leftColumn = document.getElementById("left-column");
    const rightColumn = document.getElementById("right-column");

    // Create pixel grid
    createPixelGrid();

    // Split text using SplitType
    const contentTitle = new SplitType(".content h1", { types: "chars" });
    const contentText = new SplitType(".content p", { types: "chars" });

    // Initialize counter animation
    let currentCount = 0;
    let targetCount = 0;
    let lastMessageIndex = 0;

    // Generate pixel grid
    function createPixelGrid() {
        // Generate pixels in rows and columns if needed
        // For a more minimalist approach, we're using full lines instead
    }

    // Animation function for progress
    function animateProgress() {
        // const duration = 5; // Total loading time in seconds
        const duration = 3; // Total loading time in seconds

        gsap.to(
            {},
            {
                duration: duration,
                onUpdate: updateProgress,
                ease: "power1.inOut"
            }
        );
    }

    // Update progress function
    function updateProgress() {


        // Update counter target
        // targetCount = progress;
        const counterProgress = Math.min(10, Math.floor(this.progress() * 10)); // Limit counter to 10
        targetCount = counterProgress;

        // Calculate progress based on timeline progress
        const progress = Math.floor(this.progress() * 100);

        // Update UI
        updateCounter();
        updateProgressBar(progress);
        updateSystemMessages(progress);
        updateConnectorLines(progress);
        updateBlocks(progress);
        updateGridLines(progress);

        // Handle completion
        if (progress >= 100) {
            setTimeout(completeLoading, 800);
        }
    }

    // Update counter with mechanical effect
    function updateCounter() {
        if (currentCount !== targetCount) {
            // Determine step size based on gap
            const gap = targetCount - currentCount;
            const step = gap > 10 ? 2 : 1;

            currentCount =
                gap > 0 ? Math.min(targetCount, currentCount + step) : targetCount;
            // counter.textContent = currentCount;
            counter.textContent = currentCount.toString().padStart(2, "0");

            // If not at target, schedule next update
            if (currentCount !== targetCount) {
                setTimeout(updateCounter, 40);
            }
        }
    }

    // Update progress bar
    function updateProgressBar(progress) {
        document.querySelector(".progress").style.width = `${progress}%`;

        // Update marker opacity based on progress
        markers.forEach((marker) => {
            const position = parseInt(marker.getAttribute("data-position"));
            if (progress >= position) {
                marker.style.opacity = 1;
            } else {
                marker.style.opacity = 0.6;
            }
        });
    }

    // Update connector lines based on progress
    function updateConnectorLines(progress) {
        // Scale connector lines based on progress
        if (progress >= 0) {
            const scale0to25 = Math.min(1, (progress - 0) / 25);
            line0to25.style.transform = `scaleX(${scale0to25})`;
        }

        if (progress >= 25) {
            const scale25to50 = Math.min(1, (progress - 25) / 25);
            line25to50.style.transform = `scaleX(${scale25to50})`;
        }

        if (progress >= 50) {
            const scale50to75 = Math.min(1, (progress - 50) / 25);
            line50to75.style.transform = `scaleX(${scale50to75})`;
        }

        if (progress >= 75) {
            const scale75to100 = Math.min(1, (progress - 75) / 25);
            line75to100.style.transform = `scaleX(${scale75to100})`;
        }
    }

    // Update system messages based on progress
    function updateSystemMessages(progress) {
        let activeIndex = Math.min(4, Math.floor(progress / 20));

        // Only update if changed
        if (activeIndex !== lastMessageIndex) {
            // Hide all messages
            messages.forEach((message) => {
                message.classList.remove("active");
            });

            // Show current message
            messages[activeIndex].classList.add("active");

            // Simulate terminal printing effect
            if (activeIndex < messages.length) {
                simulateTyping(messages[activeIndex]);
            }

            lastMessageIndex = activeIndex;
        }
    }

    // Update blocks based on progress
    function updateBlocks(progress) {
        // Scale blocks based on progress thresholds
        if (progress >= 20) {
            blocks[0].style.transform = `scale(${Math.min(1, (progress - 20) / 20)})`;
        }

        if (progress >= 40) {
            blocks[1].style.transform = `scale(${Math.min(1, (progress - 40) / 20)})`;
        }

        if (progress >= 60) {
            blocks[2].style.transform = `scale(${Math.min(1, (progress - 60) / 20)})`;
        }

        if (progress >= 80) {
            blocks[3].style.transform = `scale(${Math.min(1, (progress - 80) / 20)})`;
        }
    }

    // Update grid lines based on progress
    function updateGridLines(progress) {
        // Extend lines based on progress
        topRow.style.width = `${progress}%`;
        bottomRow.style.width = `${progress}%`;
        leftColumn.style.height = `${progress}%`;
        rightColumn.style.height = `${progress}%`;
    }

    // Simulate typing effect for terminal-like messages
    function simulateTyping(element) {
        const text = element.textContent;
        element.textContent = "";
        element.style.display = "block";

        let i = 0;
        const typeNextChar = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeNextChar, 30);
            }
        };

        typeNextChar();
    }

    // Complete loading animation
    function completeLoading() {
        // Create minimal transition effect
        const completionTl = gsap.timeline();

        completionTl
            // Slide away loader with clean transition
            .to(".preloader", {
                y: "-100%",
                duration: 1,
                ease: "power2.inOut"
            })
            // Show content
            .set(".content", {
                visibility: "visible"
            })
            .to(".content", {
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
            })
            // Clean reveal of content
            .to([contentTitle.chars, contentText.chars], {
                opacity: 1,
                y: 0,
                stagger: 0.02,
                duration: 0.4,
                ease: "power1.out",
                onStart: () => {
                    // Initially position all chars up
                    gsap.set([contentTitle.chars, contentText.chars], {
                        opacity: 0,
                        y: 30
                    });
                }
            })
            // Hide preloader
            .set(".preloader", {
                display: "none"
            });
    }

    // Add pixel animation for progress indication
    function animatePixels() {
        // For minimalist approach, we're using grid lines instead
        // This function is kept for potential future enhancements
    }

    // Generate random digits for counter
    function randomDigits() {
        return Math.floor(Math.random() * 100);
    }

    // Start animations
    animateProgress();

    // Handle window resize
    window.addEventListener("resize", () => {
        // Recalculate layout if needed
    });
});
// <!-- ======= PRELOADER -END- ======= -->
// <!-- ======= PRELOADER -END- ======= -->
// <!-- ======= PRELOADER -END- ======= -->




// <!-- ======= HEADER-SERVICE START ======= -->
// <!-- ======= HEADER-SERVICE START ======= -->
// <!-- ======= HEADER-SERVICE START ======= -->
let menuIcon = document.querySelector('#menu_icon');
let menu = document.querySelector("#menu-bar");
let menuBtn = document.querySelector('#menu_btn');

menuIcon.onclick = () => {
    menu.classList.toggle('show_menu')
    menuIcon.classList.toggle('show_icon')
    menuBtn.classList.toggle('fa-xmark')
}


const services = document.querySelectorAll('.tf_single_service');

services.forEach(service => {
    service.onmouseover = () => {
        // Remove 'active' from all
        services.forEach(s => s.classList.remove('active'));
        // Add 'active' to the current one
        service.classList.add('active');
    };
});
// <!-- ======= HEADER-SERVICE -END- ======= -->
// <!-- ======= HEADER-SERVICE -END- ======= -->
// <!-- ======= HEADER-SERVICE -END- ======= -->




// <!-- ======= HEADER-NAV-BUTTON START ======= -->
// <!-- ======= HEADER-NAV-BUTTON START ======= -->
// <!-- ======= HEADER-NAV-BUTTON START ======= -->
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("nav li a");
    const sections = document.querySelectorAll("section");

    // CLICK: Add active class on nav link when clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active"); // add to clicked one
        });
    });

    // SCROLL: Add active class on nav link based on scroll position
    window.addEventListener('scroll', function () {
        let current = "";
        const scrollY = window.scrollY + 150; // offset for sticky nav or smooth effect

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });
});
// <!-- ======= HEADER-NAV-BUTTON -END- ======= -->
// <!-- ======= HEADER-NAV-BUTTON -END- ======= -->
// <!-- ======= HEADER-NAV-BUTTON -END- ======= -->




// <!-- ======= SKILLS-ANIMATION START ======= -->
// <!-- ======= SKILLS-ANIMATION START ======= -->
// <!-- ======= SKILLS-ANIMATION START ======= -->
document.addEventListener("DOMContentLoaded", function () {
    const bars = document.querySelectorAll(".barfiller");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector(".fill");
                const tip = entry.target.querySelector(".tip");

                if (fill && !fill.classList.contains("animated")) {
                    const target = parseInt(fill.getAttribute("data-percentage"));
                    fill.style.width = target + "%";
                    fill.classList.add("animated");

                    // Animate tip count
                    let count = 0;
                    const step = Math.ceil(target / 30);
                    const interval = setInterval(() => {
                        if (count >= target) {
                            tip.textContent = target + "%";
                            clearInterval(interval);
                        } else {
                            count += step;
                            tip.textContent = count + "%";
                        }
                    }, 30);
                }
            }
        });
    }, {
        threshold: 0.4
    });

    bars.forEach(bar => observer.observe(bar));
});
// <!-- ======= SKILLS-ANIMATION -END- ======= -->
// <!-- ======= SKILLS-ANIMATION -END- ======= -->
// <!-- ======= SKILLS-ANIMATION -END- ======= -->




// <!-- ======= SKILLS-BUTTON START ======= -->
// <!-- ======= SKILLS-BUTTON START ======= -->
// <!-- ======= SKILLS-BUTTON START ======= -->
let tabButtons = [
    document.querySelector("#pills-home-tab"),
    document.querySelector("#pills-profile-tab"),
    //document.querySelector("#pills-contact-tab"),
    document.querySelector("#pills-disabled-tab")
];

let tabContents = [
    document.querySelector("#pills-home"),
    document.querySelector("#pills-profile"),
    //document.querySelector("#pills-contact"),
    //document.querySelector("#pills-disabled")
];

function activateTab(activeTab, allTabs, activeBtn, allBtns) {
    allTabs.forEach(tab => tab.classList.remove('show', 'active'));
    allBtns.forEach(btn => btn.classList.remove('active'));

    activeTab.classList.add('show', 'active');
    activeBtn.classList.add('active');
}

// Event listeners for buttons
tabButtons[0].onclick = () => activateTab(tabContents[0], tabContents, tabButtons[0], tabButtons);
tabButtons[1].onclick = () => activateTab(tabContents[1], tabContents, tabButtons[1], tabButtons);
tabButtons[2].onclick = () => activateTab(tabContents[0], tabContents, tabButtons[2], tabButtons);
//tabButtons[2].onclick = () => activateTab(tabContents[2], tabContents, tabButtons[2], tabButtons);
// <!-- ======= SKILLS-BUTTON -END- ======= -->
// <!-- ======= SKILLS-BUTTON -END- ======= -->
// <!-- ======= SKILLS-BUTTON -END- ======= -->




// <!-- ======= SCROLL-UP-PROGRESS-BUTTON START ======= -->
// <!-- ======= SCROLL-UP-PROGRESS-BUTTON START ======= -->
// <!-- ======= SCROLL-UP-PROGRESS-BUTTON START ======= -->
document.addEventListener("DOMContentLoaded", function (event) {

    let offset = 50;
    let circleContainer = document.querySelector(".circle-container");
    let circlePath = document.querySelector('.circle-container path');
    let pathLength = circlePath.getTotalLength();
    circlePath.style.transition = circlePath.style.WebkitTransition = 'none';
    circlePath.style.strokeDasharray = pathLength;
    circlePath.style.strokeDashoffset = pathLength;
    circlePath.getBoundingClientRect();
    circlePath.style.transition = circlePath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

    let updateLoader = () => {

        let scrollTop = window.scrollY;
        let docHeight = document.body.offsetHeight;
        let winHeight = window.innerHeight;
        let height = docHeight - winHeight;
        let progress = pathLength - (scrollTop * pathLength / height);
        circlePath.style.strokeDashoffset = progress;

        if (scrollTop > offset) {
            circleContainer.classList.add("active");
        }
        else {
            circleContainer.classList.remove("active");
        }

    }

    circleContainer.onclick = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.onscroll = () => {
        updateLoader();
    }

    updateLoader();

});
// <!-- ======= SCROLL-UP-PROGRESS-BUTTON -END- ======= -->
// <!-- ======= SCROLL-UP-PROGRESS-BUTTON -END- ======= -->
// <!-- ======= SCROLL-UP-PROGRESS-BUTTON -END- ======= -->




// <!-- ======= MAGIC-CURSOR START ======= -->
// <!-- ======= MAGIC-CURSOR START ======= -->
// <!-- ======= MAGIC-CURSOR START ======= -->
const rings = document.querySelectorAll('.ring');
const cursor = document.getElementById('cursor');
const links = document.querySelectorAll('a, button');

window.addEventListener('mousemove', (e) => {
    rings.forEach(ring => {
        ring.style.transform = `translateX(${e.clientX - 20}px) translateY(${e.clientY - 20}px)`;
    });
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-zoom');
    });
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-zoom');
    });
});
// <!-- ======= MAGIC-CURSOR -END- ======= -->
// <!-- ======= MAGIC-CURSOR -END- ======= -->
// <!-- ======= MAGIC-CURSOR -END- ======= -->






// <!-- ======= SECTION-CONTAINER-ANIMATION -END- ======= -->
// <!-- ======= SECTION-CONTAINER-ANIMATION -END- ======= -->
// <!-- ======= SECTION-CONTAINER-ANIMATION -END- ======= -->
document.addEventListener("DOMContentLoaded", function () {
    // Define all animation groups and their corresponding box classes
    const animationGroups = [
        { containerClass: '.contact-animation', boxClass: '.contact-animation-box' },
        { containerClass: '.service-animation', boxClass: '.service-animation-box' },
        { containerClass: '.blog-animation', boxClass: '.blog-animation-box' },
        { containerClass: '.skills-animation', boxClass: '.skills-animation-box' },
        { containerClass: '.about-animation', boxClass: '.about-animation-box' },
        { containerClass: '.milestone-animation', boxClass: '.milestone-animation-box' },
        { containerClass: '.portfolio-animation', boxClass: '.portfolio-animation-box' }
    ];

    const observerOptions = {
        threshold: 0.3
    };

    animationGroups.forEach(group => {
        const container = document.querySelector(group.containerClass);
        if (!container) return;

        const boxes = container.querySelectorAll(group.boxClass);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    boxes.forEach((box, index) => {
                        setTimeout(() => {
                            box.classList.add("visible");
                        }, index * 500); // 0.5s delay between each box
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(container);
    });
});
// <!-- ======= HSECTION-CONTAINER-ANIMATION START ======= -->
// <!-- ======= HSECTION-CONTAINER-ANIMATION START ======= -->
// <!-- ======= HSECTION-CONTAINER-ANIMATION START ======= -->







// <!-- ======= H2-H5-HEADING START ======= -->
// <!-- ======= H2-H5-HEADING START ======= -->
// <!-- ======= H2-H5-HEADING START ======= -->
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            if (entry.target.classList.contains('letter-animate')) {
                const rawText = entry.target.textContent.trim().replace(/\s+/g, ' ');
                const words = rawText.split(' ');
                entry.target.innerHTML = '';

                let letterIndex = 0; // Start from 0 and count through all letters

                words.forEach((word, wordIndex) => {
                    const wordSpan = document.createElement('span');
                    // RECOGNITION word ko green class do
                    if (word === "RECOGNITION") {
                        wordSpan.className = "word gr-word";
                    } else {
                        wordSpan.className = "word";
                    }
                    wordSpan.style.whiteSpace = 'nowrap';

                    [...word].forEach((char) => {
                        const span = document.createElement('span');
                        span.className = 'letter';
                        span.textContent = char;
                        span.style.animationDelay = `${letterIndex * 0.05}s`;
                        span.style.display = 'inline-block';
                        wordSpan.appendChild(span);
                        letterIndex++; // Increase for each letter
                    });

                    entry.target.appendChild(wordSpan);

                    // Add space between words
                    if (wordIndex < words.length - 1) {
                        entry.target.appendChild(document.createTextNode('\u00A0'));
                        letterIndex++; // Count the space as a delay step
                    }
                });
            }

            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.has-animation').forEach(el => observer.observe(el));
// <!-- ======= H2-H5-HEADING -END- ======= -->
// <!-- ======= H2-H5-HEADING -END- ======= -->
// <!-- ======= H2-H5-HEADING -END- ======= -->




// <!-- ======= CONTACT-FORM START ======= -->
// <!-- ======= CONTACT-FORM START ======= -->
// <!-- ======= CONTACT-FORM START ======= -->
var form = document.getElementById("my-form");

async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "Thanks for your submission!";
            form.reset()
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                } else {
                    status.innerHTML = "Oops! There was a problem submitting your form"
                }
            })
        }
    }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
    });
}
form.addEventListener("submit", handleSubmit)
// <!-- ======= CONTACT-FORM -END- ======= -->
// <!-- ======= CONTACT-FORM -END- ======= -->
// <!-- ======= CONTACT-FORM -END- ======= -->





// <!-- ======= WHATSAPP-CONTACT START ======= -->
// <!-- ======= WHATSAPP-CONTACT START ======= -->
// <!-- ======= WHATSAPP-CONTACT START ======= -->
document.addEventListener('DOMContentLoaded', function () {
    var link = document.getElementById('whatsapp-link');
    var phone = "919671491680";
    var isMobile = /iPhone|Android|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        // Mobile: open WhatsApp app or wa.me fallback
        link.href = "https://wa.me/" + phone;
    } else {
        // Desktop: on click, try whatsapp://, fallback to web.whatsapp.com
        link.href = "#";+

        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Try to open WhatsApp Desktop app
            window.location.href = "whatsapp://send?phone=" + phone;

            // After 1.5 seconds, fallback to WhatsApp Web
            setTimeout(function () {
                window.open("https://web.whatsapp.com/send?phone=" + phone, "_blank");
            }, 1500);
        });
    }
});
// <!-- ======= WHATSAPP-CONTACT -END- ======= -->
// <!-- ======= WHATSAPP-CONTACT -END- ======= -->
// <!-- ======= WHATSAPP-CONTACT -END- ======= -->
