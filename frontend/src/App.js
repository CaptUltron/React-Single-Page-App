// Challenge / Exercise
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
import HomePage from "./Pages/HomePage"
import EventsPage, { loader as EventLoader} from "./Pages/EventsPage"
import EventDetailPage, {loader as EventsDetailLoader, action as DeleteEventAction} from "./Pages/EventDetailPage"
import NewEventPage, { action as NewEventAction} from "./Pages/NewEventPage"
import EditEventPage from "./Pages/EditEventPage"
import RootLayout from "./Pages/RootLayout"
import EventRootLayout from "./Pages/EventRootLayout";
import ErrorPage from "./Pages/Error";
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
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
              { path: "edit", element: <EditEventPage /> },
            ]
          },
          { path: "new", element: <NewEventPage />, action: NewEventAction }
        ]
      }
    ]
  },
]) 
// 3. Add a root layout that adds the <MainNavigation> component above all page components

// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
