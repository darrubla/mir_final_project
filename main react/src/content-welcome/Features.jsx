import imgFeature0 from "../img/f0.png";
import imgFeature1 from "../img/f1.png";
import imgFeature2 from "../img/f2.png";

const features_array = [
{
    img: imgFeature0,
    title: "Learning Community",
    text: "Class nexus connects teachers and students, creating a space for shared education"
},
{
    img: imgFeature1,
    title: "Virtual Classrooms",
    text: "Live lectures, personalized resources, and one-on-one sessions redefine online learning."
},
{
    img: imgFeature2,
    title: "Flexible Scheduling",
    text: " Students can book one-on-one virtual sessions for personalized attention and focused learning."
}];
export default function Features() {
    return (
        <>
        <section className='why-class-nexus justify-content-between'>
          <h1 className="mb-5 fw-normal text-nexus-gray-500">WHAT IS CLASS NEXUS ?</h1>
          <div className="why-features d-flex justify-content-between px-0 mx-0 flex-wrap flex-row">
          {features_array.map((feature, index) => (
            <div className='d-flex why-feature bg-body-secondary flex-column p-4 align-items-start justify-content-between row-gap-3 rounded-1' key={index}>
              <div className="d-flex feature-title justify-content-center">
                <h2 className="fw-normal text-nexus-gray-700">{feature.title}</h2>
              </div>
              <div className="d-flex feature-img-container">
                <img src={feature.img} alt="imgFeature" className='d-flex feature-img'/>
              </div>
              <div className="d-flex feature-text text-start">
                <p className="fw-normal m-0 fs-4 text-nexus-gray-500 lh-1">{feature.text}</p>
              </div>
            </div>
          ))}
          </div>
        </section>
          
        </>
    );
}

/** // TRIMMED FEATURES CONTENT BUT HERE ARE THE ORIGINALS! 
 * 
 * const features_array = [
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
 * */