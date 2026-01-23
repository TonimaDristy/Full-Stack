
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "@/components/SearchBar";
import ResourceGrid from "@/components/ResourceGrid";

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

export default function DashboardPage() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    //const token = localStorage.getItem("token");

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);


    // Fetch resources from backend
    const fetchResources = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/resources`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            }); 
            setResources(res.data);
            console.log("Fetched resources:", res.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch resources. Check backend or token.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResources();
    }, [token]);

    // Filter resources by search query
    const filteredResources = resources.filter((res) => {
        const q = search.toLowerCase();
        return (
            res.title.toLowerCase().includes(q) ||
            res.category.toLowerCase().includes(q) ||
            res.semester.toLowerCase().includes(q) ||
            res.type.toLowerCase().includes(q)
        );
    });

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Featured Resources</h1>
                <p className="text-gray-600 mb-6">
                    Top-rated study materials from our community
                </p>

                {/* Search bar */}
                <div className="flex mb-6 gap-2">
                    <SearchBar value={search} onChange={setSearch} />
                    <button
                        onClick={() => { }}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        Search
                    </button>
                </div>

                {/* Loading / Error / No Data */}
                {loading && <p className="text-gray-700 text-lg">Loading resources...</p>}
                {error && <p className="text-red-500 text-lg">{error}</p>}
                {!loading && !error && filteredResources.length === 0 && (
                    <p className="text-gray-500 text-lg">No resources found</p>
                )}

                {/* Resource Grid */}
                {!loading && filteredResources.length > 0 && (
                    <ResourceGrid resources={filteredResources} refresh={fetchResources} />
                )}
            </div>
        </div>
    );
}
