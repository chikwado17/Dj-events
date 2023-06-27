import qs from 'qs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index"



//function to fetch api from our server which is the api in pages
export async function getServerSideProps ({query: { term }}) {

  const query = qs.stringify({
    filters :{
      $or: [
        {
          name: {
            $contains: `${term}`
          },
        },
        {
          performers:{
             $contains: `${term}`
          },
        },
        {
          description:{
            $contains: `${term}`
         },
        },
        {
          venue:{
            $contains: `${term}`
         },
        }
      ]
    }     
  })


const res = await fetch(`${API_URL}/events?populate=*&${query}`);

const events = await res.json();


  return {
    props: {events}
  }
}

export default function SearchPage({events}) {

    const router = useRouter();

  return (
    <Layout title="Search Results">

        <Link href={'/events'}>Go Back</Link>
        
      <div>
        <h1>Search Results for {router.query.term}</h1>

        {events.length === 0 && <h3>No Events to show</h3>}

        {events.data.map(evt => (
          <EventItem key={evt.id} evt={evt} imgs={evt.attributes.image.data[0].attributes}  />
        ))}

      
      </div>
    </Layout>
  )
}
