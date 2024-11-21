import React from 'react';

interface SelectedItemDetailsProps {
    item: any;
    type: string;
    onBack: () => void;
}

const SelectedItemDetails: React.FC<SelectedItemDetailsProps> = ({ item, type, onBack }) => {
    return (
        <div className="p-4">
            <button onClick={onBack} className="text-blue-500 hover:underline mb-4">
                Back
            </button>
            <div className="flex flex-col md:flex-row items-center md:items-start space-x-4">
                <img
                    src={item.images?.[0]?.url || '/placeholder.jpg'} 
                    alt={item.name}
                    className="w-64 h-64 object-cover"
                />
                <div>
                    <h1 className="text-2xl font-bold">{item.name}</h1>
                    <p className="text-sm text-gray-500">{item.artists?.[0]?.name || type}</p>
                    <p className="mt-2">{item.description || 'No description available.'}</p>
                </div>
            </div>
        </div>
    );
};

export default SelectedItemDetails;
