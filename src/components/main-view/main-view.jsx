import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import '../../../src/App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import ScrollToTop from "./../scroll/scroll-to-top";
import { ScrollToTopButton } from '../scroll-to-top-button/scroll-to-top-button';
import Weather from '../weather/weather';
import { GuideView } from '../guide-view/guide-view';
import { ImpressumView } from './../impressum-view/impressum-view';
import { CurrentView } from '../current-view/current-view';
import { WeekView } from '../week-view/week-view';
import { CompleteDayView } from '../complete-day-view/complete-day-view';

export const MainView = () => {

  useEffect(() => {
    // 👇️ Scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);


  return (
    <>

      <Routes>

        <Route
          path="/"
          element={
            <>

              <Col>
                <Weather className="content"

                />


              </Col>
              <ScrollToTop />
              <ScrollToTopButton />

            </>
          }

        />

        <Route
          path='/impressum'
          element={
            <>

              <Col>
                <ImpressumView className="content"

                />

                {/* <Footer /> */}
              </Col>
              <ScrollToTop />
              <ScrollToTopButton />



            </>
          }
        />

<Route
          path='/current-view'
          element={
            <>

              <Col>
                <CurrentView className="content"

                />

                {/* <Footer /> */}
              </Col>
              <ScrollToTop />
              <ScrollToTopButton />



            </>
          }
        />



<Route
          path='/complete-day-view'
          element={
            <>

              <Col>
                <CompleteDayView className="content"

                />

                {/* <Footer /> */}
              </Col>
              <ScrollToTop />
              <ScrollToTopButton />



            </>
          }
        />




<Route
          path='/week-view'
          element={
            <>

              <Col>
                <WeekView className="content"

                />

                {/* <Footer /> */}
              </Col>
              <ScrollToTop />
              <ScrollToTopButton />



            </>
          }
        />


        <Route
          path='/guide'
          element={
            <>

              <Col>
                {/* <NavigationBar /> */}
                <GuideView className="content"

                />

              </Col>
              <ScrollToTop />
              <ScrollToTopButton />
            </>
          }
        />

      </Routes>





    </>
  );
};



