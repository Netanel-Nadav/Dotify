import { DragDrop } from "../cmps/DragDrop";
import { LikedSongsHero } from "../cmps/LikedSongsHero";


export function LikedSongs({user}) {

    return (
        <section>
            <LikedSongsHero/>
            <DragDrop />
        </section>
    )
}
