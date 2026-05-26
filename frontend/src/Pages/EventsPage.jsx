import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

export default function EventsPage() {

const events = useLoaderData();

  return (
   <EventsList events={events}/>
  );
}

export async function loader() {
    const response = await fetch('http://localhost:8080/events');
    if (!response.ok) {
        throw new Response(JSON.stringify({message: "could not fetch the data"}), {
            status: 500
        })
    } else {
        const resData = await response.json();
        return resData.events;
    }
}