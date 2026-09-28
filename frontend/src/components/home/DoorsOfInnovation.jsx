import React from "react";

import electronicsGif from "../../assets/innovations/electronics.gif";
import roboticsGif from "../../assets/innovations/robotics.gif";
import iotGif from "../../assets/innovations/InternetOfThings.gif";
import printingGif from "../../assets/innovations/3DPrinting.gif";
import programmingGif from "../../assets/innovations/Programming.gif";

const innovationDoors = [
    {
        name: "Electronics",
        gif: electronicsGif,
    },
    {
        name: "Robotics",
        gif: roboticsGif,
    },
    {
        name: "Internet of Things",
        gif: iotGif,
    },
    {
        name: "3D Printing",
        gif: printingGif,
    },
    {
        name: "Programming",
        gif: programmingGif,
    },
];

function DoorsOfInnovation() {
    return (
        <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-white py-12 sm:py-16 px-6 sm:px-8 border-b border-slate-100">
            <div className="relative mx-auto w-full max-w-7xl flex flex-col items-center justify-center">
                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[60px] font-extrabold text-slate-900 tracking-tight leading-tight">
                        5 Doors of <span className="text-red-600">Innovation</span>
                    </h2>
                    {/* Red Line below heading */}
                    <div className="mt-5 mx-auto h-[4px] w-20 sm:w-24 bg-red-600 rounded-full" />
                </div>

                {/* 5 Items Row */}
                <div className="mt-16 sm:mt-20 md:mt-24 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-8 lg:gap-12 items-start text-center">
                    {innovationDoors.map((item, index) => (
                        <div
                            key={index}
                            className="group flex flex-col items-center justify-start p-2 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                        >
                            {/* Animated GIF Container */}
                            <div className="h-36 w-36 sm:h-44 sm:w-44 lg:h-52 lg:w-52 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                <img
                                    src={item.gif}
                                    alt={item.name}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>

                            {/* Title Label */}
                            <span className="mt-8 text-lg sm:text-xl md:text-2xl font-bold text-slate-800 group-hover:text-red-600 transition-colors leading-snug max-w-[200px]">
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default DoorsOfInnovation;
