import React from 'react'
import CardItem from './CardItem'
import './Cards.css'

function Cards() {
  return (
    <div className='cards'>
        <h1>Check These Out!</h1>
        <div className='cards__container'>
            <div className='cards__wrapper'>
                <ul className='cards__items'>
                    <CardItem src="images/container1.jpg"
                    text="Provides Optimized use of Space"
                    path="/services" />

                    <CardItem src="images/shipcargo.jpg"
                    text="Provides Optimized use of Space"
                    path="/services" />
                </ul>

                <ul className='cards__items'>
                    <CardItem src="images/container1.jpg"
                    text="Lesser expenditure"
                    path="/services" />

                    <CardItem src="images/shipcargo.jpg"
                    text="Provides Optimized use of Space"
                    path="/services" />
                    
                    <CardItem src="images/shipcargo.jpg"
                    text="Provides Optimized use of Space"
                    path="/services" />
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Cards
