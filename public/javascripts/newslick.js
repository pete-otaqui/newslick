(function() {

    var index = 0;
    var current, next;
    var story_items = document.querySelectorAll('.story');
    story_items[0].style.display = 'block';
    function showNext() {
        console.log('next');
        if ( current ) current.style.display = 'none';
        var current_index = index;
        var next_index = index + 1;
        if ( next_index >= story_items.length ) {
            next_index = 0;
        }
        current = story_items[current_index];
        next = story_items[next_index];
        next.style.display = 'block';
        current.className = current.className.replace(/\s*active\b/, '');
        setTimeout(function() {
            next.className = next.className + ' active';
        }, 10);
        index++;
    }
    setInterval(showNext, 5000);

    document.body.addEventListener('click', function(e) {
        var href = e.target.getAttribute('data-href');
        if ( href ) {
            document.location.href = href;
        }
    }, false);


})();
