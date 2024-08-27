'use client';
import { motion } from 'framer-motion';
import React from 'react';

interface ToggleButtonProps {
    toggle: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ toggle }) => {
    return (
        <div
            className={`w-12 h-6 flex items-center ${
                toggle ? 'bg-green-400' : 'bg-gray-300'
            } rounded-full p-1 cursor-pointer`}
        >
            <motion.div 
                className="h-5 w-5 bg-white rounded-full shadow-md"
                layout
                transition={{ type: 'spring', stiffness: 700, damping: 30 }}
                style={{
                    transform: toggle ? 'translateX(1.25rem)' : 'translateX(0rem)',
                }}
            />
        </div>
    );
};

export default ToggleButton;
