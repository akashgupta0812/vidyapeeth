import React from 'react'
import ContactForm from './ContactForm'
const ContactFormSection = () => {
  return (
    <div className="bg-slate-900  flex items-center justify-center ">
        <div className='mx-auto flex flex-col gap-3 items-center justify-center mt-14'>
            <h1 className='text-white font-semibold text-3xl'>Get in Touch</h1>
            <p className='text-slate-400'>We'd love to here for you, Please fill out this form.</p>
            <ContactForm/>
        </div>
      
    </div>
  )
}

export default ContactFormSection
