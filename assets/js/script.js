function initFlickity() {
  const newArrivalsSlider = document.querySelector('.new-arrivals-slider');
  
  if (newArrivalsSlider) {
    // Hủy instance Flickity hiện tại nếu có
    if (newArrivalsSlider.flickityInstance) {
      newArrivalsSlider.flickityInstance.destroy();
    }
    
    // Xác định số sản phẩm hiển thị dựa trên kích thước màn hình
    let groupCells = 4; // Mặc định desktop
    
    if (window.innerWidth <= 1024 && window.innerWidth > 767) {
      // Tablet: 2 sản phẩm mỗi slide
      groupCells = 2;
    } else if (window.innerWidth <= 767) {
      // Mobile: 1 sản phẩm mỗi slide
      groupCells = 1;
    }
    
    const flkty = new Flickity(newArrivalsSlider, {
      cellAlign: 'left',
      contain: true,
      pageDots: true,
      prevNextButtons: false,
      groupCells: groupCells,
      cellSpacing: 20
    });
    
    // Lưu instance để sử dụng sau này
    newArrivalsSlider.flickityInstance = flkty;
  }
}

// Menu hamburger mobile
function initMobileMenu() {
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const headerMenu = document.getElementById('headerMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  
  function toggleMenu() {
    hamburgerMenu.classList.toggle('active');
    headerMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  }
  
  function closeMenu() {
    hamburgerMenu.classList.remove('active');
    headerMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  }
  
  hamburgerMenu.addEventListener('click', toggleMenu);
  menuOverlay.addEventListener('click', closeMenu);
  
  // Đóng menu khi click vào link menu
  const menuLinks = document.querySelectorAll('.menu-link');
  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// Khởi tạo khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
  initFlickity();
  initMobileMenu();
});

// Khởi tạo lại Flickity khi resize cửa sổ với debounce
let resizeTimeout;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(initFlickity, 250);
});
