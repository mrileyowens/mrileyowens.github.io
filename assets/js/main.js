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
		$sections = $main.children('section'),
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

	var $link = null;

	// When one of the nav bar anchors is clicked
	$nav_links
		.on('click', function(event) {

			$link = $(this)

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

			var $article, $articles, $section;

			// If the URL has a hash portion
			if (window.location.hash) {

				// Get the section that corresponds to the URL
				$section = $sections.filter(window.location.hash.split('/')[0]);

				// Get any articles in the section
				$articles = $section.children('article')

				// Get the anchor of the nav bar that corresponds to the URL
				$link = $nav_links.filter('[href="' + window.location.hash + '"]');

				if ($link.length > 1) {
					$link = $link.last()
				}

				// If the section has articles
				if ($link.parent('nav.sub').length > 0) {

					// Get the article that corresponds to the URL
					$article = $articles.filter('#' + window.location.hash.split('/')[1])

				}

			}

			// No section/link? Default to first.
			if (!$section
			||	$section.length == 0) {

				$section = $sections.first();
				$link = $nav_links.first();

			}

			// If the anchor is part of the .main nav bar
			if ($link.parent('nav.main').length > 0) {

				// Deactivate all sections except this one
				$sections.not($section)
					.addClass('inactive')
					.hide();

				// If the section has any articles
				if ($section.children('article').length > 0) {

					// Deactivate any articles except the first
					$articles.not($articles.first())
						.addClass('inactive')
						.hide();

				}

			}

			// If the anchor is part of the .sub nav bar
			if ($link.parent('nav.sub').length > 0) {

				// Deactivate all the sections except this one
				$sections.not($section)
					.addClass('inactive')
					.hide();

				// Deactivate all articles except this one
				$articles.not($article)
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

				var $section, $article, $articles;

				// If the current URL has a hash portion
				if (window.location.hash) {

					// Get the section that corresponds to the clicked anchor
				 	$section = $sections.filter(window.location.hash.split('/')[0]);

					// Get the clicked anchor
					//$link = $nav_links.filter('[href="' + window.location.hash + '"]');

					// Get all the articles that are children of the section
					$articles = $section.children('article')

					// If the section has a .sub nav bar
					if ($section.children('nav.sub').length > 0) {

						// Get all the sections that are children of the panel
						//$sections = $panel.children('section')

						// Get the article that corresponds to the clicked anchor
						$article = $articles.filter('#' + window.location.hash.split('/')[1])

					}

					// No target section? Bail.
					if ($section.length == 0)
						return;

				}

				// No section/link? Default to first.
				else {

					$section = $sections.first();
					$link = $nav_links.first();

				}

				// If the clicked anchor is in the .main nav bar
				if ($link.parent('nav.main').length > 0) {

					// Deactivate all sections.
					$sections.addClass('inactive');

					// Deactivate all links.
					$nav_links.removeClass('active');

					// If the section that corresponds to the clicked anchor has a .sub nav bar
					if ($section.children('nav.sub').length > 0) {

						// Disable the articles
						$section.children('article').addClass('inactive')

						$section.children('nav').children('a').first().addClass('active')

					}
				
				}

				// If the clicked anchor is in the .sub nav bar
				if ($link.parent('nav.sub').length > 0) {

					// Remove any active anchors from any .sub nav bar
					$('nav.sub').children('a').removeClass('active')

					// Disable the articles
					$articles.addClass('inactive');

				}

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

						// Hide all sections.
						$sections.hide();

						// Show the section that corresponds to the clicked anchor
						$section.show();
					
						if ($section.children('nav.sub').length > 0) {
							$articles.hide();
							$article.show();
						}

						else {
							$section.children('section').show();
						}
					
					}

					// Show target panel.
					//$panel.show();

					if ($link.parent('nav.sub').length > 0) {

						$articles.hide();
						$article.show();

					}

					// Set new max/min height.
					$main
						.css('max-height', $section.outerHeight() + 'px')
						.css('min-height', $section.outerHeight() + 'px');

					// Reset scroll.
					$window.scrollTop(0);

					// Delay.
					window.setTimeout(function() {

						// If the clicked anchor is in the .main nav bar
						if ($link.parent('nav.main').length > 0) {

							// Activate target section.
							$section.removeClass('inactive');
						
						}

						if ($section.children('nav.sub').length > 0) {

							$article.removeClass('inactive');
						
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

(function($) {

	var $window = $(window),
		$main = $('#main'),
		$buttons = $('button.accessibility')
		$divs = $buttons.parent('div').siblings('div')

	// Breakpoints.
	breakpoints({
		xlarge:  [ '1281px',  '1680px' ],
		large:   [ '981px',   '1280px' ],
		medium:  [ '737px',   '980px'  ],
		small:   [ '361px',   '736px'  ],
		xsmall:  [ null,      '360px'  ]
	});

	// When one of the accessibility buttons is clicked
	$buttons
		.on('click', function(event) {

			var $button, $div, $panel;

			// Get the clicked button
			$button = $(this)

			// Get the panel containing the clicked button
			$panel = $button.parents('.panel');

			// Get the div containing the corresponding text
			$div = $divs.filter('#' + $button.attr('id'));

			$divs.addClass('inactive')

			$buttons.removeClass('active')

			$button.addClass('active')

			$main
				.css('max-height', $main.height() + 'px')
				.css('min-height', $main.height() + 'px');

			setTimeout(function() {

				$divs.hide();
				$div.show();

				$main
					.css('max-height', $panel.outerHeight() + 'px')
					.css('min-height', $panel.outerHeight() + 'px')

				$window.scrollTop(0);
				
				window.setTimeout(function() {

					$div.removeClass('inactive');

					$main
						.css('max-height', '')
						.css('min-height', '')

					$window.triggerHandler('--refresh')

					locked = false;

				}, (breakpoints.active('small') ? 0 : 500));

			}, 250);

		});

})(jQuery);

(function($) {

	var $window = $(window),
		$main = $('#main'),
		$buttons = $('.item .header button');
		//$divs = $buttons.parent('div').siblings('div')

	// Breakpoints.
	breakpoints({
		xlarge:  [ '1281px',  '1680px' ],
		large:   [ '981px',   '1280px' ],
		medium:  [ '737px',   '980px'  ],
		small:   [ '361px',   '736px'  ],
		xsmall:  [ null,      '360px'  ]
	});

	// When one of the accessibility buttons is clicked
	$buttons
		.on('click', function(event) {

			var $button, $panel, active, panel_height, div_height;

			// Get the clicked button
			$button = $(this);

			active = $button.hasClass('active');

			$panel = $button.parents('.panel');

			// Get the div that the button will reveal / hide
			$div = $button.parent('div').siblings('div');

			$main
				.css('max-height', $main.height() + 'px')
				.css('min-height', $main.height() + 'px');

			if (active) {

				panel_height = $panel.outerHeight()
				div_height = $div.height()

				$div
					.css('max-height', $div.height() + 'px')

				$div.addClass('inactive');

				$button.removeClass('active');

				setTimeout(function() {

					$div
						.css('max-height', '0px');
						//.css('min-height', '0px');

					setTimeout(function() {
						$main
							.css('max-height', panel_height - div_height + 'px')
							.css('min-height', panel_height - div_height + 'px');
					});

					setTimeout(function() {
						$div.hide();
					}, 500);

					//$div.hide();

					$window.scrollTop(0);

					setTimeout(function() {

						//if (active) {
							//$div.addClass('inactive');
						//}

						//else {
							//$div.removeClass('inactive');
						//}

						//$div.removeClass('inactive');

						$main
							.css('max-height', '')
							.css('min-height', '');
						$div
							.css('max-height', '')
							//.css('min-height', '');

						$window.triggerHandler('--refresh');

						locked = false;

					}, (breakpoints.active('small') ? 0 : 500));

				}, 250);

			}

			else {

				$button.addClass('active');

				$div
					.css('max-height', $div[0].scrollHeight + 'px')
					.css('min-height', $div[0].scrollHeight + 'px');
				$div.show();

				$main
					.css('max-height', $panel.outerHeight() + 'px')
					.css('min-height', $panel.outerHeight() + 'px');

				setTimeout(function() {

					$div.removeClass('inactive');

					//$div
						//.css('max-height', '0px')
						//.css('min-height', '0px');

					$window.scrollTop(0);

					window.setTimeout(function() {

						//if (active) {
							//$div.addClass('inactive');
						//}

						//else {
							//$div.removeClass('inactive');
						//}

						//$div.removeClass('inactive');

						$main
							.css('max-height', '')
							.css('min-height', '');
						$div
							.css('max-height', '')
							.css('min-height', '');

						$window.triggerHandler('--refresh');

						locked = false;

					}, (breakpoints.active('small') ? 0 : 500));

				}, 250);
			}


			//if (active) {
				//$div.addClass('inactive')

				//$button.removeClass('active')

			//}

			//else {
				//$div.removeClass('inactive')

				//$button.addClass('active')

			//}

			//$div.addClass('inactive')

			//$button.removeClass('inactive')

			//$button.addClass('active')

			//$main
				//.css('max-height', $main.height() + 'px')
				//.css('min-height', $main.height() + 'px');

			//if (active) {
				//$div
					//.css('max-height', $div.height() + 'px')
					//.css('min-height', $div.height() + 'px');
			//}
			//else {
				//$div
					//.css('max-height', '0px')
					//.css('min-height', '0px');
			//}

			//console.log($div.height())

			//setTimeout(function() {

				////if (active) {
					////$div.hide();

					////$div
						////.css('max-height', '0px')
						////.css('min-height', '0px')
				////}

				////else {
					////$div.show();
				////}

				////$divs.hide();
				////$div.show();

				//if (active) {
					//$div
						//.css('max-height', '0px')
						//.css('min-height', '0px');

					//$div.hide()
				//}

				//else {
					//$div
						//.css('max-height', $div[0].scrollHeight + 'px')
						//.css('min-height', $div[0].scrollHeight + 'px')

					//$div.show()
				//}

				//$main
					//.css('max-height', $panel.outerHeight() + 'px')
					//.css('min-height', $panel.outerHeight() + 'px')

				//$window.scrollTop(0);
				
				//window.setTimeout(function() {

					////if (active) {
						////$div.addClass('inactive');
					////}

					////else {
						////$div.removeClass('inactive');
					////}

					////$div.removeClass('inactive');

					//$main
						//.css('max-height', '')
						//.css('min-height', '')
					//$div
						//.css('max-height', '')
						//.css('min-height', '')

					//$window.triggerHandler('--refresh')

					//locked = false;

				//}, (breakpoints.active('small') ? 0 : 500));

			//}, 250);

		});

})(jQuery);