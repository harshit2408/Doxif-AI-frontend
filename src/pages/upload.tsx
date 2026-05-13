import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";


const BASE_URL = 'http://127.0.0.1:8000'

interface fileUploadResponse {
  FileId: string;
  FileName: string;
  FileSize: number;
  FileExt: string;
  FileUrl: string;
}

interface MyData {
  semester : string;
  academicYear : string;
  programType : string;
  eventDet : string;
  eventStartDate : string;
  eventEndDate : string;
  eventTime : string;
  courseCodeTitle : string;
  eventVenue : string;
  eventTitle : string;
  resourcePersonName : string;
  resourcePersonDesignation : string;
  resourcePersonRes : string;
  emp1Id : string;
  emp1Name : string;
  emp2Id : string;
  emp2Name : string;
}

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<fileUploadResponse | null>(null);
  const [confirmedData2, setConfirmedData2] = useState<MyData>({
    semester : "",
    academicYear : "",
    programType : "",
    eventDet : "",
    eventStartDate : "",
    eventEndDate : "",
    eventTime : "",
    courseCodeTitle : "",
    eventVenue : "",
    eventTitle : "",
    resourcePersonName : "",
    resourcePersonDesignation : "",
    resourcePersonRes : "",
    emp1Id : "",
    emp1Name : "",
    emp2Id : "",
    emp2Name : ""
  });

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);
        const response = await axios.post(
          `${BASE_URL}/process`,
          formData,
          {
            headers: {
              "Content-Disposition": `${selectedFile.name}`,
            },
          }
        );
        setLoading(false);
        if (response.status === 403 || response.status === 500) {
          alert(response.data.detail);  
          return;
        }
        console.log(response.data);
        setResponse(response.data);
        const responseData = response.data;

// Access properties of the responseData object
        const { 
          'Semester' : semester,
          'Academic Year' : academicYear,
          'Program Type' : programType,
          'Event' : eventDet,
          'Event Start Date' : eventStartDate,
          'Event End Date' : eventEndDate,
          'Event Time' : eventTime,
          'Course Code and Title' : courseCodeTitle,
          'Event Venue' : eventVenue,
          'Event Title' : eventTitle,
          'Resource Person Name' : resourcePersonName,
          'Resource Person Designation' : resourcePersonDesignation,
          'Resource Person Affiliation' : resourcePersonRes,
          'Employee ID 1' : emp1Id,
          'Employee Name 1' : emp1Name,
          'Employee ID 2' : emp2Id,
          'Employee Name 2' : emp2Name
        } = responseData.result;


        const formattedData = {
          "semester" : semester,
          "academicYear" : academicYear,
          "programType" : programType,
          "eventDet" : eventDet,
          "eventStartDate" : eventStartDate,
          "eventEndDate" : eventEndDate,
          "eventTime" : eventTime,
          "courseCodeTitle" : courseCodeTitle,
          "eventVenue" : eventVenue,
          "eventTitle" : eventTitle,
          "resourcePersonName" : resourcePersonName,
          "resourcePersonDesignation" : resourcePersonDesignation,
          "resourcePersonRes" : resourcePersonRes,
          "emp1Id" : emp1Id,
          "emp1Name" : emp1Name,
          "emp2Id" : emp2Id,
          "emp2Name" : emp2Name
        };

        // Set the formatted data to the confirmedData state
        setConfirmedData2(formattedData);
        setSelectedFile(null);
              } catch (error) {
                setLoading(false);
                console.error(error);
                if (error.response && error.response.data && error.response.data.detail) {
                  alert(error.response.data.detail);  // Show the custom error message from the backend
                } else {
                  alert("An unexpected error occurred. Please try again.");
                }
              }
            } else {
              window.alert("No file selected!");
            }
          };

  const InputField = ({ label, value }) => (
    <div className="mb-4 flex flex-col sm:flex-row items-center">
      <h4 className="w-full sm:w-64 mb-2 sm:mb-0 mr-0 sm:mr-4 font-bold">{label}:</h4>
      <div className="flex-grow">
      <div
        className="text-black w-96 h-8 bg-gray-200 border border-gray-300 rounded-md px-2 py-1 resize-none overflow-hidden whitespace-normal focus:border-blue-200"
        contentEditable="true"
      >
        {value}
        </div>
        </div>
    </div>
  );

return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
        <Navbar />
        {loading && (
            <div className="absolute z-50 h-screen w-screen bg-gray-800 opacity-50 flex flex-col items-center justify-center ">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-100"></div>
            </div>
        )}
        {response ? (
            <div className="p-4 h-auto flex-grow flex-col items-center justify-center">
                <div className="flex h-full flex-col items-center justify-center gap-4 p-8 rounded-md bg-gray-800 w-full">
                    <h1 className="text-2xl mb-4">Guest Lecture Details</h1>
                    
                    <div className="w-full md:w-auto">
                    <InputField label="Semester" value={confirmedData2.semester} />
                    <InputField label="Academic Year" value={confirmedData2.academicYear} />
                    <InputField label="Program Type" value={confirmedData2.programType} />
                    <InputField label="Event" value={confirmedData2.eventDet} />
                    <InputField label="Event Start Date" value={confirmedData2.eventStartDate} />
                    <InputField label="Event End Date" value={confirmedData2.eventEndDate} />
                    <InputField label="Event Time" value={confirmedData2.eventTime} />
                    <InputField label="Course Code and Title" value={confirmedData2.courseCodeTitle} />
                    <InputField label="Event Venue" value={confirmedData2.eventVenue} />
                    <InputField label="Event Title" value={confirmedData2.eventTitle} />
                    <InputField label="Resource Person Name" value={confirmedData2.resourcePersonName} />
                    <InputField label="Resource Person Designation" value={confirmedData2.resourcePersonDesignation} />
                    <InputField label="Resource Person Affiliation" value={confirmedData2.resourcePersonRes} />
                    <InputField label="Employee ID 1" value={confirmedData2.emp1Id} />
                    <InputField label="Employee Name 1" value={confirmedData2.emp1Name} />
                    <InputField label="Employee ID 2" value={confirmedData2.emp2Id} />
                    <InputField label="Employee Name 2" value={confirmedData2.emp2Name} />
                    </div>
                    
                </div>
            </div>
        ) : (
          <div className="h-auto flex-grow flex items-center justify-center">
              <main className="p-4 h-full flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center justify-center gap-12 p-8 rounded-md bg-gray-800">
                      <h1 className="text-2xl">Upload a file</h1>
                      <FileUploader
                          handleChange={handleFileChange}
                          multiple={false}
                          types={["PDF"]}
                      />
                      {selectedFile && (
                          <div className="flex flex-col items-center justify-center gap-4">
                              <p>Selected file: {selectedFile.name}</p>
                              <p>Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                          </div>
                      )}
                      <button
                          className="p-2 px-4 bg-gray-300 text-gray-900 rounded-md hover:bg-white "
                          onClick={handleSubmit}
                      >
                          Submit
                      </button>
                  </div>
              </main>
            </div>
        )}
        <Footer />
    </div>
);
}
