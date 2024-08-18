'use client';
import { motion } from 'framer-motion';
import React from 'react';

interface ToggleButtonProps {
    toggle: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ toggle }) => {
    return (
        <motion.div 
            className={`h-5 w-5 rounded-full ${
                toggle ? 'bg-green-500' : 'bg-red-500'
            }`}
            layout
            transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        />
    );
};

export default ToggleButton;
