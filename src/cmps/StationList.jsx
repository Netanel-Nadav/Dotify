import { Loader } from "./Loader"
import { StationPreview } from "./StationPreview"

export function StationList({ stations }) {

    if (!stations) return <Loader />
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