'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface GlassyButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    icon?: LucideIcon;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
}

export default function GlassyButton({
    children,
    onClick,
    icon: Icon,
    className = '',
    size = 'md',
    disabled = false,
}: GlassyButtonProps) {
    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const iconSizes = {
        sm: 16,
        md: 20,
        lg: 24,
    };

    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            className={`
                relative overflow-hidden rounded-full
                ${sizeClasses[size]}
                ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                ${className}
            `}
            style={{
                background: disabled
                    ? 'linear-gradient(180deg, rgb(207, 207, 207) 0%, rgb(207, 207, 207) 100%)'
                    : 'linear-gradient(180deg, rgb(255, 255, 255) 0%, rgb(201, 201, 201) 9%, rgb(161, 161, 161) 32%, rgb(117, 117, 117) 73%, rgb(255, 255, 255) 100%)',
                boxShadow: disabled
                    ? 'none'
                    : `
                        0.07px 1px 0.5px 0px rgba(0, 0, 0, 0),
                        0.16px 2.4px 1.2px 0px rgba(0, 0, 0, 0),
                        0.29px 4.4px 2.2px 0px rgba(0, 0, 0, 0.01),
                        0.48px 7.2px 3.6px 0px rgba(0, 0, 0, 0.01),
                        0.78px 11.7px 5.9px 0px rgba(0, 0, 0, 0.02),
                        1.3px 19px 9.6px 0px rgba(0, 0, 0, 0.03),
                        2.2px 33px 16.5px 0px rgba(0, 0, 0, 0.05),
                        4px 60px 30px 0px rgba(0, 0, 0, 0.1)
                    `,
            }}
            whileHover={!disabled ? {
                boxShadow: `
                    0.07px 1px 0.5px 0px rgba(0, 0, 0, 0),
                    0.16px 2.4px 1.2px 0px rgba(0, 0, 0, 0),
                    0.29px 4.4px 2.2px 0px rgba(0, 0, 0, 0.01),
                    0.48px 7.2px 3.6px 0px rgba(0, 0, 0, 0.01),
                    0.78px 11.7px 5.9px 0px rgba(0, 0, 0, 0.01),
                    1.3px 19px 9.6px 0px rgba(0, 0, 0, 0.02),
                    2.2px 33px 16.5px 0px rgba(0, 0, 0, 0.04),
                    4px 60px 30px 0px rgba(0, 0, 0, 0.07)
                `,
                scale: 1.02,
            } : undefined}
            whileTap={!disabled ? {
                scale: 0.98,
                boxShadow: `
                    0.07px 1px 0.4px -0.4px rgba(0, 0, 0, 0.03),
                    0.16px 2.4px 1px -0.75px rgba(0, 0, 0, 0.03),
                    0.29px 4.4px 1.7px -1.1px rgba(0, 0, 0, 0.03),
                    0.48px 7.2px 2.9px -1.5px rgba(0, 0, 0, 0.03)
                `,
            } : undefined}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
            {/* Inner content layer with glass effect */}
            <motion.div
                className="absolute inset-[3px] rounded-full flex items-center justify-center gap-2"
                style={{
                    background: 'linear-gradient(150deg, rgb(208, 208, 208) 0%, rgb(204, 204, 204) 50%, rgb(200, 200, 200) 100%)',
                }}
                whileHover={{
                    background: 'linear-gradient(150deg, rgb(208, 208, 208) 0%, rgb(232, 232, 232) 50%, rgb(200, 200, 200) 100%)',
                }}
            >
                {/* Icon with shadow effect */}
                <div className="relative">
                    {Icon && (
                        <>
                            {/* Shadow layer */}
                            <Icon
                                size={iconSizes[size]}
                                className="absolute text-white/40 transform translate-x-[1px] translate-y-[1px]"
                            />
                            {/* Main icon */}
                            <Icon
                                size={iconSizes[size]}
                                className="relative text-gray-800 z-10"
                            />
                        </>
                    )}
                </div>
                {children && (
                    <span className="relative z-10 font-semibold text-gray-700 tracking-tight">
                        {children}
                    </span>
                )}
            </motion.div>
        </motion.button>
    );
}
