import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index"

//function to fetch api from our server which is the api in pages
export async function getServerSideProps () {
  const res = await fetch(`${API_URL}/api/events`);

  const events = await res.json();


  return {
    props: {events }
  }
}

export default function EventsPage({events}) {


  return (
    <Layout title="DJ Event - Home">
      <div>
        <h1>Events</h1>

        {events.length === 0 && <h3>No Events to show</h3>}

        {events.map(evt => (
          <EventItem key={evt.id} evt={evt} />
        ))}

      
      </div>
    </Layout>
  )
}
