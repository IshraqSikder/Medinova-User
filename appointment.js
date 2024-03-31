// load Time
const param = new URLSearchParams(window.location.search).get("doctor_id");
fetch(`https://medinova-0zgf.onrender.com/doctor/available_time/?doctor_id=${param}`)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((item) => {
      const parent = document.getElementById("availableTime");
      const option = document.createElement("option");
      option.value = item.id;
      option.innerText = item.name;
      parent.appendChild(option);
    });
    console.log(data);
  });

function handleAppointment(event) {
  event.preventDefault();
  
  const param = new URLSearchParams(window.location.search).get("doctor_id");
  console.log(param);
  const status = document.getElementById("appointmentType");
  const selected = status.options[status.selectedIndex];
  const time = document.getElementById("availableTime");
  const selectedTime = time.options[time.selectedIndex];
  const symptom = document.getElementById("symptom");
  const patient_id = localStorage.getItem("patient_id");
  const info = {
    appointment_type: selected.value,
    appointment_status: "Pending",
    time: selectedTime.value,
    symptom: symptom.value,
    cancel: false,
    patient: patient_id,
    doctor: param,
  };
  console.log(info);
  fetch("https://medinova-0zgf.onrender.com/appointment/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('Success:', data);
      alert('Appointment successfully made!');
      window.location.href = "profile.html";
      // handlePdf();
    })
    .catch((error) => {
      console.log('Error:', error);
      alert('An error occurred while making appointment. Please try again later.');
  });
};

document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    handleAppointment(event);
});
