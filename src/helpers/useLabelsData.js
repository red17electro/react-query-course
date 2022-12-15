import {useQuery} from "react-query";

export const useLabelsData = () => {
    return useQuery(["labels"], () => fetch("/api/labels").then(res => res.json()));
}
