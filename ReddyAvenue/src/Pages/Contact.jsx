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
        <div className="min-h-screen bg-gray-200 py-4 sm:py-6 lg:py-8">  
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 p-4 sm:p-6">Contact Details</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Number</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {contacts.map((contact, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{contact.name}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{contact.post}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{contact.contactNumber}</td>
                                        <td className="px-4 py-4 text-sm text-gray-600">{contact.address}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;