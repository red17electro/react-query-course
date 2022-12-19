import {Loader} from "./Loader";
import {useIsFetching} from "react-query";

export const FetchingIndicator = () => {
    const isFetching = useIsFetching();
    return isFetching ? <div className="fetching-indicator">
        <Loader/>
    </div> : null;
}
