document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Sistema de Filtro dos Pilares
    const filterButtons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove classe ativa de todos e adiciona no clicado
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const target = button.getAttribute("data-target");

            cards.forEach(card => {
                const category = card.getAttribute("data-category");
                
                if (target === "all" || category === target) {
                    card.style.display = "block";
                    setTimeout(() => card.style.opacity = "1", 50);
                } else {
                    card.style.opacity = "0";
                    setTimeout(() => card.style.display = "none", 300);
                }
            });
        });
    });

    // 2. Animação de Contadores Numéricos (Gatilho ao rolar a página)
    const counters = document.querySelectorAll(".number");
    const speed = 50; 

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute("data-count");
                const count = +counter.innerText;
                const increment = Math.ceil(target / speed);

                if (count < target) {
                    counter.innerText = count + increment;
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Ativa os contadores apenas quando a seção estiver visível na tela
    const statsSection = document.querySelector(".stats");
    const options = { root: null, threshold: 0.5 };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                startCounters();
                observer.unobserve(entry.target);
            }
        });
    }, options);

    observer.observe(statsSection);
});
