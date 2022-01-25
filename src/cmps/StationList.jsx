import { StationPreview } from "./StationPreview"

export function StationList({ stations }) {

    if (!stations) return <h1>Loading...</h1>
    return (
        <section className="station-list">
                {stations.map(station => {
                    return (
                        <StationPreview key={station._id} station={station} />
                    )
                })}
        </section>
    )
}