import { Container } from 'react-bootstrap';
import Logo from '../assets/svgs/Logo.svg';

const info_elements = [
  {
    title: 'Support',
    subs: ['Help and support', 'Teaching', 'Information'],
  },
  {
    title: 'About',
    subs: ['Policy', 'Terms of service', 'Privacy policy'],
  },
  {
    title: 'Contact',
    subs: ['Github', 'Development Team', 'Mail'],
  },
];
export function Info() {
  return (
    <>
      <div className="bg-nexus-gray-700">
        <Container fluid="xxl">
          <ul className="d-flex py-page-v px-page-v mb-0 mx-npage-v text-nexus-primary column-gap-gut">
            <li className="d-flex flex-grow-1">
              <img height="37p" src={Logo}></img>
            </li>
            {info_elements.map((info_element, index) => (
              <li key={index} className="d-flex flex-column flex-grow-1">
                <h1 className="fs-3 mb-4">{info_element.title}</h1>

                {info_element.subs.map((sub, index) => (
                  <p className="lh-1 fs-5 text-white-50" key={index}>
                    <a
                      href={`/${sub.replace(/\s/g, '').toLowerCase()}`}
                      className="nav-link fw-light text-opacity-100"
                    >
                      {sub}
                    </a>
                  </p>
                ))}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </>
  );
}
