// AttendanceSystem.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Input, Button } from "../../../components/ui";

const MarkAttendance = ({ eventId }) => {
    const [totalSevadal, setTotalSevadal] = useState(0);
    const [searchId, setSearchId] = useState("");
    const [sevadalInfo, setSevadalInfo] = useState([]);
    const [totalPresent, setTotalPresent] = useState("");
    const [presentSevadalData, setPresentSevadalData] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `http://snmsangli.com/api/sevadal/get_sevadal/${searchId}`
            );
            setSevadalInfo(response.data);
        } catch (error) {
            console.error("Error fetching sevadal:", error);
        }
    };

    const handlePresentClick = async (sevadalId, eventId) => {
        try {
            // Assume you have an API endpoint to mark attendance as present
            const markAttendanceResponse = await axios.post(
                "http://snmsangli.com/api/attendance/mark_attendance",
                {
                    eventId,
                    sevadalId,
                    attendanceDate: new Date().toISOString().split("T")[0]
                }
            );

            window.alert("Attendance marked");
            console.log(markAttendanceResponse);

            // Fetch updated counts
            await fetchTotalPresent();
            await fetchPresentSevadalData();
            // Update counts
        } catch (error) {
            window.alert("Attendance for this ID on this date already exists");
            console.error("Error marking attendance as present:", error);
        }
    };

    const fetchTotalPresent = async () => {
        try {
            const response = await axios.get(
                "http://snmsangli.com/api/attendance/get_total_present"
            );
            setTotalPresent(response.data.totalPresent);
        } catch (error) {
            console.error("Error fetching total present count:", error);
        }
    };
    const fetchPresentSevadalData = async () => {
        try {
            const response = await axios.get(
                "http://snmsangli.com/api/attendance/get_present_sevadal_data"
            );
            setPresentSevadalData(response.data);
        } catch (error) {
            console.error("Error fetching present sevadal data:", error);
        }
    };

    useEffect(() => {
        const fetchTotalSevadal = async () => {
            try {
                const response = await axios.get(
                    "http://snmsangli.com/api/sevadal/get_sevadal_counts"
                );
                setTotalSevadal(response.data.total);
            } catch (error) {
                console.error("Error fetching total sevadal count:", error);
            }
        };
        fetchPresentSevadalData();
        fetchTotalPresent();
        fetchTotalSevadal();
    }, []);

    const Absent = totalSevadal - totalPresent;

    return (
        <div>
            <div className="grid grid-cols-3 gap-2">
                <Card><h5>Total sevadal</h5> <p>{totalSevadal}</p></Card>
                <Card><h5>Present sevadal</h5> <p>{totalPresent}</p></Card>
                <Card><h5>Absent sevadal</h5> <p>{Absent}</p></Card>

            </div>
            <div className="mt-4 gap-6 grid grid-cols-4">
                <div className="col-span-2">
                    <div className="grid grid-cols-2 gap-4">
                        <Input

                            type="text"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />
                        <Button
                            className="mr-2 mb-2 "
                            variant="solid"
                            color="green-600"
                            onClick={handleSearch}
                        >
                            search
                        </Button>
                    </div>
                    <div className="">
                        <table className="min-w-full border border-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-2 px-4 border-b">Name</th>
                                    <th className="py-2 px-4 border-b">Email</th>
                                    <th className="py-2 px-4 border-b">Type</th>
                                    <th className="py-2 px-4 border-b">Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b">{sevadalInfo.sevadal_name}</td>
                                    <td className="py-2 px-4 border-b">{sevadalInfo.sevadal_email}</td>
                                    <td className="py-2 px-4 border-b">{sevadalInfo.sevadal_type}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={() => handlePresentClick(sevadalInfo.id, eventId)}
                                            className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                                        >
                                            Mark Present
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-2 border border-gray-300">
                    <div><h5 className="p-4">All Presented Sevadal (Gents )</h5></div>
                    <table className="min-w-full ">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 border-b">Id</th>
                                <th className="py-2 px-4 border-b">Sevadal Name</th>
                                <th className="py-2 px-4 border-b">Sevadal Email</th>
                                <th className="py-2 px-4 border-b">Sevadal Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {presentSevadalData
                                .filter((sevadal) => sevadal.sevadal_type === 'Gents')
                                .map((sevadal) => (
                                    <tr key={sevadal.id} className="hover:bg-gray-50">
                                        <td className="py-2 px-4 border-b">
                                            {sevadal.id}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            {sevadal.sevadal_name}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            {sevadal.sevadal_email}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            {sevadal.sevadal_type}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-span-2 border border-gray-300">
                    <div><h5 className="p-4">All Presented Sevadal (Ladies )</h5></div>
                    <table className="min-w-full ">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 border-b">Id</th>
                                <th className="py-2 px-4 border-b">Sevadal Name</th>
                                <th className="py-2 px-4 border-b">Sevadal Email</th>
                                <th className="py-2 px-4 border-b">Sevadal Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {presentSevadalData
                                .filter((sevadal) => sevadal.sevadal_type === 'Ladies')
                                .map((sevadal) => (
                                    <tr key={sevadal.id} className="hover:bg-gray-50">
                                        <td className="py-2 px-4 border-b">
                                            {sevadal.id}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            {sevadal.sevadal_name}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            {sevadal.sevadal_email}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            {sevadal.sevadal_type}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>


            </div>




            <div></div>
        </div>
    );
};

export default MarkAttendance;
