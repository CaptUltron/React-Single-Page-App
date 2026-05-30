import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage"
import EventsPage, { loader as EventLoader} from "./Pages/EventsPage"
import { action as ManipulateEventAction } from "./components/EventForm"
import EventDetailPage, {
  loader as EventsDetailLoader, 
  action as DeleteEventAction} from "./Pages/EventDetailPage"
import NewEventPage from "./Pages/NewEventPage"
import EditEventPage from "./Pages/EditEventPage"
import RootLayout from "./Pages/RootLayout"
import EventRootLayout from "./Pages/EventRootLayout";
import ErrorPage from "./Pages/Error";
import NewsletterPage, {action as newsletterAction} from "./Pages/NewsletterPage"
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage/>,
    children: [
      { index: true, element: <HomePage /> },
      { path: "events", 
        element: <EventRootLayout/>, 
        children: [
          { index: true, element: <EventsPage />, loader: EventLoader },
          { path: ":eventId", 
            id: "event-detail",
            loader: EventsDetailLoader, 
            children: [
              { index: true, element: <EventDetailPage />, action: DeleteEventAction },
              { path: "edit", element: <EditEventPage />, action: ManipulateEventAction },
            ]
          },
          { path: "new", element: <NewEventPage />, action: ManipulateEventAction }
        ]
      },
      { path: "newsletter", element: <NewsletterPage />,  action: newsletterAction,},
    ]
  },
]) 

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
