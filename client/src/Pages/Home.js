import React, { useState, useEffect } from 'react';
import Loader from '../Components/Loader'; // Import the custom loader component

const Home = () => {
    const [imageData, setImageData] = useState([]);
    const [lastFetchedId, setLastFetchedId] = useState(null); // Initialize to null
    const [isLoading, setIsLoading] = useState(true); // State to manage loading animation

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://project-pictopia-2.onrender.com/api/images');
                const newData = await response.json();

                // Update the state with the new data
                updateData(newData);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        // Function to update data
        const updateData = (newData) => {
            if (newData.length === 0) return; // No new data fetched

            // Find the latest ID in the fetched data
            const latestId = newData[newData.length - 1].id;

            // Filter out only new data items
            const filteredData = newData.filter(item => item.id > lastFetchedId);

            if (filteredData.length > 0) {
                const processedData = filteredData.map(item => ({
                    id: item.id,
                    username: item.username,
                    caption: item.caption,
                    createdAt: formatTimestamp(item.createdAt), // Include createdAt field in formatted format
                    imageData: "data:image/jpeg;base64," + btoa(
                        new Uint8Array(item.data.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            '',
                        ),
                    )
                }));

                // Update the state by prepending the new data to the existing data
                setImageData(prevData => [...processedData, ...prevData]);

                // Update the last fetched ID
                setLastFetchedId(latestId);
            }

            // Set loading to false after data is fetched
            setIsLoading(false);
        };

        // Fetch initial data
        fetchData();

        // Set interval to fetch new data every 10 seconds
        const interval = setInterval(fetchData, 10000);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, [lastFetchedId]); // Re-run effect when lastFetchedId changes

    // Function to format timestamp
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">Welcome to Pictopia</h1>

            {/* Display the Loader component if data is fetching */}
            {isLoading ? (
                <div>
                    <Loader />
                </div>
            ) : (
                <ul className="flex flex-col items-center">
                    {imageData.map((imageItem, index) => (
                        <li key={index} className="mb-8">
                            <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden w-96">
                                <div className="p-4">
                                    <h2 className="text-xl font-bold mb-2 text-blue-900">{imageItem.username}</h2>
                                    <p className="text-gray-700 mb-2">{imageItem.caption}</p>
                                    <p className="text-gray-500 text-sm">Posted On: {imageItem.createdAt}</p>
                                </div>
                                <div className="image-container relative h-0 pb-56">
                                    <img
                                        src={imageItem.imageData}
                                        alt="alt"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>

    );
};

export default Home;
