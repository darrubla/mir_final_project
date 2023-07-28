import Button from 'react-bootstrap/Button';
import imgWelcome from '../img/imgWelcome.jpg';
import PropTypes from 'prop-types';

const presentation_content ={
    img: imgWelcome,
    title: "The best investment is knowledge",
    text: "Class Nexus is a platform platform that connects students with a diverse community of highly qualified educators, providing you with unparalleled opportunities to learn and grow. Our platform serves as a gateway to a vast array of educators who are passionate about sharing their knowledge and expertise with you"
}

export default function Presentation({ handleShow }) {
    return (
        <div className="info-get-started d-flex justify-content-center mx-1">
          <div className="d-flex flex-column cont-get-st">
            <div className="text-get-st d-flex flex-column">
              <h1 className="d-flex m-3 text-start"><strong>{presentation_content.title}</strong></h1>
              <p className="d-flex fs-4 m-3 text-start">{presentation_content.text}</p>
            </div>
            <div className='div-btn-get-st d-flex p-3 ps-0 justify-content-start'>
              <Button variant="info" className='btn-get-st m-3 px-3 py-2' onClick={() => handleShow("signup")}>Get Started</Button>
            </div>
          </div>
          <div className="img-get-st d-flex m-3 me-0">
            <img src={presentation_content.img} alt="imgWelcome" className='img-Welcome p-2'/>
          </div>
        </div>
    );
}

Presentation.propTypes = {
  handleShow: PropTypes.func.isRequired,
};