document.addEventListener("DOMContentLoaded",e=>{const t=document.getElementsByTagName("footer");document.getElementsByTagName("main")[0].style.marginBottom=getComputedStyle(t[0]).height;const a=document.getElementById("project-container");["1","2","3"].forEach(e=>{a.append(createProjectList(e))}),LazyLoadImages(),cssScrollSnapPolyfill()}),createProjectList=(e=>{const t=document.createElement("li"),a=document.createElement("a");a.href=`https://google.com/${e}`,a.setAttribute("target","_blank"),a.setAttribute("aria-label",`Link to project ${e}`);const r=document.createElement("img");return r.className="lazyLoad",r.alt=`Image for project ${e}`,r.src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",r.srcset="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",r.setAttribute("data-src",`img/Project${e}/${e}.webp`),r.setAttribute("data-srcset",`img/Project${e}/${e}@2x.webp 2x, img/Project${e}/${e}@3x.webp 3x`),a.appendChild(r),t.append(a),t}),LazyLoadImages=(()=>{let e=[].slice.call(document.querySelectorAll("img.lazyLoad"));if("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype){let t=new IntersectionObserver((e,a)=>{e.forEach(e=>{if(e.isIntersecting){let a=e.target;a.srcset=a.dataset.srcset,a.src=a.dataset.src,a.classList.remove("lazyLoad"),t.unobserve(a)}})});e.forEach(e=>{t.observe(e)})}});