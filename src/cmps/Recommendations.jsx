import { useEffect, useState } from "react"



export function Recommendations({ list, setQueryOnSearch, onSetQuery }) {

    const [showAll, setShowAll] = useState(false)




    const previewList = list.slice(0, 6)
    const listToRender = showAll ? list : previewList
    return (
        <section className='recommendations-container'>
            <h1>Related Artists / Songs</h1>
            <button className="see-more" onClick={() => setShowAll(!showAll)}>{showAll ? 'See less' : 'See more'}</button>
            <div className="items-container">
                {listToRender?.map((item, idx) => {
                    return (
                        <section key={idx} className='recommendation' onClick={setQueryOnSearch ? () => setQueryOnSearch(item.q) : () => onSetQuery(item.q)}>
                            <section className='img-container square-ratio'>
                                <img src={item?.bestThumbnail.url} />
                            </section>
                            <p>{item.q}</p>
                        </section>
                    )
                })}
            </div>
        </section>
    )
}