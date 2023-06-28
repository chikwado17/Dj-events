import { useState } from "react"
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link"
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import styles from '@/styles/Form.module.css'
import { FaImage } from "react-icons/fa";



export const getServerSideProps = async ({params}) => {

    const { id } = params;
    const res = await fetch(`${API_URL}/events?filters[id]=${id}&populate=*`);

    const eventDetails = await res.json();

    return {
        props: {
            evt:eventDetails
        }
    }

}


export default function EditEventPage({evt}) {

   

    const [name, setName] = useState(evt?.data[0]?.attributes?.name);
    const [performers, setPerformers] = useState(evt?.data[0]?.attributes?.performers);
    const [venue, setVenue] = useState(evt?.data[0]?.attributes?.venue);
    const [address, setAddress] = useState(evt?.data[0]?.attributes?.address);
    const [date, setDate] = useState(evt?.data[0]?.attributes?.date);
    const [time, setTime] = useState(evt?.data[0]?.attributes?.time);
    const [description, setDescription] = useState(evt?.data[0]?.attributes?.description);

    const [imagePreview, setImagePreview] = useState(
        evt.data[0]?.attributes?.image.data ? evt.data[0]?.attributes.image.data[0]?.attributes.url : null
    )



    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
        //Validation
        if(!name ||!performers || !venue || !address || !date || !time || !description){
          
          toast.error('Please fill in all fields');
          return;

        }
      try {

        const res = await fetch(`${API_URL}/events/${evt?.data[0].id}`, {
          method:'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: {
              name,
              performers,
              venue,
              address,
              date,
              time,
              description
            }
          })
        })


         if(!res.ok) {
          toast.error('Something Went Wrong!')
        }else {
          const evt = await res.json();
          router.push(`/events`)
        }


      }catch(error) {
        console.log(error);
      }

    }


  return (
    <Layout title={'Edit Event'}>
      <Link href={'/events'}>Go Back</Link>
        <h1>Edit event</h1>
        <ToastContainer />
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.grid}>
                <div>
                    <label htmlFor="name">Event Name</label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="performers">Event Performers</label>
                    <input type="text" id="performers" name="performers" value={performers} onChange={(e) => setPerformers(e.target.value)} />
                </div>



                <div>
                  <label htmlFor='venue'>Venue</label>
                  <input
                    type='text'
                    name='venue'
                    id='venue'
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                  />
                </div>


                <div>
                  <label htmlFor='address'>Address</label>
                  <input
                    type='text'
                    name='address'
                    id='address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>


                <div>
                  <label htmlFor='date'>Date</label>
                  <input
                    type='date'
                    name='date'
                    id='date'
                    value={moment(date).format('yyyy-MM-DD')}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>


                <div>
                  <label htmlFor='time'>Time</label>
                  <input
                    type='text'
                    name='time'
                    id='time'
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>

              </div>

              <div>
                <label htmlFor='description'>Event Description</label>
                <textarea
                  type='text'
                  name='description'
                  id='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <input type='submit' value='Update Event' className='btn' />
        </form>


        <h2>Event Image</h2>
        {imagePreview ? (
            <Image src={imagePreview} height={100} width={170} alt="image" />
        ): (
            <div>
                <p>No Image uploaded</p>
            </div>
        )}

        <div>
            <button className="btn-secondary">
                <FaImage /> Set Image
            </button>
        </div>
    </Layout>
  )
}
