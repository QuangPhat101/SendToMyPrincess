// Khởi tạo biến
const startDate = new Date("2025-04-11");
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let musicPlaying = false;

// Các câu quote tình yêu
const quotes = [
  {
    text: "Tình yêu không phải là tìm một người hoàn hảo, mà là học cách nhìn một người không hoàn hảo một cách hoàn hảo.",
    author: "Sam Keen"
  },
  {
    text: "Yêu không phải là nhìn nhau mà là cùng nhìn về một hướng.",
    author: "Antoine de Saint-Exupéry"
  },
  {
    text: "Tình yêu thực sự bắt đầu khi không còn gì để nhận, chỉ còn lại những gì có thể cho đi.",
    author: "Khuyết danh"
  },
  {
    text: "Tình yêu là khi hạnh phúc của người khác trở thành hạnh phúc của chính bạn.",
    author: "Voltaire"
  },
  {
    text: "Yêu nhau là cùng nhau viết nên một câu chuyện đẹp, trang nào cũng ngọt ngào, chương nào cũng hạnh phúc.",
    author: "Khuyết danh"
  },
  {
    text: "Trong tình yêu, sự im lặng đáng sợ hơn cả sự giận dữ.",
    author: "La Rochefoucauld"
  },
  {
    text: "Tình yêu không có tuổi, nó luôn luôn được sinh ra.",
    author: "Blaise Pascal"
  }
];

// Cập nhật bộ đếm thời gian
function updateCountdown() {
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();
  
  // Điều chỉnh nếu ngày âm
  if (days < 0) {
    months--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  
  // Điều chỉnh nếu tháng âm
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // Hiển thị lên giao diện
  document.getElementById('years').textContent = years;
  document.getElementById('months').textContent = months;
  document.getElementById('days').textContent = days;
  
  // Thêm hiệu ứng khi số thay đổi
  if (days === 0 && months === 0 && years === 0) {
    document.querySelector('.countdown-box').classList.add('pulse');
    setTimeout(() => {
      document.querySelector('.countdown-box').classList.remove('pulse');
    }, 1000);
  }
}

// Thay đổi quote ngẫu nhiên
function changeQuote() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const quoteElement = document.getElementById('quote');
  const authorElement = document.getElementById('quoteAuthor');
  
  // Thêm hiệu ứng fade out
  quoteElement.style.opacity = 0;
  authorElement.style.opacity = 0;
  
  setTimeout(() => {
    quoteElement.textContent = randomQuote.text;
    authorElement.textContent = randomQuote.author;
    
    // Thêm hiệu ứng fade in
    quoteElement.style.opacity = 1;
    authorElement.style.opacity = 1;
  }, 500);
}

// Tạo trái tim bay
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  
  // Random kích thước và vị trí
  const size = Math.random() * 15 + 10;
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (4 + Math.random() * 4) + 's';
  
  // Random màu sắc
  const colors = ['#ff4d6d', '#ff758f', '#ff8fa3', '#ffb3c1'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  heart.style.background = color;
  heart.style.setProperty('--heart-color', color);
  
  document.querySelector('.floating-hearts').appendChild(heart);
  
  // Tự động xóa sau khi animation kết thúc
  setTimeout(() => {
    heart.remove();
  }, 6000);
}

// Điều khiển nhạc nền
function toggleMusic() {
  if (musicPlaying) {
    music.pause();
    musicToggle.textContent = '🎵 Bật nhạc';
  } else {
    music.play().catch(e => console.log("Autoplay bị chặn:", e));
    musicToggle.textContent = '🔇 Tắt nhạc';
  }
  musicPlaying = !musicPlaying;
}

// Thêm hiệu ứng khi click
function createClickEffect(e) {
  const effect = document.createElement('div');
  effect.classList.add('heart');
  effect.style.left = e.clientX + 'px';
  effect.style.top = e.clientY + 'px';
  effect.style.width = '25px';
  effect.style.height = '25px';
  effect.style.animationDuration = '1.5s';
  effect.style.background = 'var(--primary)';
  
  document.body.appendChild(effect);
  
  setTimeout(() => {
    effect.remove();
  }, 1500);
}

// Khởi tạo sự kiện
document.addEventListener('DOMContentLoaded', () => {
  // Cập nhật bộ đếm ngay lập tức
  updateCountdown();
  
  // Cập nhật mỗi giây
  setInterval(updateCountdown, 1000);
  
  // Thay đổi quote ban đầu và mỗi 10 giây
  changeQuote();
  setInterval(changeQuote, 10000);
  
  // Tạo trái tim bay mỗi 0.5 giây
  setInterval(createHeart, 500);
  
  // Sự kiện click để bật/tắt nhạc
  musicToggle.addEventListener('click', toggleMusic);
  
  // Sự kiện click trên toàn trang
  document.addEventListener('click', createClickEffect);
  
  // Thử bật nhạc tự động (có thể bị chặn bởi trình duyệt)
  music.play().then(() => {
    musicPlaying = true;
    musicToggle.textContent = '🔇 Tắt nhạc';
  }).catch(e => {
    console.log("Autoplay bị chặn:", e);
    musicPlaying = false;
  });
});