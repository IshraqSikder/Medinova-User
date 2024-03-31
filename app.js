const loadServices = () => {
  fetch("https://medinova-0zgf.onrender.com/services/")
    .then((res) => res.json())
    .then((data) => displayService(data))
    .catch((err) => console.log(err));
};

const displayService = (services) => {
  services.forEach((service) => {
    const parent = document.getElementById("services");
    const div = document.createElement("div");
    div.classList.add("col-lg-4", "col-md-6");
    div.innerHTML = `
    <div class="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
      <div class="service-icon mb-4">
        <img src=${service.image} class="img-fluid" alt="..."/>
      </div>
      <h4 class="mb-3">${service.name}</h4>
      <p class="m-0">${service.description}</p>
    </div>
    `;
    parent.appendChild(div);
  });
};

const loadDoctors = (search) => {
  document.getElementById("doctors").innerHTML = "";
  // document.getElementById("spinner").style.display = "block";
  fetch(
    `https://medinova-0zgf.onrender.com/doctor/list/?search=${search ? search : ""}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.results.length > 0) {
        // document.getElementById("spinner").style.display = "none";
        // document.getElementById("nodata").style.display = "none";
        displayDoctors(data.results);    
      } else {
        document.getElementById("doctors").innerHTML = "";
        // document.getElementById("spinner").style.display = "none";
        // document.getElementById("nodata").style.display = "block";
      }
    })
};

const displayDoctors = (doctors) => {
  const parent = document.getElementById("doctors");
  parent.innerHTML = "";
  doctors?.forEach((doctor) => {
    const div = document.createElement("div");
    div.classList.add("team-item", "row", "justify-content-center");
    div.innerHTML = `
      <div class="row g-0 bg-light rounded overflow-hidden my-3 col-12 col-xl-8 h-100">
        <div class="col-12 col-sm-5 h-100">
            <img class="img-fluid h-100" src="${doctor.image}" style="object-fit: cover;">
        </div>
        <div class="col-12 col-sm-7 h-100 d-flex flex-column">
            <div class="mt-auto p-4">
                <h3>${doctor.user}</h3>
                <h6 class="fw-normal fst-italic text-primary mb-4">${doctor.specialization}</h6>
                <p class="m-0">${doctor.description}</p>
            </div>
            <div class="d-flex mt-auto border-top p-4">
              <a href="detail.html?doctor_id=${doctor.id}" class="btn btn-primary rounded-pill py-2 px-5 my-2">View Details</a>
            </div>
        </div>
    </div>
    `;
  parent.appendChild(div);
  });
};

const loadSpecialization = () => {
  fetch("https://medinova-0zgf.onrender.com/doctor/specialization/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const parent = document.getElementById("drop-spe");
        const li = document.createElement("li");
        li.classList.add("dropdown-item");
        li.innerHTML = `
        <li onclick="loadDoctors('${item.name}')"> ${item.name}</li>
          `;
        parent.appendChild(li);
      });
    });
};

const handleSearch = () => {
  const value = document.getElementById("search").value;
  loadDoctors(value);
};

// load Review
fetch("https://medinova-0zgf.onrender.com/doctor/reviews/")
  .then((res) => res.json())
  .then((reviews) => {
    reviews.forEach((review) => {
    const parent = document.getElementById("review");
    const div = document.createElement("div");
    div.classList.add("testimonial-item", "text-center");
    div.innerHTML = `
      <div class="position-relative mb-5">
        <img class="img-fluid rounded-circle mx-auto" src="img/testimonial-1.jpg" alt="">
        <div class="position-absolute top-100 start-50 translate-middle d-flex align-items-center justify-content-center bg-white rounded-circle" style="width: 60px; height: 60px;">
          <i class="fa fa-quote-left fa-2x text-primary"></i>
        </div>
      </div>
      <p class="fs-4 fw-normal">${review.body}</p>
      <p class="fs-4 fw-normal">${review.rating}</p>
      <hr class="w-25 mx-auto">
      <h3>${review.reviewer}</h3>
      <h6 class="fw-normal text-primary mb-3">Profession</h6>
    `;
    parent.appendChild(div);
  });
})

let nextPageUrl = "https://medinova-0zgf.onrender.com/doctor/list/";
let prevPageUrl = null;

function loadPage(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayDoctors(data.results);
      updatePaginationButtons(data.previous, data.next);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function updatePaginationButtons(prevUrl, nextUrl) {
  const prevBtn = document.getElementById("prev-page");
  const nextBtn = document.getElementById("next-page");

  prevPageUrl = prevUrl;
  nextPageUrl = nextUrl;

  if (!prevPageUrl) {
    prevBtn.classList.add('disabled');
  } else {
    prevBtn.classList.remove('disabled');
  }

  if (!nextPageUrl) {
    nextBtn.classList.add('disabled');
  } else {
    nextBtn.classList.remove('disabled');
  }
}

    

loadServices();
loadDoctors();
loadSpecialization();
loadPage(nextPageUrl);
