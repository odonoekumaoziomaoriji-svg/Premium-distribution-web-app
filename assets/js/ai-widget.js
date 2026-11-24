(function () {
    var currentScript = document.currentScript;
    if (currentScript) {
        var stylesheet = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = currentScript.src.replace('/js/ai-widget.js', '/css/ai-widget.css');
        document.head.appendChild(stylesheet);
    }

    function getReply(question, contactUrl) {
        var text = question.toLowerCase();
        if (text.indexOf('solution') > -1 || text.indexOf('service') > -1) {
            return 'We offer GRC, network monitoring, application security testing, IT operations, identity and access management, endpoint and mobile device management, application delivery networking, and privileged access management.';
        }
        if (text.indexOf('contact') > -1 || text.indexOf('expert') > -1 || text.indexOf('quote') > -1 || text.indexOf('price') > -1) {
            return 'Our team can help with your enquiry. <a class="pd-ai-contact" href="' + contactUrl + '">Contact an expert</a>.';
        }
        if (text.indexOf('partner') > -1 || text.indexOf('vendor') > -1) {
            return 'We work with leading technology vendors across cybersecurity, infrastructure and digital transformation.';
        }
        return 'I can help you explore our solutions, connect with an expert, or answer questions about our technology partners.';
    }

    function init() {
        var contactUrl = window.location.pathname.toLowerCase().indexOf('/pages/') > -1 ? 'contact.html' : 'pages/contact.html';
        var widget = document.createElement('div');
        widget.className = 'pd-ai-widget';
        widget.innerHTML = '<div class="pd-ai-panel" role="dialog" aria-label="Premium Distribution assistant">' +
            '<div class="pd-ai-header"><div><strong><i class="fas fa-robot"></i> Premium AI Assistant</strong><small>Online</small></div><button class="pd-ai-close" type="button" aria-label="Close assistant">&times;</button></div>' +
            '<div class="pd-ai-body"><p class="pd-ai-message">Hello! How can I help you today?</p>' +
            '<div class="pd-ai-quick"><button type="button" data-question="What solutions do you offer?">Find a solution</button><button type="button" data-question="I need to contact an expert">Talk to an expert</button><button type="button" data-question="Tell me about your vendors">Our vendors</button></div>' +
            '<form class="pd-ai-form"><input type="text" aria-label="Ask the assistant" placeholder="Ask a question..."><button type="submit">Send</button></form></div></div>' +
            '<button class="pd-ai-hint" type="button" aria-label="Open Premium AI assistant"><i class="fas fa-robot"></i><span class="pd-ai-hint-full">Ask Premium AI</span><span class="pd-ai-hint-short">Ask AI</span></button>' +
            '<button class="pd-ai-toggle" type="button" aria-label="Open AI assistant" aria-expanded="false"><span class="pd-ai-toggle-emoji" aria-hidden="true">&#129302;</span><i class="fas fa-comment-dots" aria-hidden="true"></i></button>';
        document.body.appendChild(widget);

        var message = widget.querySelector('.pd-ai-message');
        var toggle = widget.querySelector('.pd-ai-toggle');
        var hint = widget.querySelector('.pd-ai-hint');
        function togglePanel(show) {
            widget.classList.toggle('is-open', show);
            toggle.setAttribute('aria-expanded', show ? 'true' : 'false');
        }
        toggle.addEventListener('click', function () { togglePanel(!widget.classList.contains('is-open')); });
        hint.addEventListener('click', function () { togglePanel(true); });
        widget.querySelector('.pd-ai-close').addEventListener('click', function () { togglePanel(false); });
        widget.querySelectorAll('[data-question]').forEach(function (button) {
            button.addEventListener('click', function () { message.innerHTML = getReply(button.dataset.question, contactUrl); });
        });
        widget.querySelector('.pd-ai-form').addEventListener('submit', function (event) {
            event.preventDefault();
            var input = widget.querySelector('input');
            if (input.value.trim()) { message.innerHTML = getReply(input.value, contactUrl); input.value = ''; }
        });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
}());
