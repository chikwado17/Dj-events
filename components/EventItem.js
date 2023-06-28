import Link from "next/link"
import Image from "next/image"
import styles from '@/styles/EventItem.module.css';
import DjImg from '@/public/images/event-default.png';



export const EventItem = ({evt, imgs}) => {

    // console.log(imgs.url)

  return (
    <div className={styles.event}>
        <div className={styles.img}>
            <Image src={!imgs?.url ? DjImg: imgs?.url } alt="event-img" width={170} height={100} />
        </div>

        <div className={styles.info}>
            
            <span>{new Date(evt.attributes.date).toLocaleDateString('en-US')} at {evt.attributes.time}</span>
            <h3>{evt.attributes.name}</h3>
        </div>


        <div className={styles.link}>
            <Link className="btn" href={`/events/${evt.attributes.slug}`}>
                Details
            </Link>
        </div>

    </div>
  )
}


export default EventItem;