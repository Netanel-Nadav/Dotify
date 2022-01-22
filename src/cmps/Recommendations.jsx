

export function Recommendations({ list }) {

    return (
        <section className='recommendations-container'>
            <h1>Related Artists / Songs</h1>
            < section className='recommendations flex ' >
                {list?.map((item, idx) => {
                    return (
                        <section key={idx} className='recommendation flex'>
                            <section className='img-container'>
                                <img src={item.bestThumbnail.url} />
                            </section>
                            <p>{item.q}</p>
                        </section>
                    )
                })}
            </section>
        </section>
    )
}