import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/DiagonalBands.css';

function DiagonalBands() {
    return (
        <div className="diagonal-bands-container">
            <motion.div
                className="diagonal-band red-band"
                initial={{ x: '-100vw', y: '100vh' }}
                animate={{ x: '100vw', y: '-100vh' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
            />
            <motion.div
                className="diagonal-band white-band"
                initial={{ x: '-120vw', y: '120vh' }}
                animate={{ x: '120vw', y: '-120vh' }}
                transition={{ duration: 2.5, ease: 'easeInOut' }}
            />
        </div>
    );
}

export default DiagonalBands;
