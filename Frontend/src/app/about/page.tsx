"use client";

import KeyFeatures from "@/components/features";
import OurTeam from "@/components/ourteam";

export default function AboutPage() {
    return (
        <>
        <OurTeam />
            <div className="min-h-screen bg-[#FCF8F1] flex items-center justify-center px-4 z-0">

                <div className="w-full max-w-2xl rounded-2xl bg-black/40 backdrop-blur-xl shadow-xl p-8 text-white">

                    <h1 className="text-3xl font-bold text-center mb-6">
                        ABOUT UNISHARE
                    </h1>

                    <div className="space-y-5 text-sm leading-relaxed text-gray-200">

                        <p>
                            <strong>UNIShare</strong> is a collaborative academic resource-sharing
                            platform designed for university students. It allows students to
                            easily access, explore, and download high-quality learning materials
                            shared by peers and contributors.
                        </p>

                        <p>
                            The main goal of UNIShare is to reduce the difficulty students face
                            when searching for reliable academic resources and to encourage
                            collaborative learning within universities.
                        </p>

                        <p>
                            <strong>Student Role:</strong> Students can browse, search, and
                            download academic resources, provide feedback, and report issues
                            related to shared content.
                        </p>


                        <p>
                            <strong>Technologies Used:</strong> Next.js (App Router), React,
                            Tailwind CSS, and component-based architecture.
                        </p>

                    </div>
                </div>

            </div>
            <KeyFeatures />
        </>


    );
}