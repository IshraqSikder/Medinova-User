const getparams = () => {
  const param = new URLSearchParams(window.location.search).get("doctor_id");
  console.log(param);
  fetch(`https://medinova-0zgf.onrender.com/doctor/list/${param}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data));
  
  fetch(`https://medinova-0zgf.onrender.com/doctor/reviews/?doctor_id=${param}`)
  .then((res) => res.json())
  .then((data) => displayReviews(data));
};

const displayDetails = (doctor) => {
  const parent = document.getElementById("doc-details");
  const div = document.createElement("div");
  div.classList.add("mb-5", "row", "justify-content-center");
  div.innerHTML = `
  <div class="col-lg-5 mt-5 mt-lg-0">
      <img class="img-fluid w-100 rounded mb-5" src="${doctor.image}" alt="">
  </div>
  <div class="col-lg-6 mt-5 mt-lg-0">
      <div class="bg-primary mb-5 py-3">
          <h3 class="text-dark text-center py-3 px-4 m-0">Details of the Doctor</h3>
          <div class="d-flex justify-content-between border-bottom px-4">
              <h6 class="text-white my-3 me-5">Doctor</h6>
              <h6 class="text-white my-3">${doctor.user}</h6>
          </div>
          <div class="d-flex justify-content-between border-bottom px-4">
              <h6 class="text-white my-3 me-5">Description</h6>
              <h6 class="text-white my-3 ms-5">${doctor.description}</h6>
          </div>
          <div class="d-flex justify-content-between border-bottom px-4">
              <h6 class="text-white my-3 me-5">Specialization</h6>
              <h6 class="text-white my-3">${doctor.specialization}</h6>
          </div>
          <div class="d-flex justify-content-between border-bottom px-4">
              <h6 class="text-white my-3 me-5">Available Time</h6>
              <h6 class="text-white my-3">${doctor.available_time}</h6>
          </div>
          <div class="d-flex justify-content-between px-4">
              <h6 class="text-white my-3 me-5">Honourary</h6>
              <h6 class="text-white my-3">BDT ${doctor.fee}</h6>
          </div>
          <div class="py-3 px-5">
              <a class="btn btn-outline-dark rounded-pill py-3 px-5 click-scroll" href="appointment.html?doctor_id=${doctor.id}">Make Appointment</a>
          </div>
      </div>
  </div>
  `;
  parent.appendChild(div);
};

const displayReviews = (reviews) => {
  reviews.forEach((review) => {
    const parent = document.getElementById("reviews");
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
};

const loadPatientId = () => {
  const user_id = localStorage.getItem("user_id");
  fetch(`https://medinova-0zgf.onrender.com/patient/list/?user_id=${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("patient_id", data[0].id);
    });
};


getparams();
loadPatientId();