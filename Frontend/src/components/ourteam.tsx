import Image from "next/image";

export default function OurTeam() {
    return (
        <div className="my-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-gray-600 mb-12">
              A diverse group of passionate individuals dedicated to making education accessible.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"></div>
              {/* Team Member 1 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <Image src="/team/member1.jpg" alt="Alice Johnson" width={150} height={150} className="rounded-full mx-auto mb-4"/>
                <h3 className="text-xl font-semibold">Alice Johnson</h3>
                <p className="text-gray-600">Frontend Developer</p>
              </div>
              {/* Team Member 2 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <Image src="/team/member2.jpg" alt="Bob Smith" width={150} height={150} className="rounded-full mx-auto mb-4"/>
                <h3 className="text-xl font-semibold">Bob Smith</h3>
                <p className="text-gray-600">Backend Developer</p>
              </div>
              {/* Team Member 3 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <Image src="/team/member3.jpg" alt="Catherine Lee" width={150} height={150} className="rounded-full mx-auto mb-4"/>
                <h3 className="text-xl font-semibold">Catherine Lee</h3>
                <p className="text-gray-600">UI/UX Designer</p>
              </div>
            </div>
          </div>
    );
}