import Link from "next/link"
import Image from "next/image"
import styles from '@/styles/EventItem.module.css';
import DjImg from '@/public/images/event-default.png';



export const EventItem = ({evt}) => {
  return (
    <div className={styles.event}>
        <div className={styles.img}>
            <Image src={evt.image ? evt.image : DjImg} alt="event-img" width={170} height={100} />
        </div>
    </div>
  )
}


export default EventItem;