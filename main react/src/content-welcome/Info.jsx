const info_elements = [
    {
        title: "Support",
        subs: ["Help and support", "Teaching", "Guides", "Information"],
    },
    {
        title: "About",
        subs: ["Policy", "Terms of service", "Privacy policy"],
    },
    {
        title: "Contact",
        subs: ["Github", "Development Team", "Mail"],
    },
]
export function Info () {
    return (
        <>
            <div className="d-flex flex-row justify-content-evenly mt-4 mb-0 bg-body-secondary p-4 m-3">
                {info_elements.map((info_element, index)=> (
                    <div key= {index} className="d-flex flex-column ">
                        <strong className="lh-lg mb-3">{info_element.title}</strong>
                        {info_element.subs.map((sub, index)=>(
                            <p className="lh-1" key={index}>{sub}</p>
                        ))}
                    </div>
                ))}

            </div>
        </>
    )
}