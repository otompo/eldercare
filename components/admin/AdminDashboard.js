import useNumbers from "../../hooks/useNumbers";
import AdminLayout from "../layout/AdminLayout";
import Layout from "../layout/Layout";
import CountTo from "react-count-to";
import Link from "next/link";

function AdminDashboard(props) {
  const { numbers } = useNumbers("");
  return (
    <Layout title="Admin Dashboard">
      <AdminLayout>
        <main className="bg-white-300 flex-1 p-3 overflow-hidden">
          <div className="flex flex-col">
            <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
              <div className="shadow bg-red-500 border-l-8 hover:bg-red-600 border-red-600 mb-2 p-2 md:w-1/4 mx-2">
                <Link href="/admin/staff">
                  <a>
                    <div className="p-4 flex flex-col">
                      <p className="no-underline text-white text-2xl mb-4">
                        {numbers.staff ? (
                          <CountTo
                            to={numbers.staff}
                            speed={numbers.staff * 100}
                          />
                        ) : (
                          0
                        )}
                      </p>
                      <p className="no-underline text-white text-lg">
                        Total Staff
                      </p>
                    </div>
                  </a>
                </Link>
              </div>

              <div className="shadow-lg bg-blue-800 border-l-8 hover:bg-blue-700 border-blue-700 mb-2 p-2 md:w-1/4 mx-2">
                <Link href="/admin/doctors">
                  <a>
                    <div className="p-4 flex flex-col">
                      <p className="no-underline text-white text-2xl mb-4">
                        {numbers.doctors ? (
                          <CountTo
                            to={numbers.doctors}
                            speed={numbers.doctors * 100}
                          />
                        ) : (
                          0
                        )}
                      </p>
                      <p className="no-underline text-white text-lg">
                        Total Doctors
                      </p>
                    </div>
                  </a>
                </Link>
              </div>

              <div className="shadow-lg bg-pink-800 border-l-8 hover:bg-pink-700 border-pink-700 mb-2 p-2 md:w-1/4 mx-2">
                <Link href="/admin/nurses">
                  <a>
                    <div className="p-4 flex flex-col">
                      <p className="no-underline text-white text-2xl mb-4">
                        {numbers.nurses ? (
                          <CountTo
                            to={numbers.nurses}
                            speed={numbers.nurses * 100}
                          />
                        ) : (
                          0
                        )}
                      </p>
                      <p className="no-underline text-white text-lg">
                        Total Nurses
                      </p>
                    </div>
                  </a>
                </Link>
              </div>

              <div className="shadow bg-green-800 border-l-8 hover:bg-green-700 border-green-700 mb-2 p-2 md:w-1/4 mx-2">
                <Link href="/admin/patients">
                  <a>
                    <div className="p-4 flex flex-col">
                      <p className="no-underline text-white text-2xl mb-4">
                        {numbers.patients ? (
                          <CountTo
                            to={numbers.patients}
                            speed={numbers.patients * 100}
                          />
                        ) : (
                          0
                        )}
                      </p>
                      <p className="no-underline text-white text-lg">
                        Total Patients
                      </p>
                    </div>
                  </a>
                </Link>
              </div>

              {/* <div className="shadow bg-yellow-500 border-l-8 hover:bg-yellow-600 border-yellow-600 mb-2 p-2 md:w-1/4 mx-2">
                <Link href="/admin/posts">
                  <a>
                    <div className="p-4 flex flex-col">
                      <p className="no-underline text-white text-2xl mb-4">
                        {numbers.posts ? (
                          <CountTo
                            to={numbers.posts}
                            speed={numbers.posts * 100}
                          />
                        ) : (
                          0
                        )}
                      </p>
                      <p className="no-underline text-white text-lg">
                        Total Posts
                      </p>
                    </div>
                  </a>
                </Link>
              </div> */}
            </div>
          </div>
        </main>
      </AdminLayout>
    </Layout>
  );
}

export default AdminDashboard;
