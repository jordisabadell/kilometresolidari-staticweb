function printTimeline() {
	var additionalOptions = { //https://timeline.knightlab.com/docs/options.html
		start_at_end: false,
		initial_zoom: 0.5
	}

	timeline = new TL.Timeline('timeline-embeded',
          'https://docs.google.com/spreadsheets/d/1NVGa6_ahiuMcAu6BNbR4jCifDRbgtq3UjjKDpcurZ0g/pubhtml', additionalOptions);
	$("#timeline-loader").addClass("hidden");
}