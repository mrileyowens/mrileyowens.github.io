/*
	Astral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$main = $('#main'),
		$panels = $main.children('.panel'),
		//$sections = $panels.children('section')
		$nav = $('nav'), $nav_links = $nav.children('a');

	// Breakpoints.
	breakpoints({
		xlarge:  [ '1281px',  '1680px' ],
		large:   [ '981px',   '1280px' ],
		medium:  [ '737px',   '980px'  ],
		small:   [ '361px',   '736px'  ],
		xsmall:  [ null,      '360px'  ]
	});

	// Play initial animations on page load.
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// When one of the nav bar anchors is clicked
	$nav_links
		.on('click', function(event) {

			// Get the href of the anchor
			var href = $(this).attr('href');

			// Not a panel link? Bail.
			if (href.charAt(0) != '#')
				//||	$panels.filter(href).length == 0)
				return;

			// Prevent default.
			event.preventDefault();
			event.stopPropagation();

			// If the anchor's href is not already the hash portion of the current URL
			if (window.location.hash != href)

				// Make the current URL's hash portion the href
				window.location.hash = href;

		});

	// Panels.

		// Initialize.
		(function() {

			var $panel, $section, $sections, $link;

			// If the URL has a hash portion
			if (window.location.hash) {

				// Get the panel that corresponds to the URL
				$panel = $panels.filter(window.location.hash.split('/')[0]);

				$sections = $panel.children('section')

				// Get the anchor of the nav bar that corresponds to the URL
				$link = $nav_links.filter('[href="' + window.location.hash + '"]');

				// If the panel has sections
				//if ($panel.children('section #' + window.location.hash.split('/')[0])) {
				if ($link.parent('nav.sub').length > 0) {

					// Get the section that corresponds to the URL
					$section = $sections.filter('#' + window.location.hash.split('/')[1])

				}

			}

			// No panel/link? Default to first.
			if (!$panel
			||	$panel.length == 0) {

				$panel = $panels.first();
				$link = $nav_links.first();

			}

			// If the anchor is part of the .main nav bar
			if ($link.parent('nav.main').length > 0) {

				// Deactivate all panels except this one
				$panels.not($panel)
					.addClass('inactive')
					.hide();

				// If the panel has sections
				if ($panel.children('section').length > 0) {

					// Deactivate any sections except the first
					$sections.not($sections.first())
						.addClass('inactive')
						.hide();

				}

			}

			// If the anchor is part of the .sub nav bar
			if ($link.parent('nav.sub').length > 0) {

				// Deactivate all the panels except this one
				$panels.not($panel)
					.addClass('inactive')
					.hide();

				// Deactivate all sections except this one
				$sections.not($section)
					.addClass('inactive')
					.hide();

				$('nav.main').children('a').filter('[href="' + $link.parent('nav.sub').children('a').first().attr('href') + '"]').addClass('active')

			}

			// Activate link.
			$link
				.addClass('active');

			// Reset scroll.
			$window.scrollTop(0);

		})();

		// When the hash portion of the URL changes
			$window.on('hashchange', function(event) {

				var $panel, $link, $sections, $section;

				// If the current URL has a hash portion
				if (window.location.hash) {

					// Get the panel that corresponds to the clicked anchor
				 	$panel = $panels.filter(window.location.hash.split('/')[0]);

					// Get the clicked anchor
					$link = $nav_links.filter('[href="' + window.location.hash + '"]');

					// Get all the sections that are children of the panel
					$sections = $panel.children('section')

					// If the panel has a .sub nav bar
					if ($panel.children('nav.sub').length > 0) {

						// Get all the sections that are children of the panel
						//$sections = $panel.children('section')

						// Get the section that corresponds to the clicked anchor
						$section = $sections.filter('#' + window.location.hash.split('/')[1])

					}

					// No target panel? Bail.
					if ($panel.length == 0)
						return;

				}

				// No panel/link? Default to first.
				else {

					$panel = $panels.first();
					$link = $nav_links.first();

				}

				// If the clicked anchor is in the .main nav bar
				if ($link.parent('nav.main').length > 0) {

					// Deactivate all panels.
					$panels.addClass('inactive');

					//$sections.addClass('inactive');

					// Deactivate all links.
					$nav_links.removeClass('active');

					// If the panel that corresponds to the clicked anchor has a .sub nav bar
					if ($panel.children('nav.sub').length > 0) {

						// Disable the sections
						$panel.children('section').addClass('inactive')

					}
				
				}

				// If the clicked anchor is in the .sub nav bar
				if ($link.parent('nav.sub').length > 0) {

					// Remove any active anchors from any .sub nav bar
					$('nav.sub').children('a').removeClass('active')

					// Disable the sections
					$sections.addClass('inactive');

				}

				//$sections.addClass('inactive');

				// Deactivate all links.
				//$nav_links.removeClass('active');

				// Activate target link.
				$link.addClass('active');

				// Set max/min height.
				$main
					.css('max-height', $main.height() + 'px')
					.css('min-height', $main.height() + 'px');

				// Delay.
				setTimeout(function() {

					// If the clicked anchor is in the .main nav bar
					if ($link.parent('nav.main').length > 0) {

						// Hide all panels.
						$panels.hide();

						// Show the panel that corresponds to the clicked anchor
						$panel.show();
					
						if ($panel.children('nav.sub').length > 0) {
							$sections.hide();
							$section.show();
						}

						else {
							$panel.children('section').show();
						}
					
					}

					// Show target panel.
					//$panel.show();

					if ($link.parent('nav.sub').length > 0) {

						$sections.hide();
						$section.show();

					}

					// Set new max/min height.
					$main
						.css('max-height', $panel.outerHeight() + 'px')
						.css('min-height', $panel.outerHeight() + 'px');

					// Reset scroll.
					$window.scrollTop(0);

					// Delay.
					window.setTimeout(function() {

						// If the clicked anchor is in the .main nav bar
						if ($link.parent('nav.main').length > 0) {

							// Activate target panel.
							$panel.removeClass('inactive');
						
						}

						if ($panel.children('nav.sub').length > 0) {

							$section.removeClass('inactive');
						
						}

						// Clear max/min height.
						$main
							.css('max-height', '')
							.css('min-height', '');

						// IE: Refresh.
						$window.triggerHandler('--refresh');

						// Unlock.
						locked = false;

					}, (breakpoints.active('small') ? 0 : 500));

				}, 250);

			});

	// IE: Fixes.
		if (browser.name == 'ie') {

			// Fix min-height/flexbox.
				$window.on('--refresh', function() {

					$wrapper.css('height', 'auto');

					window.setTimeout(function() {

						var h = $wrapper.height(),
							wh = $window.height();

						if (h < wh)
							$wrapper.css('height', '100vh');

					}, 0);

				});

				$window.on('resize load', function() {
					$window.triggerHandler('--refresh');
				});

			// Fix intro pic.
				$('.panel.intro').each(function() {

					var $pic = $(this).children('.pic'),
						$img = $pic.children('img');

					$pic
						.css('background-image', 'url(' + $img.attr('src') + ')')
						.css('background-size', 'cover')
						.css('background-position', 'center');

					$img
						.css('visibility', 'hidden');

				});

		}

})(jQuery);