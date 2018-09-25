document.addEventListener('DOMContentLoaded', (event) => {

// 	window.addEventListener("scroll", function () {
    
// });
// 		let scrollDiv = document.getElementById('scroll');
// 		scrollDiv.addEventListener('scroll', (event) => {
// 			let scrollDivStyle = scrollDiv.currentStyle || window.getComputedStyle(scrollDiv);
// 			console.log("current Margin: ", scrollDivStyle);
// 		});
    let lazyImages = [].slice.call(document.querySelectorAll('img.lazyLoad'));
	if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
	  let lazyImageObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
		  if (entry.isIntersecting) {
            let lazyImage = entry.target;
            lazyImage.srcset = lazyImage.dataset.srcset;
			lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove('lazyLoad');
            
            lazyImageObserver.unobserve(lazyImage);
		  }
		});
	  });
  
	  lazyImages.forEach((lazyImage) => {
		lazyImageObserver.observe(lazyImage);
	  });
	}
})