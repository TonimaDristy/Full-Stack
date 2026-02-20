"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

type Resource = {
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
};



export default function ResourceCard({ resource, refresh }: ResourceCardProps) {
    const [token, setToken] = useState<string | null>(null);
    const [bookmarking, setBookmarking] = useState(false);
    const [ratingValue, setRatingValue] = useState<number | null>(null);
    const [ratingLoading, setRatingLoading] = useState(false);


    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);

    // Download resource
    const handleDownload = async () => {
        if (!token) return alert("Please login to download.");

        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/resources/download/${resource.id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.download = `${resource.title}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error(err);
            alert("Download failed");
        }
    };

    // Bookmark resource
    const handleBookmark = async () => {
        if (!token) return alert("Please login to bookmark.");

        setBookmarking(true);
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/resources/bookmark/${resource.id}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Bookmarked successfully!");
            refresh();
        } catch (err) {
            console.error(err);
            alert("Failed to bookmark");
        } finally {
            setBookmarking(false);
        }
    };

    // Rate resource
    const handleRate = async () => {
        if (!token) return alert("Please login to rate.");
        if (!ratingValue || ratingValue < 1 || ratingValue > 5)
            return alert("Rating must be between 1 and 5.");

        setRatingLoading(true);
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/resources/rate/${resource.id}`,
                { rating: ratingValue },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Rated successfully!");


            const newReviews = resource.reviews + 1;
            const newRating =
                ((resource.rating || 0) * resource.reviews + ratingValue) / newReviews;

            setRatingValue(null);
            refresh();
            resource.reviews = newReviews;
            resource.rating = newRating;

        } catch (err) {
            console.error(err);
            alert("Failed to rate");
        } finally {
            setRatingLoading(false);
        }
    };


    return (
        <div className="border rounded-xl p-5 shadow-sm bg-white flex flex-col justify-between">
            {/* Resource info */}
            <div>
                <Link href={`/resources/${resource.id}`}>
                    <h3 className="text-lg font-semibold hover:underline text-indigo-600">
                        {resource.title}
                    </h3>
                </Link>
                <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                <div className="flex gap-2 mt-3 flex-wrap">
                    <span className="text-xs border px-2 py-1 rounded">{resource.category}</span>
                    <span className="text-xs border px-2 py-1 rounded">{resource.semester}</span>
                    <span className="text-xs border px-2 py-1 rounded">{resource.type}</span>
                </div>
                <div className="flex justify-between items-center mt-4 text-sm">
                    <span>⭐ {resource.rating} ({resource.reviews})</span>
                    <span>⬇ {resource.downloads}</span>
                </div>
            </div>

            {/* Action buttons */}
            <div className="mt-4 flex flex-col gap-2">
                <button
                    onClick={handleDownload}
                    className="w-full bg-green-600 hover:bg-green-800 text-white py-2 rounded-lg transition"
                >
                    Download
                </button>

                <button
                    onClick={handleBookmark}
                    disabled={bookmarking}
                    className={`w-full bg-blue-600 hover:bg-blue-800 text-white py-2 rounded-lg transition ${bookmarking ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {bookmarking ? "Bookmarking..." : "Bookmark"}
                </button>

                <div className="flex gap-2">
                    <input
                        type="number"
                        min={1}
                        max={5}
                        placeholder="Rate 1-5"
                        value={ratingValue ?? ""}
                        onChange={(e) =>
                            setRatingValue(e.target.value === "" ? null : parseInt(e.target.value))
                        }
                        className="w-1/2 border rounded px-2 py-1"
                    />
                    <button
                        onClick={handleRate}
                        disabled={ratingLoading}
                        className={`w-1/2 bg-yellow-500 hover:bg-yellow-600 text-white py-1 rounded transition ${ratingLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {ratingLoading ? "Rating..." : "Rate"}
                    </button>
                </div>

                <p className="text-xs text-gray-500 mt-2">{resource.date}</p>
            </div>
        </div>
    );
}
