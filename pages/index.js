import EventItem from "@/components/EventItem";
import Layout from "../components/Layout";
import Link from "next/link";
import { API_URL } from "@/config";
import DjImg from '@/public/images/event-default.png';

//function to fetch api from our server which is the api in pages
export async function getServerSideProps () {
  const res = await fetch(`${API_URL}/events?populate=*&sort=date:ASC&pagination[limit]=3`);

  const events = await res.json();


  return {
    props: {events: events}
  }
}

export default function Home({events}) {

  
  
  return (
    <Layout title="DJ Event - Home">
      <div>
        <h1>Upcoming Events</h1>

        {events.length === 0 && <h3>No Events to show</h3>}

        {/* console.log(evt.attributes.image.data[0].attributes.url) */}

        {events && events?.data.map(evt => (
          <EventItem key={evt.id} evt={evt} imgs={evt.attributes.image.data === null ? DjImg : evt.attributes.image.data[0]?.attributes} />
        ))}

        {events.length > 0 && (
          <Link className="btn-secondary" href={'/events'}>view all events</Link>
        )}
      </div>
    </Layout>
  )
}
