import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.firstName || !formData.lastName || !formData.jobTitle) return;

  // Send form data directly (no need for newEmployee variable)
  await fetch("http://localhost:5000/api/employees", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  // Fetch updated data from backend
  const res = await fetch("http://localhost:5000/api/employees");
  const data = await res.json();

  // Update table with new data
  setRecords(data);

  // Clear form
  setFormData({ firstName: "", lastName: "", jobTitle: "" });
};


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqwxX2Jg5IHjYnuLQTsPX4XrBO3wENC0Uktg&s"></img> <br></br>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white p-6 rounded-md shadow-md w-96"
      >
        <h2 className="text-xl font-semibold text-center mb-4">Employee Form</h2>

        <label className="mb-2">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter first name"
          className="border p-2 rounded mb-4"
        />

        <label className="mb-2">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter last name"
          className="border p-2 rounded mb-4"
        />

        <label className="mb-2">Job Title</label>
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          placeholder="Enter job title"
          className="border p-2 rounded mb-4"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {records.length > 0 && (
        <table className="mt-8 border-collapse border border-gray-400 w-[500px] text-center bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-4 py-2">S.No</th>
              <th className="border border-gray-400 px-4 py-2">First Name</th>
              <th className="border border-gray-400 px-4 py-2">Last Name</th>
              <th className="border border-gray-400 px-4 py-2">Job Title</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {rec.firstName}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {rec.lastName}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {rec.jobTitle}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
