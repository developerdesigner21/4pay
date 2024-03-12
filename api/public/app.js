// app.js

const phoneAuthForm = document.getElementById('phoneAuthForm');
const phoneNumberInput = document.getElementById('phoneNumber');
const otpInput = document.getElementById('otp');

// Function to send OTP
function sendOtp() {
    const phoneNumber = phoneNumberInput.value;
    const phoneNumberFormatted = `+${phoneNumber}`;

    firebase.auth().signInWithPhoneNumber(phoneNumberFormatted, window.recaptchaVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            alert('OTP sent successfully!');
        })
        .catch((error) => {
            console.error(error);
        });
}

// Function to verify OTP
function verifyOtp() {
    const otp = otpInput.value;

    window.confirmationResult.confirm(otp)
        .then((result) => {
            const user = result.user;
            alert('Phone number verified successfully! User: ' + user.uid);
        })
        .catch((error) => {
            console.error(error);
        });
}
