import PageContent from "../components/PageContent";
import {useRevalidator, useRouteError} from "react-router-dom"

export default function ErrorPage(){

    const routeError = useRouteError();
    
    let title = "Something went wrong!";
    let message = "Something went wrong!";

    if(routeError.status === 500){
        message = JSON.parse(routeError.data).message
    }

    else if(routeError.status === 404){
        title = "Not found"
        message = "could not find resource or page"
    }

    return(
        <PageContent title={title}>
            <p>{message}</p>
        </PageContent>
    );
}