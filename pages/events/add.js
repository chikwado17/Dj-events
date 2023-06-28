import { useState } from "react"
import { useRouter } from "next/router"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link"
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import styles from '@/styles/Form.module.css'


export default function AddEventPage() {

    const [name, setName] = useState('');
    const [performers, setPerformers] = useState('');
    const [venue, setVenue] = useState('');
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');

    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
        //Validation
        if(!name ||!performers || !venue || !address || !date || !time || !description){
          
          toast.error('Please fill in all fields');
          return;

        }
      try {

        const res = await fetch(`${API_URL}/events`, {
          method:'POST',
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

         

          router.push(`${evt.data.attributes.slug}`)
        }


      }catch(error) {
        console.log(error);
      }

    }


  return (
    <Layout title={'Add Event'}>
      <Link href={'/events'}>Go Back</Link>
        <h1>Add event</h1>
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
                    value={date}
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
              <input type='submit' value='Add Event' className='btn' />
        </form>


    </Layout>
  )
}
