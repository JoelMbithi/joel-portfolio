import React from 'react'
import Navbar from './shared/Navbar'
import Hero from '../features/Home/components/Hero'
import Skills from '../features/Services/Services'
import About from '../features/About/about'
import Projects from '../features/Projects/Components/Project'
import Experience from '../features/Experience/components/Experience'
import Contacts from '../features/Contacts/components/Contacts'

const page = () => {
  return (
    <div>
     
      <Hero/>
      <Skills/>
      <About/>
      <Projects/>
      <Experience/>
      <Contacts/>
    </div>
  )
}

export default page