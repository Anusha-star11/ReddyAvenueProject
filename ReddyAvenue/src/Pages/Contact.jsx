// ContactDetails.js
import React from 'react';

const Contact = () => {
    const contacts = [
        {
            name: 'John Doe',
            post: 'President',
            contactNumber: '+91-9876543210',
            address: '123 Society Lane, Hyderabad, Telangana, India - 500001'
        },
        {
            name: 'Jane Smith',
            post: 'Vice President',
            contactNumber: '+91-9876543211',
            address: '124 Society Lane, Hyderabad, Telangana, India - 500002'
        },
        {
            name: 'Bob Johnson',
            post: 'Secretary',
            contactNumber: '+91-9876543212',
            address: '125 Society Lane, Hyderabad, Telangana, India - 500003'
        }
        // Add more contacts as needed
    ];

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg mt-10">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Contact Details</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-3 px-6 border-b border-gray-300 text-left text-gray-700 font-semibold">Name</th>
                        <th className="py-3 px-6 border-b border-gray-300 text-left text-gray-700 font-semibold">Post</th>
                        <th className="py-3 px-6 border-b border-gray-300 text-left text-gray-700 font-semibold">Contact Number</th>
                        <th className="py-3 px-6 border-b border-gray-300 text-left text-gray-700 font-semibold">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="py-4 px-6 border-b border-gray-300 text-gray-600">{contact.name}</td>
                            <td className="py-4 px-6 border-b border-gray-300 text-gray-600">{contact.post}</td>
                            <td className="py-4 px-6 border-b border-gray-300 text-gray-600">{contact.contactNumber}</td>
                            <td className="py-4 px-6 border-b border-gray-300 text-gray-600">{contact.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Contact;
