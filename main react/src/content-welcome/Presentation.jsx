import Button from 'react-bootstrap/Button';
import imgWelcome from '../img/imgWelcome.jpg';
import PropTypes from 'prop-types';
import video from '../assets/media/classnexus.mp4'

const presentation_content ={
    img: imgWelcome,
    video,
    title: "EXPERIENCE THE FUTURE OF EDUCATION",
    text: "Connect with a diverse community of highly qualified educators, learn and grow.",
}

export default function Presentation({ handleShow }) {
    return (
        <section className='d-flex column-gap-gut'>
          <div className='flex-grow-1 w-auto d-flex flex-basis-0 flex-column align-items-start justify-content-between'>
            <h1 className='display-n-1 lh-1'>
              <strong className='fw-semibold text-nexus-gray-500'>{presentation_content.title}</strong>
            </h1>
            <p className='fs-2 lh-1 me-5 text-nexus-gray-600'>
              {presentation_content.text}
            </p>
            <Button variant="nexus-accent" size='lg' className='px-1i py-3 fs-3 text-nexus-gray-700' onClick={() => handleShow("signup")}>START NOW</Button>          
          </div>
          <div className='flex-grow-1 w-auto d-flex flex-basis-0 align-items-start'>
            <video width='100%' height='510px' src={video} autoPlay muted loop className='rounded-1 object-fit-fill'/>        
          </div>
        </section>
    );
}

Presentation.propTypes = {
  handleShow: PropTypes.func.isRequired,
};