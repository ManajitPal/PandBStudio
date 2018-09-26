const projectNames = ['1', '2', '3'];
/**
 * Load all the functions once DOM tree is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {

	/**
	 * Dynamically add margin Bottom to main from Footer height.
	 */
	const footer = document.getElementsByTagName('footer');
	let main = document.getElementsByTagName('main');
	main[0].style.marginBottom = getComputedStyle(footer[0]).height; 

	/**
	 * Dynamically add project list.
	 */
	const ul = document.getElementById('project-container');
	projectNames.forEach((projectName) => {
		ul.append(createProjectList(projectName));
	});

	/**
	 * Calling LazyLoad and Polyfill
	 */
	LazyLoadImages();
	cssScrollSnapPolyfill();

});

createProjectList = (projectName) => {

	const li = document.createElement('li');

	const a = document.createElement('a');
	a.href = `https://google.com/${projectName}`;
	a.setAttribute('target','_blank');
	a.setAttribute('aria-label',`Link to project ${projectName}`);

	const img = document.createElement('img');
	img.className = 'lazyLoad';
	img.alt = `Image for project ${projectName}`;
	img.src = 'data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
	img.srcset = 'data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
	img.setAttribute('data-src',`img/Project${projectName}/${projectName}.webp`);
	img.setAttribute('data-srcset',`img/Project${projectName}/${projectName}@2x.webp 2x, img/Project${projectName}/${projectName}@3x.webp 3x`);

	a.appendChild(img);
	li.append(a);

	return li;

};

LazyLoadImages = () => {

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

}
