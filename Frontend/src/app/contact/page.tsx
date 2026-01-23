"use client";

export default function ContactPage() {
    const teamMembers = [
        { name: "Tonima Islam Dristy", email: "dristy@unishare.edu" },
        { name: "Mansur Islam", email: "mansur@unishare.edu" },
        { name: "Tasmim Al Tahsin", email: "tahsin3@unishare.edu" },
        { name: "Salman Sayeed", email: "salman@unishare.edu" },
    ];

    return (
        <div className="min-h-screen bg-[#FCF8F1] flex items-center justify-center px-4 z-0">

            <div className="w-full max-w-md rounded-2xl bg-black/40 backdrop-blur-xl shadow-xl p-8">

                <h1 className="text-3xl font-bold text-white text-center mb-6">
                    CONTACT TEAM
                </h1>

                <div className="space-y-4">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white/90 rounded-lg px-4 py-3 text-black"
                        >
                            <p className="font-semibold">{member.name}</p>
                            <a
                                href={`mailto:${member.email}`}
                                className="text-sm text-blue-600 underline"
                            >
                                {member.email}
                            </a>
                        </div>
                    ))}
                </div>

                <p className="text-sm text-gray-300 text-center mt-6">
                    Feel free to contact any of us for UNIShare support or collaboration.
                </p>

            </div>
        </div>
    );
}
