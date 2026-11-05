import React from 'react'
import CircularEconomySection from '../Services/CircularEconomySection'
import ServiceList from '../Services/ServiceList'
import EpHero from '../Services/EpHero'
import Decarbonisation from '../Services/Decarbonization'
import SustainabilityServices from '../Services/SustainabilityServices'
import EprServices from '../Services/EprServices'

const Services = () => {
  return (
    <>
    <CircularEconomySection></CircularEconomySection>
    <EpHero></EpHero>
    <EprServices></EprServices>
    <Decarbonisation></Decarbonisation>
    <SustainabilityServices></SustainabilityServices>
  
    </>
  )
}

export default Services
