import React, { useEffect, useState } from 'react';
import { Button, Card, CarouselItem, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faX, faCircleInfo, faCircleQuestion, faLocationDot, faFloppyDisk, faGear, faSun, faMoon, faWind, faHandHoldingDroplet } from '@fortawesome/free-solid-svg-icons';
export const TempMeasureSelect = ({ setIsCelcToggled }) => {

    const [showImperialModal, setShowImperialModal] = useState(false);
  const handleShowImperialModal = () => setShowImperialModal(true);
  const handleCloseImperialModal = () => setShowImperialModal(false);
  const [showMetricModal, setShowMetricModal] = useState(false);
  const handleShowMetricModal = () => setShowMetricModal(true);
  const handleCloseMetricModal = () => setShowMetricModal(false);
 

  useEffect(() => {
  const system = localStorage.getItem("selectedSystem");
  if (system === "SI") {
    toggleCelcBGColor();
    setIsCelcToggled(true);
  } else if (system === "IMP") {
    toggleFahrBGColor();
    setIsCelcToggled(false);
  }
}, [setIsCelcToggled]);


  function saveSelectedSystem(system) {
    localStorage.setItem("selectedSystem", system);
  }

  function toggleCelcBGColor() {
    document.querySelector(".temp-measure-select-button:first-child").style.backgroundColor = "yellow";
    document.querySelector(".temp-measure-select-button:last-child").style.backgroundColor = "lightgrey";
    saveSelectedSystem("SI");
  }

  function toggleFahrBGColor() {
    document.querySelector(".temp-measure-select-button:first-child").style.backgroundColor = "lightgrey";
    document.querySelector(".temp-measure-select-button:last-child").style.backgroundColor = "yellow";
    saveSelectedSystem("IMP");
  }

  return (
    <div className="measurement-systems">
    <div className="temp-measure-select">
      <button title="Switch to the metric system" className="temp-measure-select-button"
        onClick={() => { setIsCelcToggled(true); toggleCelcBGColor(); handleShowMetricModal() }}>
        SI
      </button>
      <button title="Switch to the imperial system" className="temp-measure-select-button"
        onClick={() => { setIsCelcToggled(false); toggleFahrBGColor(); handleShowImperialModal() }}>
        IMP
      </button>
    </div>
    <Modal
    
            className="favorite-modal" show={showMetricModal} onHide={handleCloseMetricModal}>
            <Modal.Header closeButton>
              {/* <Modal.Title className="text-success">Favorites</Modal.Title> */}
            </Modal.Header>
            <Modal.Body className="text-dark bg-white dark-modal-body"><FontAwesomeIcon className="pr-2" icon={faCircleInfo} fade style={{ color: "#529fcc", }} size="lg" /><span className='default-city-note'>Info is now displayed in the metric system</span>  </Modal.Body>
    
            <Button title="Confirm" className="got-it-button text-dark bg-white dark-modal-button" onClick={handleCloseMetricModal}>OK</Button>
    
          </Modal>
    
          <Modal
    
            className="favorite-modal" show={showImperialModal} onHide={handleCloseImperialModal}>
            <Modal.Header closeButton>
              {/* <Modal.Title className="text-success">Favorites</Modal.Title> */}
            </Modal.Header>
            <Modal.Body className="text-dark bg-white dark-modal-body"><FontAwesomeIcon className="pr-2" icon={faCircleInfo} fade style={{ color: "#529fcc", }} size="lg" /><span className='default-city-note'>Info is now displayed in the imperial system</span> </Modal.Body>
    
            <Button title="Confirm" className="got-it-button text-dark bg-white dark-modal-button" onClick={handleCloseImperialModal}>OK</Button>
    
          </Modal>
    </div>
  );
}