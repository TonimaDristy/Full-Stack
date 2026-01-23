import Link from "next/link";

export default function CTA() {
    return (
        <>
        {/* CTA Section */}
        <div className="my-16 text-center">
          <div className="inline-block bg-linear-to-r from-blue-500 to-indigo-600 rounded-xl p-8 text-white w-3xl lg:w-7xl">
            <h3 className="text-2xl font-bold mb-3">Ready to join the community?</h3>
            <p className="text-blue-100 mb-6">
              Join thousands of students and educators already sharing resources
            </p>
            <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-300">
              <Link href="/signup">Join Now →</Link>
            </button>
          </div>
        </div>
        </>
        
    );
}