const how_works = [
    {
        title: "Create an account",
        description: "To get started, create an account on ClassNexus. You can use your email address or your Google account to sign up. You will also need to provide billing details to complete a monthly subscription.",
    },
    {
        title: "Schedule a class",
        description: "Once you have y   our account active, you can schedule a class. You can specify the date, time, location, and subject of the class.",
    },
    {
        title: "Take the class",
        description:"When the class starts, you'll be able to join the virtual classroom or meet with the teacher in person. You can interact with the teacher during the class.",
    },
    {
        title: "Rate and block teachers",
        description: "You can also rate and block teachers on ClassNexus. This allows you to prevent yourself from being matched with teachers that you don't want to work with again.",
    }
]
const oddItems = how_works.filter((_, index) => index % 2 === 0);
const evenItems = how_works.filter((_, index) => index % 2 === 1);
export function HowWorks () {
    return (
        <>
            <section className='d-flex how-works-container bg-body-secondary flex-row p-4 m-3'>
                <div className="d-flex align-items-center how-works-title p-3">
                    <h2 className="d-flex">How does it work?</h2>
                </div>
                <div className="d-flex how-works-text">
                    <div className="d-flex align-content-end flex-column p-2">
                        {oddItems.map((item, index) => (
                            <div key={index} className="d-flex flex-row">
                                <div className="d-flex align-items-start px-2"><strong className="fs-2">{(index-1)+2}</strong></div>
                                <p className="text-start" key={index}><strong>{item.title}</strong>: {item.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex align-content-end flex-column p-2">
                        {evenItems.map((item, index) => (
                            <div key={index} className="d-flex flex-row">
                                <div className="d-flex align-items-start px-2"><strong className="fs-2">{oddItems.length+1+index}</strong></div>
                                <p className="text-start" key={index}><strong>{item.title}</strong>: {item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}