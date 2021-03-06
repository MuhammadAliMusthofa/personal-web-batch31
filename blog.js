let blogs = [];

let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Desember'];

function addBlog(event) {
  event.preventDefault();

  let title = document.getElementById('input-blog-title').value;
  let content = document.getElementById('input-blog-content').value;
  let image = document.getElementById('input-blog-image');

  image = URL.createObjectURL(image.files[0]);

  let blog = {
    title,
    content,
    image,
    postedAt: new Date(),
  };

  blogs.push(blog);

  renderBlog();
}

function renderBlog() {
  let blogContainer = document.getElementById('contents-blogs');

  blogContainer.innerHTML = firstBlogContent();

  for (let i = 0; i < blogs.length; i++) {
    blogContainer.innerHTML += `
    <div class="blog-list-item">
          <div class="blog-image">
            <img src="${blogs[i].image}" alt="" />
          </div>
          <div class="blog-content">
            <div class="btn-group">
              <button class="btn-edit">Edit Post</button>
              <button class="btn-post">Post Blog</button>
            </div>
            <h1>
              <a href="blog-detail.html" target="_blank">${blogs[i].title}</a>
            </h1>
            <div class="detail-blog-content">${getFullTime(blogs[i].postedAt)} | Ali </div>
            <p>
              ${blogs[i].content}
            </p>

            <div style="text-align: right">
              <span style="font-size: 15px; color: grey">${getDistanceTime(blogs[i].postedAt)}</span>
            </div>
          </div>
        </div>`;
  }

  function firstBlogContent() {
    return `<div class="blog-list-item">
              <div class="blog-image">
                <img src="assets/blog-img.png" alt="" />
              </div>
              <div class="blog-content">
                <div class="btn-group">
                  <button class="btn-edit">Edit Post</button>
                  <button class="btn-post">Post Blog</button>
                </div>
                <h1>
                  <a href="blog-detail.html" target="_blank">Pasar Coding di Indonesia Dinilai Masih Menjanjikan</a>
                </h1>
                <div class="detail-blog-content">12 Jul 2021 22:30 WIB | Ichsan Emrald Alamsyah</div>
                <p>
                  Ketimpangan sumber daya manusia (SDM) di sektor digital masih menjadi isu yang belum terpecahkan. Berdasarkan penelitian ManpowerGroup, ketimpangan SDM global, termasuk Indonesia, meningkat dua kali lipat dalam satu dekade
                  terakhir. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam, molestiae numquam! Deleniti maiores expedita eaque deserunt quaerat! Dicta, eligendi debitis?
                </p>
  
                <div style="text-align: right">
                <span style="font-size: 15px; color: grey"> 1 hour ago</span>
                </div>
  
              </div>
            </div>`;
  }
}

function getFullTime(time) {
  let date = time.getDate();
  let monthIndex = time.getMonth();
  let year = time.getFullYear();

  let hours = time.getHours();
  let minutes = time.getMinutes();

  return ` ${date} ${month[monthIndex]}  ${year} ${hours}:${minutes} WIB`;
}

function getDistanceTime(time) {
  //waktu saat ini dikurangi waktu post

  const distance = new Date() - new Date(time);

  //convert to day
  const miliseconds = 1000;
  const secondsInMinute = 60;
  const minutesInHour = 60;
  const secondsInHour = secondsInMinute * minutesInHour;
  const hoursInDay = 23;

  //jarak waktu dalam sehari
  let dayDistance = distance / (miliseconds * secondsInHour * hoursInDay);

  // jika hari leb9h dari 1 atau sama dengan 1 maka akan keluar day ago
  if (dayDistance >= 1) {
    return Math.floor(dayDistance) + `day ago`;
  } else {
    //jika kurang dari 1hari namun lebih dari 0 jam, maka akan tampil hour ago
    let hourDistance = Math.floor(distance / (miliseconds * secondsInHour));
    if (hourDistance > 0) {
      return hourDistance + ' hour ago ';
    } else {
      //jika dibawah 1 jam maka akan tampil minute ago
      const minuteDistance = Math.floor(distance / (miliseconds * secondsInMinute));
      return minuteDistance + ' minute ago ';
    }
  }
}

setInterval(function () {
  renderBlog();
}, 2000);
