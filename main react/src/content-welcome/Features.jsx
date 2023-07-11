import imgFeature0 from "../img/f0.png";
import imgFeature1 from "../img/f1.png";
import imgFeature2 from "../img/f2.png";

const features_array = [
{
    img: imgFeature0,
    title: "Convenient scheduling",
    text: "ClassNexus makes it easy to schedule classes with teachers. You can specify the date, time, location, and subject of the class, and teachers will be notified of your request. This makes it easy to find a time that works for both you and your teacher, and to get the help you need when you need it."
},
{
    img: imgFeature1,
    title: "Flexible learning options",
    text: "ClassNexus offers both virtual and in-person classes. This gives you the flexibility to choose the learning option that best suits your needs. If you're unable to make it to a physical class, you can still take the class virtually. And if you prefer to learn in person, you can find a teacher who is willing to meet at your home or at theirs"
},
{
    img: imgFeature2,
    title: "Secure and private",
    text: "ClassNexus is a secure and private platform. Your personal information is protected, and your classes are only visible to you and your teacher. This means that you can focus on learning without having to worry about your privacy"
}];
export default function Features() {
    return (
        <>
        <div className='why-class-nexus justify-content-between'>
          <h2 className="m-3"><strong>Why ClassNexus</strong></h2>
          <div className="why-features d-flex justify-content-between px-0 py-2 mx-0 my-3 flex-wrap flex-row">
          {features_array.map((feature, index) => (
            <div className='d-flex why-feature bg-body-secondary flex-column p-3 m-3' key={index}>
              <div className="d-flex feature-img-container">
                <img src={feature.img} alt="imgFeature" className='d-flex feature-img p-2'/>
              </div>
              <div className="d-flex feature-title justify-content-center my-3">
                <strong><h3>{feature.title}</h3></strong>
              </div>
              <div className="d-flex feature-text text-start">
                <p className="fw-lighter">{feature.text}</p>
              </div>
            </div>
          ))}
          </div>
        </div>
          
        </>
    );
}

