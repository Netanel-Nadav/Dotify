import { DragDrop } from "../cmps/DragDrop";
import { LikedSongsHero } from "../cmps/LikedSongsHero";


export function LikedSongs({user}) {

    console.log(user)
    return (
        <section>
            <LikedSongsHero/>
            <DragDrop />
        </section>
    )
}
