import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRoom } from "../api";
import { IRoomDetail } from "../types";

export default function RoomDetail() {
    const { roomPk } = useParams();
    const { isLoading, data } = useQuery<IRoomDetail>({ queryKey: ["rooms", roomPk], queryFn: getRoom });

    return <h1>hello</h1>;
}
