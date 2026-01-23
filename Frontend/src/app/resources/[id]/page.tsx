"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

interface Resource {
    id: number;
    title: string;
    description: string;
    category: string;
    semester: string;
    type: string;
    rating: number;
    reviews: number;
    downloads: number;
    date: string;
}

export default function ResourceDetailsPage() {
    const { id } = useParams();
    const [resource, setResource] = useState<Resource | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchResource = async () => {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/resources/${id}`
                );
                setResource(res.data);
            } catch (err) {
                setError("Resource not found");
            } finally {
                setLoading(false);
            }
        };

        fetchResource();
    }, [id]);

    if (loading) return null; // loading.tsx will handle UI

    if (error) return <p className="text-red-500 p-8">{error}</p>;

    if (!resource) return null;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
                <h1 className="text-3xl font-bold mb-2">{resource.title}</h1>
                <p className="text-gray-600 mb-4">{resource.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <p><b>Category:</b> {resource.category}</p>
                    <p><b>Semester:</b> {resource.semester}</p>
                    <p><b>Type:</b> {resource.type}</p>
                    <p><b>Date:</b> {resource.date}</p>
                    <p><b>Rating:</b> ⭐ {resource.rating}</p>
                    <p><b>Downloads:</b> {resource.downloads}</p>
                </div>
            </div>
        </div>
    );
}
