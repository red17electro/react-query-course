import {useQuery} from "react-query";

export const useUserData = (userId) => {
    return useQuery(["users", userId], () => fetch(`/api/users/${userId}`).then(res => res.json()),
        {
            enabled: !!userId
        });
}
