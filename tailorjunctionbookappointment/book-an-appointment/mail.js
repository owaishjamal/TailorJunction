const firebaseConfig = {
    apiKey: "AIzaSyC_pIZWNXaieFgV80QPhh6b1ylcjpTAQUI",
    authDomain: "tailor-421019.firebaseapp.com",
    projectId: "tailor-421019",
    storageBucket: "tailor-421019.appspot.com",
    messagingSenderId: "61589354002",
    appId: "1:61589354002:web:15b976ea0367948cf10acb",
    measurementId: "G-5ZPCFLWY2J"
  };
// Initialize Firestore
firebase.initializeApp(yourFirebaseConfig);
const db = firebase.firestore();

function submitForm() {
    // Get form values
    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    // Get other form field values similarly
    const email = document.getElementById('email_address').value;
    const mobileNumber = document.getElementById('mobile_number').value;
    const gender = document.getElementById('gender').value;
    const service = document.getElementById('service').value;
    const appointmentDate = document.getElementById('apt_date').value;
    const appointmentTime = document.getElementById('apt_time').value;
    const address = document.getElementById('address').value;
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
    const message = document.getElementById('message').value;

    // Prepare data to be stored in Firestore
    const formData = {
        first_name: firstName,
        last_name: lastName,
        email_address: email,
        mobile_number: mobileNumber,
        gender: gender,
        service: service,
        apt_date: appointmentDate,
        apt_time: appointmentTime,
        address: address,
        state: state,
        city: city,
        message: message
    };

    // Add data to Firestore
    db.collection('tailor').add(formData)
        .then((docRef) => {
            console.log('Document written with ID: ', docRef.id);
            // Reset the form after successful submission
            document.getElementById('myForm').reset();
            // Optionally, display a success message to the user
            // Example: alert('Form submitted successfully!');
        })
        .catch((error) => {
            console.error('Error adding document: ', error);
            // Optionally, display an error message to the user
            // Example: alert('An error occurred. Please try again later.');
        });
}
