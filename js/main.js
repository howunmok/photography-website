let index = 0;
const totalWorkItems = $(".work-item").length;
// console.log(totalWorkItems);

$(window).on("load", function () {
  $(".preloader").addClass("loaded");
});

$(document).ready(function () {
  // nav toggle
  $(".nav-toggle").click(function () {
    $(".header .nav").slideToggle();
  });
  $(".header .nav a").click(function () {
    if ($(window).width() < 768) {
      $(".header .nav").slideToggle();
    }
  });

  // fixed header
  $(window).scroll(function () {
    if ($(this).scrollTop() > 90) {
      $(".header").addClass("fixed");
    } else {
      $(".header").removeClass("fixed");
    }
  });

  // Smooth effect
  // Add smooth scrolling to all links
  $("a").on("click", function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });

  //   set lightbox img max height
  const wHeight = $(window).height();
  $(".lightbox-img").css("max-height", wHeight + "px");
  //   console.log(wHeight);

  //   lightbox
  $(".work-item-inner").click(function () {
    // open lightbox
    // console.log($(this).parent(".work-item").index());
    index = $(this).parent(".work-item").index();
    $(".lightbox").addClass("open");
    lightboxSlideShow();
  });
  //   < button
  $(".lightbox .prev").click(function () {
    if (index == 0) {
      index = totalWorkItems - 1;
    } else {
      index--;
    }
    lightboxSlideShow();
  });
  //   > button
  $(".lightbox .next").click(function () {
    if (index == totalWorkItems - 1) {
      index = 0;
    } else {
      index++;
    }
    lightboxSlideShow();
  });

  //   close lightbox when click X
  $(".lightbox-close").click(function () {
    $(".lightbox").removeClass("open");
  });

  //   close lightbox when click outside
  $(".lightbox").click(function (event) {
    // check area
    // console.log(event.target);
    if ($(event.target).hasClass("lightbox")) {
      $(this).removeClass("open");
    }
  });
});

function lightboxSlideShow() {
  // show different photos by referring numbers
  const imgSrc = $(".work-item").eq(index).find("img").attr("data-large");
  //   console.log(imgSrc);
  // show different title by referring h4 tags
  const category = $(".work-item").eq(index).find("h4").html();
  $(".lightbox-img").attr("src", imgSrc);
  $(".lightbox-category").html(category);
  $(".lightbox-counter").html(totalWorkItems + "/" + (index + 1));
}

$(".form").submit(function (event) {
  event.preventDefault(); // Prevent the form from submitting via the browser

  var formData = $(this).serialize(); // Get form data

  $.ajax({
    url: "https://formspree.io/f/xrgwkgjo", // replace YOUR-FORM-ID with your actual Formspree form ID
    method: "POST",
    data: formData,
    dataType: "json",
    success: function () {
      // Clear form fields on success
      $(".input-control").each(function () {
        $(this).val("");
      });
      alert("Thank you for reaching out to me!");
    },
    error: function () {
      alert("There was an error sending the message.");
    },
  });
});
