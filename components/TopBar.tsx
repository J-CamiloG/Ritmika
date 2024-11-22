import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TopBar() {
    return (
        <div className="flex justify-between items-center mb-8">
            <div className="flex space-x-2">
                <button className="bg-black rounded-full p-1">
                    <ChevronLeft size={24} />
                </button>
                <button className="bg-black rounded-full p-1">
                    <ChevronRight size={24} />
                </button>
            </div>
            <div className="flex items-center space-x-4">
                <button className="bg-white text-black px-4 py-1 rounded-full text-sm font-bold">
                    Beta
                </button>
            </div>
        </div>
    );
}