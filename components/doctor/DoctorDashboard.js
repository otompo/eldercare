import React, { useEffect, useState } from "react";
import DoctorLayout from "../layout/DoctorLayout";
import Layout from "../layout/Layout";
import CountTo from "react-count-to";
import axios from "axios";
import Link from "next/link";

function DoctorDashboard(props) {
  const [totalPatients, setTotalPatients] = useState("");

  useEffect(() => {
    loadTotalPatients();
  }, []);

  const loadTotalPatients = async () => {
    try {
      const { data } = await axios.get(`/api/doctors`);
      setTotalPatients(data.patientsCount);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout title="Doctor Dashboard">
      <DoctorLayout>
        <main className="bg-white-300 flex-1 p-3 overflow-hidden">
          <div className="flex flex-col">
            <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
              <div className="shadow-lg bg-blue-800 border-l-8 hover:bg-blue-700 border-blue-700 mb-2 p-2 md:w-1/4 mx-2">
                <div className="p-4 flex flex-col">
                  <Link href="/doctor/patients">
                    <a>
                      <p className="no-underline text-white text-2xl mb-4">
                        {totalPatients ? (
                          <CountTo
                            to={totalPatients}
                            speed={totalPatients * 100}
                          />
                        ) : (
                          0
                        )}
                      </p>
                      <p className="no-underline text-white text-lg">
                        Total Assigned Patients
                      </p>
                    </a>
                  </Link>
                </div>
              </div>

              {/* <div className="shadow bg-red-500 border-l-8 hover:bg-red-600 border-red-600 mb-2 p-2 md:w-1/4 mx-2">
                <div className="p-4 flex flex-col">
                  <a href="#" className="no-underline text-white text-2xl mb-4">
                    9
                  </a>
                  <a href="#" className="no-underline text-white text-lg">
                    Total Staff
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </main>
      </DoctorLayout>
    </Layout>
  );
}

export default DoctorDashboard;
