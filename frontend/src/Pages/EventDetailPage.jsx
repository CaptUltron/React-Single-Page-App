import { redirect, useRouteLoaderData } from "react-router-dom"
import EventItem from "../components/EventItem";

export default function EventDetailPage(){
    /**
     * useParams hook can be used to retrieve the value from the url params
     */
    // const useParamsForEvents = useParams();
     /**
     * useLoaderData hook can be used to retrieve the data returned from the loader function 
     * defined below and called in the eventsdetail route in app.js
     */
    const data = useRouteLoaderData("event-detail");
    console.log("data", data)

    return(
        <EventItem event={data.event}/>
    )
}

export async function loader({request, params}){
    console.log("params", params)
    const id = params.eventId;
    const response = await fetch("http://localhost:8080/events/" + id);
    if(!response.ok){
        throw new response(JSON.stringify({
            message: "could not fetch the event details"}),{
            status: 500
        })
    }
    else {
        const resData = await response.json();
        console.log("resdata", resData)
//         data {
//     "id": "e1",
//     "title": "A dummy event",
//     "date": "2023-02-22",
//     "image": "https://blog.hubspot.de/hubfs/Germany/Blog_images/Optimize_Marketing%20Events%20DACH%202021.jpg",
//     "description": "Join this amazing event and connect with fellow developers."
// }
        return resData;
    }
}

export async function action({request, params}){
    const id = params.eventId;
    const response = await fetch("http://localhost:8080/events/" + id, {
        method: request.method
    });
    if(!response.ok){
        throw new response(JSON.stringify({
            message: "could not delete event details"}),{
            status: 500
        })
    }
    return redirect("/events");
}