import { useState, useEffect } from "react";

export default function Time() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Bersihkan interval ketika komponen dilepas
        return () => clearInterval(interval);
    }, []); // Dependensi kosong berarti efek ini hanya berjalan sekali pada mount dan cleanup pada unmount

    return (
        <div className=" bg-indigo-700 px-3 py-2 mt-2 rounded-md">
            <p className="text-center">
                {time.toLocaleString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                    timeZone: "Asia/Jakarta",
                    timeZoneName: "short",
                })}
            </p>
        </div>
    );
}