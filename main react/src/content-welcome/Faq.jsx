import ListGroup from 'react-bootstrap/ListGroup';

const faq_list =[
{
    q: "What is ClassNexus?",
    a: "ClassNexus is a platform that makes it easy to schedule classes with teachers. You can find teachers who are offering classes in your area, and you can schedule classes with them at your convenience. ClassNexus also offers both virtual and in-person classes.",
},
{
    q: "How much does ClassNexus cost?",
    a: "ClassNexus offers a monthly subscription plan. The cost of the subscription plan is $20,00/month."
},
{
    q: "How do I create an account on ClassNexus?",
    a: "To create an account on ClassNexus, you can go to the ClassNexus website. Click on the 'Register' button. Enter your email address or Google account credentials, and then provide your billing details"
},
{
    q: "How do I schedule a class on ClassNexus?",
    a: "To schedule a class on ClassNexus, you can go to the 'Schedule' tab. Then, provide the relevant information about subject, topic description, date and time, and location."
},
{
    q: "What if I have a question about ClassNexus?",
    a: "If you have a question about ClassNexus, you can contact the ClassNexus support team. You can contact the support team by email or by phone.",
}
]
faq_list.map ((element)=>( element.variant="secondary"))
export default function Faq () {
    const active_index = null;
    return (
        <>
            <section className='d-flex flex-column text-center'>
                <h1 className='mb-5 fw-normal text-nexus-gray-500'>FAQ</h1>
                <ListGroup className="mx-1i row-gap-gut">
                    {faq_list.map((fq, index)=>(
                        <ListGroup.Item key={index} variant={fq.variant} className="d-flex justify-content-between align-items-center">
                            <div className="">
                               <h2 className='m-0 fw-normal fs-1 text-start'>{fq.q}</h2>
                                <p className="m-0">{active_index?fq.a:''}</p>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </section>
        </>
    );
}