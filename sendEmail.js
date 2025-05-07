function sendMail() {

  const fieldLabels = {
    fullname: "Full Name",
    email: "Email",
    "mobile-number": "Mobile Number",
    address: "Address",
    brand: "Brand",
    "service-type": "Service Type",
    "type-of-fixture": "Type of Fixture",
    "description-for-fixture": "Description for Fixture",
    month: "Month (First Date)",
    day: "Day (First Date)",
    year: "Year (First Date)",
    time: "Time (First Time)",
    month2: "Month (Second Date)",
    day2: "Day (Second Date)",
    year2: "Year (Second Date)",
    time2: "Time (Second Time)",
  };

  // Check if all input fields have content
  const requiredFields = Object.keys(fieldLabels);

  for (let field of requiredFields) {
    const input = document.getElementById(field).value.trim();
    if (!input) {
      alert(
        `Please fill out the ${fieldLabels[field]}.`
      );
      return; // Stop if any field is empty
    }
  }

  if (isUploading) {
    const shouldContinue = confirm(
      "Images are still uploading. Do you want to submit without waiting for all images to upload?"
    );
    if (!shouldContinue) {
      return; // Stop if user cancels
    }
  }

  let params = {
    name: document.getElementById("fullname").value,
    email: document.getElementById("email").value,
    mobileNumber: document.getElementById("mobile-number").value,
    address: document.getElementById("address").value,
    brand: document.getElementById("brand").value,
    serviceType: document.getElementById("service-type").value,
    typeOfFixture: document.getElementById("type-of-fixture").value,
    descriptionForFixture: document.getElementById("description-for-fixture")
      .value,
    imageUrls: uploadedImageUrls.join("\n"),
    month1: document.getElementById("month").value,
    day1: document.getElementById("day").value,
    year1: document.getElementById("year").value,
    time1: document.getElementById("time").value,
    month2: document.getElementById("month2").value,
    day2: document.getElementById("day2").value,
    year2: document.getElementById("year2").value,
    time2: document.getElementById("time2").value,
  };

  const serviceID = "service_0ohe4hz";
  const templateID = "template_dkfdfl6";

  console.log("URLs ready to send:", uploadedImageUrls);
  console.log("Params:", params);

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      console.log(res);

      // Clear all fields after sending email
      document.getElementById("fullname").value = "";
      document.getElementById("email").value = "";
      document.getElementById("mobile-number").value = "";
      document.getElementById("address").value = "";
      document.getElementById("brand").value = "";
      document.getElementById("service-type").value = "";
      document.getElementById("type-of-fixture").value = "";
      document.getElementById("description-for-fixture").value = "";
      document.getElementById("month").value = "";
      document.getElementById("day").value = "";
      document.getElementById("year").value = "";
      document.getElementById("time").value = "";
      document.getElementById("month2").value = "";
      document.getElementById("day2").value = "";
      document.getElementById("year2").value = "";
      document.getElementById("time2").value = "";

      alert("✅ Email sent successfully!");
    })
    .catch((err) => console.log(err));
}
