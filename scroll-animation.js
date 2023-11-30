

hiddenElements.forEach((el) => observer.observe(el));

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('hidden');
        }
        else
        {
        
            entry.target.classList.add('hidden');
        }


    });

});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

