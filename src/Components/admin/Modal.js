import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Modal.css';

const Modal = ({ message, onClose, isSuccess }) => {
    return (
        <div className="modal-overlay">
            <motion.div
                className="modal-content"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                <h2>{isSuccess ? 'Éxito' : 'Error'}</h2>
                <p>{message}</p>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                >
                    Cerrar
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Modal;
