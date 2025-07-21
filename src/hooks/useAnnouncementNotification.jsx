import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAnnouncementNotification = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const { data: announcements = [] } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/announcements');
            return res.data;
        }
    });

    const { data: userInfo = {} } = useQuery({
        queryKey: ['userInfo', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const unseenCount = announcements.filter(a => {
        return !userInfo?.lastSeenAnnouncementDate ||
            new Date(a.createdAt) > new Date(userInfo.lastSeenAnnouncementDate);
    }).length;

    const markAsSeen = async () => {
        if (user?.email) {
            await axiosSecure.patch(`/users/${user.email}/announcement-seen`);
            queryClient.invalidateQueries(['userInfo', user.email]);
        }
    };

    return { announcements, unseenCount, markAsSeen };
};

export default useAnnouncementNotification;
