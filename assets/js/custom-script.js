(function () {
    function animateCounter(counter) {
        var target = Number(counter.textContent.replace(/[^0-9.-]/g, ''));
        var duration = 1200;
        var startTime = null;

        if (!Number.isFinite(target) || counter.dataset.countStarted) return;

        counter.dataset.countStarted = 'true';

        function update(timestamp) {
            if (!startTime) startTime = timestamp;

            var progress = Math.min((timestamp - startTime) / duration, 1);
            counter.textContent = Math.ceil(target * progress);

            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    function initialiseCounters() {
        var counters = document.querySelectorAll('.count');

        if (!counters.length) return;

        if (!('IntersectionObserver' in window)) {
            counters.forEach(animateCounter);
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '150px 0px' });

        counters.forEach(function (counter) {
            observer.observe(counter);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialiseCounters, { once: true });
    } else {
        initialiseCounters();
    }
}());
