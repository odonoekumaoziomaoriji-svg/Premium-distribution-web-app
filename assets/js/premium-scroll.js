(function(){
  var selectors='.about-us-section-start .about-us-content,.cyber-security-section .cyber-content,.cyber-security-section .cyber-content-img,.client-slider-sec .content-wrapper,.reference-home [data-reveal]';
  var elements=document.querySelectorAll(selectors);
  elements.forEach(function(element){element.classList.add('premium-reveal');});
  if(!('IntersectionObserver' in window)){elements.forEach(function(element){element.classList.add('is-visible');});return;}
  var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});},{threshold:.16});
  elements.forEach(function(element){observer.observe(element);});
}());