/*
Copyright (c) 2024 Juna Han
Licensed under MIT License - see LICENSE file for details
*/
// Side text functionality
document.addEventListener('DOMContentLoaded', function() {
    const sideTexts = document.querySelectorAll('.side-text, .side-text-right');
    const introGrid = document.querySelector('.intro-grid');
    
    if (introGrid) {  // Only run this code if introGrid exists
        const offset = 300;
        const initialTop = 189;
        const stickPoint = introGrid.offsetTop + introGrid.offsetHeight - offset;
        const absoluteTop = stickPoint + initialTop;

        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            
            if (scrollPosition > stickPoint) {
                sideTexts.forEach(text => {
                    text.style.position = 'absolute';
                    text.style.top = `${absoluteTop}px`;
                });
            } else {
                sideTexts.forEach(text => {
                    text.style.position = 'fixed';
                    text.style.top = `${initialTop}px`;
                });
            }
        });
    }
});

// Project title hover functionality
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    const projectsTitle = document.getElementById('projects-title');
    
    if (projectsTitle) {  // Only run this code if projectsTitle exists
        const defaultText = projectsTitle.textContent;

        console.log('Found cards:', projectCards.length);
        console.log('Found title:', projectsTitle);
        console.log('Default text:', defaultText);

        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                console.log('Mouse enter:', this.dataset.projectName);
                projectsTitle.textContent = this.dataset.projectName;
            });

            card.addEventListener('mouseleave', function() {
                console.log('Mouse leave');
                projectsTitle.textContent = defaultText;
            });
        });
    }
});

// About title hover functionality
document.addEventListener('DOMContentLoaded', function() {
    const aboutCard = document.querySelector('.about-card');
    const aboutTitle = document.getElementById('about-title');
    
    if (aboutTitle && aboutCard) {
        const defaultText = aboutTitle.textContent;

        aboutCard.addEventListener('mouseenter', function() {
            aboutTitle.textContent = this.dataset.aboutText;
        });

        aboutCard.addEventListener('mouseleave', function() {
            aboutTitle.textContent = defaultText;
        });
    }
});

// P5.js sketch (only if p5 is loaded)
if (typeof p5 !== 'undefined') {
    let sketch = function(p) {
        p.setup = function() {
            let container = document.getElementById('sketch-holder');
            // Make canvas larger than container
            let canvas = p.createCanvas(container.offsetWidth * 1.5, container.offsetHeight * 1.5);
            canvas.style('background-color', 'transparent');
            canvas.style('mix-blend-mode', 'overlay');
            // Center the larger canvas
            canvas.position(-container.offsetWidth * 0.25, -container.offsetHeight * 0.25);
        }

        p.draw = function() {
            p.clear(0, 0, 0, 0);
            
            p.push();
            // Center the drawing in the larger canvas
            p.translate(p.width/2, p.height/2);
            
            for(let i = 0; i < 300; i++) {
                let radius = i * 1;
                let angle = i * p.mouseY * 0.025;
                
                let pos = p.createVector(radius, 0);
                pos.rotate(p.radians(angle));
                
                p.push();
                p.translate(pos.x, pos.y);
                p.fill(255, 255, 255);
                p.ellipse(0, 0, 10, 10);
                p.pop();
            }
            
            p.pop();
        }
    }
    new p5(sketch, 'sketch-holder');
}