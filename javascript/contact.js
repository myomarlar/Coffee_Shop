/** @format */
function sendMessage() {
    const messageForm = {
        from_name: document.getElementById('name').value,
        email_id: document.getElementById('email').value,
        Title: document.getElementById('subject').value,
        message: document.getElementById('message').value
    }
    emailjs.init({
        publicKey: "P07VDmhHzCpRhPeAq",
    });
    emailjs.send('service_sfqwkdm', 'template_dn7jgve', messageForm).then(alert("Email send success..!"));
}