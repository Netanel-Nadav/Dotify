import { DragDrop } from "../cmps/DragDrop";
import { LikedSongsHero } from "../cmps/LikedSongsHero";


export function LikedSongs() {

    return (
        <section className="like-page">
            <LikedSongsHero/>
            <DragDrop />
        </section>
    )
}
