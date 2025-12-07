// Clear local storage
function clearLocalStorage() {
    localStorage.clear();
  }
  
  // Reload the page to start fresh
  function reloadPage() {
    location.reload(true);
  }
  
  // Clear local storage and then reload the page
  function clearLocalStorageAndReload() {
    clearLocalStorage();
    //reloadPage();
  }
  
  // Call the clearLocalStorageAndReload function to clear local storage and reload the page
  clearLocalStorageAndReload();
  
  // Your page content and other JavaScript code here
  
  // Clear cookies and local storage when the page is reloaded
  window.addEventListener("beforeunload", function () {
    // Clear cookies, local storage, and browser cache on page load
    clearAllCookies();
    clearLocalStorage();
    clearBrowserCache();
  });


  //nav menu 
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')
// Menu Show
// Chek Toggle Exists Or NOt
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

//Remove menu Form Mobile View
const navLink = document.querySelectorAll('.nav__link')
const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))
// Change Blur To Header
const blurHeader = () => {
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('blur-header')
        : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)
// ================Email Js====================
const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message')

const sendEmail = (e) => {
    e.preventDefault()
    
    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
        contactMessage.textContent = 'Email service is loading. Please try again in a moment.'
        contactMessage.style.color = '#ff6b6b'
        setTimeout(() => {
            contactMessage.textContent = ''
        }, 5000)
        return
    }
    
    // Show loading message
    contactMessage.textContent = 'Sending message...'
    contactMessage.style.color = '#4dabf7'
    
    // Disable submit button to prevent multiple submissions
    const submitButton = contactForm.querySelector('button[type="submit"]')
    const originalButtonText = submitButton.textContent
    submitButton.disabled = true
    submitButton.textContent = 'Sending...'
    
    // EmailJS configuration
    // Make sure these match your EmailJS account:
    // - Service ID: service_v6bnmfg
    // - Template ID: template_zpnu7ln
    // - Public Key: qoU0SCBvT1YgUjGs6
    // - Form field names must match template variables: user_name, user_email, user_project
    
    emailjs.sendForm('service_v6bnmfg', 'template_zpnu7ln', '#contact-form', 'qoU0SCBvT1YgUjGs6')
        .then(() => {
            // Show Success Message
            contactMessage.textContent = 'Message Sent Successfully 📤'
            contactMessage.style.color = '#51cf66'
            // Remove msg after 5 seconds
            setTimeout(() => {
                contactMessage.textContent = ''
            }, 5000)
            // Clear Input Fields
            contactForm.reset()
            // Re-enable submit button
            submitButton.disabled = false
            submitButton.textContent = originalButtonText
        }, (error) => {
            // Show Error Message with details
            console.error('EmailJS Error:', error)
            let errorMsg = ''
            
            // Check for account not found errors
            if (error.text && (error.text.includes('Account not found') || error.text.includes('account not found') || error.text.includes('Service not found'))) {
                errorMsg = 'EmailJS service not found. Please verify your Service ID (service_v6bnmfg) and Public Key are correct in your EmailJS account.'
            }
            // Check for Gmail API connection errors
            else if (error.text && (error.text.includes('Gmail_API') || error.text.includes('Invalid grant') || error.text.includes('reconnect'))) {
                errorMsg = 'Gmail account needs reconnection in EmailJS. Please reconnect your Gmail account in the EmailJS dashboard to fix this issue.'
            } 
            // Check for other specific error messages
            else if (error.text) {
                errorMsg = error.text
            } 
            // Handle status codes
            else if (error.status === 400) {
                errorMsg = 'Bad request. Please check that all required fields are filled correctly.'
            } else if (error.status === 401) {
                errorMsg = 'Authentication failed. Invalid API key or service configuration.'
            } else if (error.status === 403) {
                errorMsg = 'Access forbidden. Please check EmailJS service permissions.'
            } else if (error.status === 404) {
                errorMsg = 'Service or template not found. Please verify EmailJS setup.'
            } else if (error.status === 500) {
                errorMsg = 'Server error. The email service is temporarily unavailable. Please try again later.'
            } else if (error.status) {
                errorMsg = `Error occurred (Status: ${error.status}). Please try again or contact support.`
            } else {
                errorMsg = 'Failed to send message. Please try again later or contact directly via email.'
            }
            
            contactMessage.textContent = errorMsg
            contactMessage.style.color = '#ff6b6b'
            setTimeout(() => {
                contactMessage.textContent = ''
            }, 8000)
            // Re-enable submit button
            submitButton.disabled = false
            submitButton.textContent = originalButtonText
        })
}

// Set up form when DOM is ready
if (contactForm) {
    // Wait for EmailJS to be fully loaded
    const checkEmailJS = setInterval(() => {
        if (typeof emailjs !== 'undefined') {
            clearInterval(checkEmailJS)
            contactForm.addEventListener('submit', sendEmail)
        }
    }, 100)
    
    // Timeout after 5 seconds
    setTimeout(() => {
        clearInterval(checkEmailJS)
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS failed to load')
        }
    }, 5000)
}

// Show Scroll Up
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)
//Scroll Activation Link


const sections = document.querySelectorAll('section[id]')
const scrollActive = () =>{

    const scrollY = window.pageYOffset
    
    sections.forEach(current =>{
    
    const sectionHeight = current.offsetHeight,
    
            sectionTop= current.offsetTop - 58,
    
            sectionId = current.getAttribute('id'),
    
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId +']')

    
    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
    
            sectionsClass.classList.add('active-link')
    
    }else{
        sectionsClass.classList.remove('active-link')
    }
    

    
    })
}
    
    window.addEventListener('scroll', scrollActive)

    //++++++++++SCroll Revel Animation++++++++++++++++++++++//
    const sr = ScrollReveal({
        origin:'top',
        distance:'60px',
        duration: 2500,
        delay:400,
        reset:true
    })
    sr.reveal(`.home__data, .home__social, .contact__container,.footer__container`)
    sr.reveal(`.home__image`,{origin:'bottom'} )
    sr.reveal(`.about__data,.skills__data`,{origin:'left'} )
    sr.reveal(`.about__image,.skills__contents`,{origin:'right'} )
    sr.reveal(`.services__card,.projects__card`,{interval: 100} )
    sr.reveal(`.education__card`,{origin:'right'} )
    sr.reveal(`.education__card`,{origin:'right'} )


  
  // Optional: You can also clear cookies and local storage when the page is closed
  // window.addEventListener("unload", function () {
  //   clearAllCookies();
  //   clearLocalStorage();
  // });
  

