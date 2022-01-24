import { StationPreview } from "./StationPreview"

export function StationList({ stations }) {

    if (!stations) return <h1>Loading...</h1>
    return (
        <section className="">
            <div className="station-list flex">
                {stations.map(station => {
                    return (
                        <StationPreview key={station._id} station={station} />
                    )
                })}
            </div>
        </section>
    )
}