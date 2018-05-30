var w = window;
var doc = document;
var links = doc.querySelectorAll('.js-anchor-scroll');

/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int) endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */

w.smoothScrollTo = function(endX, endY, duration) {
  var startX = w.scrollX || w.pageXOffset,
    startY = w.scrollY || w.pageYOffset,
    distanceX = endX - startX,
    distanceY = endY - startY,
    startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 400;

  // Easing function
  var easeInOutQuart = function(time, from, distance, duration) {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  var timer = w.setInterval(function() {
    var time = new Date().getTime() - startTime,
      newX = easeInOutQuart(time, startX, distanceX, duration),
      newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      w.clearInterval(timer);
    }
    w.scrollTo(newX, newY);
  }, 1000 / 60); // 60 fps
};

for (var i = links.length - 1; i >= 0; i--) {
  links[i].addEventListener('click', function scrollTo(e) {
    e.preventDefault();
    var section = doc.querySelector(e.target.hash);
    var position = section.offsetTop;

    w.smoothScrollTo(0, position, 450);
  });
}
