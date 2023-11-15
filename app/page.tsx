'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const handleOnFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log(e)
  }

 


  const [pathIndex, setPathIndex] = useState(0)
  const imagesPaths = ["/images/img1.jpg", "/images/img2.jpg", "/images/img3.jpg"]
  const imagePath = imagesPaths[pathIndex]



  useEffect(() => {
    console.log("triggered");

    const changeBackgroundImage = () => {
      console.log("triggered the change")
      if (pathIndex === imagesPaths.length - 1) {
        setPathIndex(0);
      } else {
        setPathIndex((prev) => prev + 1);
      }
    };
  
    const timeoutId = setTimeout(changeBackgroundImage, 7000);
  
    return () => {
      clearTimeout(timeoutId);
    };
  
  }, [pathIndex, imagesPaths.length]);


  return (
    <section className='main-section'>
      <section className="welcome-section">
        <article className="image-swapper">
          <Image
            key={imagePath}
            src={imagePath}
            alt="My Image"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
        </article>

        <article className="welcome-info">
          <article className="welcome-info-heading">
            <h1>
              Онлайн
              <br />
              Услуга за 3Д принтиране 
            </h1>
          </article>
          <article className="welcome-info-text">
            <p>Това е Вашето решение за иновативната технология 3Д принтиране. С няколко щракания можете да получите вашите части.</p>
          </article>
        </article>
      </section>
    </section>
  )
}
