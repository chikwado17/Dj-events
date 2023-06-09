import Layout from "@/components/Layout"
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import { API_URL } from "@/config/index"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/Event.module.css';
import Link from "next/link";
import Image from "next/image";
import DjImg from '@/public/images/event-default.png';
import { useRouter } from "next/router";
import moment from "moment";

//function getting a single data from params => slug in this case
export const getServerSideProps = async ({params}) => {

  
  const { slug } = params;
  const res = await fetch(`${API_URL}/events?filters[slug]=${slug}&populate=*`);
  // console.log(res)
 
  return {
    props: {
      evt: await res.json()
    }
  }
}

export default function EventPage({evt}) {

  const router = useRouter();

  //function to delete data from strapi Api in nextjs
  const deleteEvent = async () => {
    if(confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${evt.data[0].id}`, {
        method:'DELETE'
      });

      const data = await res.json();


      if(!res.ok) {
        toast.error(data.message);
      }else {
        router.push('/events');
      }
    }
  }


  return (
    <Layout title={'Event Page'}>
      <div className={styles.event}>
          <div className={styles.controls}>
              <Link href={`/events/edit/${evt?.data[0]?.id}`}>
                  <FaPencilAlt /> Edit Event
              </Link>

              <a href="#" className={styles.delete} onClick={deleteEvent}>
                <FaTimes /> Delete Event
              </a>
          </div>
          
          <span>{moment(evt.data[0]?.attributes.date).format('yyyy-MM-DD')} at {evt.data[0]?.attributes.time}</span>
          <h1>{evt.data[0]?.attributes.name}</h1>
            <ToastContainer />
         
         {evt.data[0]?.attributes?.image.data &&
            <div className={styles.image}>
                <Image src={evt.data[0]?.attributes?.image.data === null ? DjImg : evt.data[0]?.attributes.image.data[0]?.attributes.url} width={960} height={600} alt="image" />
            </div>
          }

          <h3> Performers: </h3>
          <p>{evt.data[0]?.attributes.performers}</p>

          <h3>Description: </h3>
          <p>{evt.data[0]?.attributes.description}</p>

          <h3>{`Venue: ${evt.data[0]?.attributes.venue}`}</h3>
          <p>{evt.data[0]?.attributes.address}</p>


          <Link className={styles.back} href={'/events'}>
            {'<'} Go Back
          </Link>
      </div>
    </Layout>
  )
}
