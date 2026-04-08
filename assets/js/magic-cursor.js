/**
 * Magic Cursor — 14px dot that follows mouse with GSAP easing.
 * Expands on links/buttons. Shows text from [data-cursor] attribute.
 * Hidden on touch devices.
 */
(function () {
	if (typeof gsap === 'undefined') return;
	const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
	if (isTouchDevice) return;

	// Create cursor DOM
	const wrapper = document.createElement('div');
	wrapper.id = 'magic-cursor';
	wrapper.style.cssText = 'position:absolute;z-index:99999;pointer-events:none;';

	const ball = document.createElement('div');
	ball.id = 'ball';
	ball.style.cssText =
		'position:fixed;width:14px;height:14px;border-radius:50%;' +
		'background-color:#f9f4e8;transform:translate(-50%,-50%);' +
		'pointer-events:none;will-change:transform;' +
		'transition:width 0.3s,height 0.3s,background-color 0.3s,border 0.3s;';

	wrapper.appendChild(ball);
	document.body.appendChild(wrapper);
	document.body.classList.add('has-magic-cursor');

	// Mouse tracking
	const mouse = { x: -100, y: -100 };
	const pos = { x: -100, y: -100 };
	const ratio = 0.2;

	document.addEventListener('mousemove', (e) => {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	});

	gsap.ticker.add(() => {
		pos.x += (mouse.x - pos.x) * ratio;
		pos.y += (mouse.y - pos.y) * ratio;
		gsap.set(ball, { x: pos.x, y: pos.y });
	});

	// Hover expand on interactive elements
	function bindHovers() {
		document.querySelectorAll('a, button').forEach((el) => {
			if (el.dataset.cursorBound) return;
			el.dataset.cursorBound = '1';
			el.addEventListener('mouseenter', () => {
				ball.style.width = '50px';
				ball.style.height = '50px';
				ball.style.backgroundColor = 'transparent';
				ball.style.border = '1px solid rgba(249,244,232,0.3)';
			});
			el.addEventListener('mouseleave', () => {
				ball.style.width = '14px';
				ball.style.height = '14px';
				ball.style.backgroundColor = '#f9f4e8';
				ball.style.border = 'none';
			});
		});
	}
	bindHovers();

	// Data-cursor text display (e.g. "View Demo" on portfolio)
	document.querySelectorAll('[data-cursor]').forEach((el) => {
		el.addEventListener('mouseenter', () => {
			const viewDiv = document.createElement('div');
			viewDiv.className = 'ball-view';
			viewDiv.style.cssText =
				"font-family:'Inter',sans-serif;font-weight:600;font-size:0.8125rem;" +
				'text-align:center;line-height:1.3;color:#000;pointer-events:none;position:absolute;';
			viewDiv.innerHTML = el.getAttribute('data-cursor');
			ball.appendChild(viewDiv);
			ball.style.display = 'flex';
			ball.style.alignItems = 'center';
			ball.style.justifyContent = 'center';
			ball.style.backdropFilter = 'blur(14px)';
			gsap.to(ball, {
				duration: 0.3, width: 110, height: 110, opacity: 1,
				borderWidth: 0, backgroundColor: '#fff',
			});
			gsap.fromTo(viewDiv, { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3 });
		});
		el.addEventListener('mouseleave', () => {
			gsap.to(ball, {
				duration: 0.3, width: 14, height: 14,
				backgroundColor: '#f9f4e8',
			});
			const viewDiv = ball.querySelector('.ball-view');
			if (viewDiv) {
				gsap.to(viewDiv, {
					scale: 0, autoAlpha: 0, duration: 0.3,
					onComplete: () => {
						viewDiv.remove();
						ball.style.display = '';
						ball.style.backdropFilter = '';
					},
				});
			}
		});
	});

	// Hide/show on window leave/enter
	document.addEventListener('mouseleave', () => gsap.to(ball, { opacity: 0, duration: 0.2 }));
	document.addEventListener('mouseenter', () => gsap.to(ball, { opacity: 1, duration: 0.2 }));

	// Re-bind hovers when DOM changes (e.g. Gutenberg editor adds elements)
	window.__magicCursorRebind = bindHovers;
})();
